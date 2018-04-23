module.exports = function startServer(io) {
  let users = {};
  // This variable is being used
  /* eslint no-unused-vars: 0 */
  let numUser = 0;

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
};
