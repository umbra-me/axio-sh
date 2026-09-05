import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
export function loadSource(url) {
  const source = readFileSync(url, 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
  } });
  const module = { exports: {} };
  new Function('require', 'module', 'exports', outputText)(require, module, module.exports);
  return module.exports;
}
