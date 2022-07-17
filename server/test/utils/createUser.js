const usersService = require("../../service/usersService");
const request = require("./requestUtil");

const createUser = async function () {
  const data = {
    name: "Vitor Santos",
    email: "notvitor@mail.com",
    password: "abc12345",
  };
  const user = await usersService.createUser(data);
  data.id = user.id;
  const response = await request("http://localhost:3000/login", "post", data);
  user.token = response.data.token;
  return user;
};

module.exports = createUser;
