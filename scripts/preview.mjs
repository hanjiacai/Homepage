// Local preview only. Serves the public page and assets, never repository metadata.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
http.createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/') { res.writeHead(302, { Location: '/Homepage/' }); res.end(); return; }
  const relative = pathname === '/Homepage/' ? 'index.html' : pathname.replace(/^\/Homepage\//, '');
  if (!pathname.startsWith('/Homepage/') || !(relative === 'index.html' || /^assets\/(css|images|js)\/[a-zA-Z0-9_./-]+$/.test(relative)) || relative.includes('..')) {
    res.writeHead(404); res.end('Not found'); return;
  }
  try {
    const file = new URL(relative, root);
    const extension = fileURLToPath(file).match(/\.[^.]+$/)?.[0];
    if (!types[extension]) throw new Error('Unsupported file');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extension] }); res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(8000, '127.0.0.1', () => console.log('Local preview: http://127.0.0.1:8000/Homepage/ (Ctrl+C to stop)'));
