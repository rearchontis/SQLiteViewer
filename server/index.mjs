import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';

const getFilePath = filename => path.resolve('server', filename);

// const options = {
//   key: await fs.promises.readFile(getFilePath('key.pem')),
//   cert: await fs.promises.readFile(getFilePath('cert.pem')),
// };

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url);

  if (req.url === '/main.db') {
    const filepath = getFilePath('main.db');
    const filestats = await fs.promises.stat(filepath);
    const stream = fs.createReadStream(filepath);
    res.setHeader('Content-Length', filestats.size);

    stream.pipe(res);

    // curl http://localhost:3000/main.db > output.db
  }
});

server.listen(3000, () => {
  console.log('server started on http://localhost:3000');
  // console.log('public access on https://192.168.31.71:3000');
});
