// Native
const { parse } = require('url');
// Packages
const next = require('next');
const micro = require('micro');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE.ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const server = micro(async (req, res) => {
  const parseUrl = parse(req.url, true);
  return handle(req, res, parseUrl);
});

async function setup(handler) {
  await app.prepare();
  return handler;
}

const io = require('socket.io')(server);
// socket-io handlers are in websocket-server.js
require('./websocket-server.js')(io);

server.listen(port, err => {
  // Using console is OK :P
  /* eslint no-console: 0 */
  if (err) throw err;
  console.log(`𝚫 Ready On http://localhost:${port}`);
});

module.exports = setup(server);
