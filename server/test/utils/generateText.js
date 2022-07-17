const crypto = require("crypto");

const generate = function () {
  return crypto.randomBytes(20).toString("hex");
};

module.exports = generate;
