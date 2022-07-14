const axios = require("axios");
const crypto = require("crypto");
const usersService = require("../service/usersService");
const authService = require("../route/authenticationRoute");

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

test("Should authenticate the user", async function () {
  const data = {
    name: "Vitor Santos",
    email: "notvitor@mail.com",
    password: "abc12345",
  };
  const user = await usersService.createUser(data);
  const loginBody = {
    id: 20,
    email: "notvitor@mail.com",
    password: "abc12345",
  };
  const response = await request(
    "http://localhost:3000/login",
    "post",
    loginBody
  );
  const loginObject = response.body;
  expect(loginObject.auth).toBe(true);
  await usersService.deleteUser(user.id);
});