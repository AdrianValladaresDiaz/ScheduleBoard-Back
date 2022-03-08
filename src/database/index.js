const { default: mongoose } = require("mongoose");
const debug = require("debug")("SCHEDBORD:database");

const connectToDataBase = (uri) =>
  new Promise((resolve, reject) => {
    mongoose.connect(uri, (error) => {
      if (error) {
        reject(error);
        return;
      }
      debug("database connected");
      resolve();
    });
  });

module.exports = connectToDataBase;
