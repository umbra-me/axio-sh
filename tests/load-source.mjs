import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
const require = createRequire(import.meta.url);
export function loadSource(url) {
  const source = readFileSync(url, 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
  } });
  const module = { exports: {} };
  // __dirname as Node gives a CommonJS module: next.config.ts resolves the
  // workspace root from it.
  new Function('require', 'module', 'exports', '__dirname', outputText)(require, module, module.exports, dirname(fileURLToPath(url)));
  return module.exports;
}
