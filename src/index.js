require("dotenv").config();
const debug = require("debug")("SCHEDBORD:main");
const launchExpressApp = require("./server/launchers/launchExpressApp");
const launchServer = require("./server/launchers/launchServer");

const port = process.env.PORT || 8000;

(async () => {
  debug("Starting app...");
  try {
    const app = launchExpressApp();
    launchServer(port, app);
  } catch (error) {
    debug("Main failed to run");
    debug(`${error}`);
  }
})();