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
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle, no-param-reassign
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle, no-param-reassign
        delete ret.__v;
      },
    });
  });

module.exports = connectToDataBase;
