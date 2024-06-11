const mongoose = require("mongoose");
//mongodb connect
const configDB = (URI) => {
  mongoose
    .connect(URI)
    .then(() => {
      console.log("connect mongodb success!");
    })
    .catch(() => {
      console.log("connect mongodb failed");
    });
};

module.exports = configDB;
