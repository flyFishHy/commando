// rollup.config.js
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createConfig from '../../scripts/createRollupConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [createConfig(__dirname)];
