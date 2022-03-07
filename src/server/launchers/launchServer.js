const { listen } = require("express/lib/application");

const debug = require("debug")("SCHEDBORD:server-launcher");

const launchServer = (port, app) =>
  new Promise((resolve, reject) => {
    debug("launching server...");
    const server = listen(port, () => {
      debug(`server listening to port ${port}`);
      resolve();
    });

    server.on("error", () => {
      debug("server ran into an error, rejecting...");
      reject();
    });
  });

module.exports = launchServer;
