const axios = require("axios");
const crypto = require("crypto");
const usersService = require("../service/usersService");
const authService = require("../route/authenticationRoute");

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

test("Should get the users", async function () {
  const response = await request("http://localhost:3000/users", "get");
  expect(response.data.length).toBeGreaterThan(0);
});

test("Should insert a user", async function () {
  const data = {
    name: "Vitor Santos",
    email: "notvitor@mail.com",
    password: "abc12345",
  };
  const response = await request("http://localhost:3000/users", "post", data);
  expect(response.status).toBe(201);
  const user = response.data;
  expect(user.name).toBe(data.name);
  expect(user.email).toBe(data.email);
  await usersService.deleteUser(user.id);
});

test("Should update a user", async function () {
  const data = {
    name: "Vitor Santos",
    email: "notvitor@mail.com",
    password: "abc12345",
  };
  const user = await usersService.createUser(data);
  data.name = "Vitor G. P. Santos";
  const response = await request(
    `http://localhost:3000/users/${user.id}`,
    "put",
    data
  );
  expect(response.status).toBe(204);
  var updated = await usersService.getUser(user.id);
  expect(updated.name).toBe(data.name);
  await usersService.deleteUser(user.id);
});
