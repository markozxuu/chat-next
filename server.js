// Using console is OK :P
/* eslint no-console: 0 */
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let users = {};
let numUser = 0;

nextApp.prepare().then(() => {
  io.on('connect', socket => {
    socket.on('login', (username, ack) => {
      if (users.hasOwnProperty(username)) {
        ack(true);
      } else {
        ack(false);
      }
    });

    socket.on('add users', username => {
      ++numUser;
      // we store the username in the socket session for this client
      socket.username = username;
      users[username] = username;
    });
    // when the user disconnects
    socket.on('disconnecting', () => {
      --numUser;
      delete users[socket.username];
    });
  });

  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`▲ Ready http://localhost:${port}`);
  });
});
