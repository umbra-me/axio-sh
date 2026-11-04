import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
import { resolveAlternates } from 'next/dist/lib/metadata/resolvers/resolve-basics.js';
import { resolveOpenGraph } from 'next/dist/lib/metadata/resolvers/resolve-opengraph.js';
import { environmentUrl } from '../public-environment.mjs';

// Read URL expressions from the real exported metadata without loading JSX,
// CSS or native product assets into this unit test.
function fields(file) {
  const source = ts.createSourceFile(file.pathname, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    const metadata = statement.declarationList.declarations.find((item) => item.name.getText(source) === 'metadata');
    if (metadata?.initializer && ts.isObjectLiteralExpression(metadata.initializer)) return metadata.initializer;
  }
}
function property(object, name) {
  const item = object?.properties.find((item) => (ts.isPropertyAssignment(item) || ts.isShorthandPropertyAssignment(item)) && item.name.getText() === name);
  return item && (ts.isShorthandPropertyAssignment(item) ? item.name : item.initializer);
}
function evaluate(expression) {
  assert.ok(expression, 'metadata URL must be present');
  return new Function('environmentUrl', `return (${expression.getText()});`)(environmentUrl);
}

const app = new URL('../src/app/', import.meta.url);
const root = fields(new URL('layout.tsx', app));
const pages = readdirSync(app, { recursive: true }).filter((file) => file.endsWith('page.tsx'));

test('every subpage shares its own title and description on social cards', () => {
  const titles = new Set();
  for (const file of pages.filter((file) => file !== 'page.tsx')) {
    const page = fields(new URL(file, app));
    const title = property(page, 'title').getText();
    const description = property(page, 'description').getText();
    assert.ok(!titles.has(title), `reused title: ${file}`);
    titles.add(title);
    for (const kind of ['openGraph', 'twitter']) {
      const social = property(page, kind);
      assert.equal(property(social, 'title')?.getText(), title, `${file}: ${kind} title`);
      assert.equal(property(social, 'description')?.getText(), description, `${file}: ${kind} description`);
      assert.ok(property(social, 'images'), `${file}: ${kind} must retain a share image`);
    }
  }
});

test('the not-found page has a distinct absolute document title', () => {
  const page = fields(new URL('not-found.tsx', app));
  assert.equal(evaluate(property(property(page, 'title'), 'absolute')), 'Page not found | Axio');
});

test('every public page and Open Graph override keeps its existing canonical URL', async () => {
  for (const suffix of ['', '.staging']) {
    const previous = process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX;
    process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX = suffix;
    try {
      const base = new URL(environmentUrl('https://axio.sh'));
      for (const file of pages) {
        const pathname = `/${file.replace(/\/page\.tsx$|^page\.tsx$/g, '')}`;
        const page = fields(new URL(file, app));
        const canonicalValue = evaluate(property(property(page, 'alternates') ?? property(root, 'alternates'), 'canonical'));
        const graphUrl = evaluate(property(property(page, 'openGraph') ?? property(root, 'openGraph'), 'url'));
        const context = { trailingSlash: false, isStaticMetadataRouteFile: false };
        const canonical = await resolveAlternates({ canonical: canonicalValue }, base, Promise.resolve(pathname), context);
        const graph = await resolveOpenGraph({ url: graphUrl }, base, Promise.resolve(pathname), context, null);
        assert.equal(canonical.canonical.url, `${base.origin}${pathname === '/' ? '' : pathname}`, file);
        assert.equal(graph.url, canonical.canonical.url, file);
      }
    } finally {
      if (previous === undefined) delete process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX;
      else process.env.NEXT_PUBLIC_UMBRA_PUBLIC_SUFFIX = previous;
    }
  }
});
