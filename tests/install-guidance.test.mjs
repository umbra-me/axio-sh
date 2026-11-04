import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { environmentText } from '../public-environment.mjs';

const file = new URL('../src/app/download/page.tsx', import.meta.url);
const source = ts.createSourceFile(file.pathname, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const terminals = [];
function visit(node, secondary = false) {
  if (ts.isJsxElement(node)) {
    const tag = node.openingElement.tagName.getText();
    secondary ||= tag === 'details';
    if (tag === 'Terminal') {
      const expression = node.children.find(ts.isJsxExpression)?.expression;
      terminals.push({ secondary, expression });
    }
  }
  ts.forEachChild(node, child => visit(child, secondary));
}
visit(source);
const command = terminal => new Function('environmentText', `return (${terminal.expression.getText()});`)(environmentText).trim();

test('download cards lead with inspection and do not execute the downloaded script', () => {
  const [shell, powershell] = terminals.filter(terminal => !terminal.secondary).slice(0, 2).map(command);
  assert.match(shell, /^curl -fsSL https:\/\/axio\.sh\/install -o axio-install\.sh\nless \.\/axio-install\.sh$/);
  assert.match(powershell, /^Invoke-WebRequest https:\/\/axio\.sh\/install\.ps1 -OutFile axio-install\.ps1\nGet-Content \.\\axio-install\.ps1$/);
});

test('pipe-to-shell commands remain in the secondary disclosure', () => {
  const commands = terminals.filter(terminal => terminal.secondary).map(command);
  assert.deepEqual(commands, [
    'curl -fsSL https://axio.sh/install | sh',
    'irm https://axio.sh/install.ps1 | iex',
  ]);
});
