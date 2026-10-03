import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const source = new URL('../docs/design/拼团哇-可点击原型-375x812.html', import.meta.url);
const destination = new URL('../packages/web/public/prototype/index.html', import.meta.url);
await mkdir(fileURLToPath(new URL('.', destination)), { recursive: true });
await copyFile(source, destination);
console.log('原型已从 docs/design 同步至 Web 的 /prototype/index.html');
