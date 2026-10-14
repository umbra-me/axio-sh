// Load the dedicated local reader configuration after the recipe strips ambient env.
import { statSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
if (args[0] === '--') args.shift();
const command = args.shift();
if (!['pnpm', 'npm'].includes(command)) {
  console.error('Private registry runner requires npm or pnpm');
  process.exit(1);
}
const state = path.join(homedir(), '.local', 'share', 'umbra-next', 'npm-registry');
const config = path.join(state, 'reader.npmrc');
try {
  for (const name of ['reader.npmrc', 'ca-bundle.pem', 'tls-cert.pem']) {
    const file = statSync(path.join(state, name));
    if (!file.isFile() || (process.platform !== 'win32' && (file.mode & 0o077))) throw new Error('unsafe file');
  }
} catch {
  console.error('Local registry reader configuration is missing or unsafe; start the staged registry first');
  process.exit(1);
}
const env = {
  ...process.env,
  npm_config_userconfig: config,
  NPM_CONFIG_USERCONFIG: config,
  npm_config_cafile: path.join(state, 'ca-bundle.pem'),
  UMBRA_NPM_CA_FILE: path.join(state, 'ca-bundle.pem'),
  NODE_EXTRA_CA_CERTS: path.join(state, 'tls-cert.pem'),
};
let executable = command;
let arguments_ = args;
if (process.platform === 'win32') {
  // Batch launchers require cmd.exe; refuse shell metacharacters before quoting.
  if (args.some((arg) => /[&|<>^%!"\r\n]/.test(arg))) {
    console.error('Unsupported Windows package-command argument');
    process.exit(1);
  }
  executable = process.env.ComSpec || 'cmd.exe';
  arguments_ = ['/d', '/s', '/c', '"' + command + '.cmd ' + args.map((arg) => '"' + arg + '"').join(' ') + '"'];
}
const child = spawnSync(executable, arguments_, { env, stdio: 'inherit' });
if (child.error) {
  console.error('Unable to launch the selected package manager');
  process.exit(1);
}
process.exit(child.status ?? 1);
