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
  return object?.properties.find((item) => ts.isPropertyAssignment(item) && item.name.getText() === name)?.initializer;
}
function evaluate(expression) {
  assert.ok(expression, 'metadata URL must be present');
  return new Function('environmentUrl', `return (${expression.getText()});`)(environmentUrl);
}

const app = new URL('../src/app/', import.meta.url);
const root = fields(new URL('layout.tsx', app));
const pages = readdirSync(app, { recursive: true }).filter((file) => file.endsWith('page.tsx'));

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
