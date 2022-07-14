const userService = require("./usersService");

exports.authenticate = async function (user) {
  const { id, password } = user;
  const loggedUser = await userService.getUser(id);
  const valid = await verify(password, loggedUser.password);
  if (valid && loggedUser.email == user.email) return id;
  return 0;
};

async function verify(password, hash) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString("hex"));
    });
  });
}
