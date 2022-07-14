const usersData = require("../data/usersData");
const crypto = require("crypto");

exports.getList = function () {
  return usersData.getList();
};

exports.getUser = function (id) {
  return usersData.getUser(id);
};

exports.createUser = async function (user) {
  const { name, email, password } = user;
  const encriptedPassword = await hash(password);
  return usersData.createUser(name, email, encriptedPassword);
};

exports.deleteUser = function (id) {
  return usersData.deleteUser(id);
};

exports.updateUser = async function (user, id) {
  const { name, email, password } = user;
  const encriptedPassword = await hash(password);
  return usersData.updateUser(name, email, encriptedPassword, id);
};

async function hash(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(8).toString("hex");

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
}
