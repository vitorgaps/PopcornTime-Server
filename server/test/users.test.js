const axios = require("axios");
const crypto = require("crypto");
const usersService = require("../service/usersService");
const request = require("./utils/requestUtil");
const createUser = require("./utils/createUser");

test("Should get the users", async function () {
  const user = await createUser();
  const response = await request(
    "http://localhost:3333/users",
    "get",
    "",
    user.token
  );
  expect(response.data.length).toBeGreaterThan(0);
  await usersService.deleteUser(user.id);
});

test("Should insert a user", async function () {
  const data = {
    name: "Vitor Santos",
    email: "notvitor@mail.com",
    password: "abc12345",
  };
  const response = await request("http://localhost:3333/users", "post", data);
  expect(response.status).toBe(201);
  const user = response.data;
  expect(user.name).toBe(data.name);
  expect(user.email).toBe(data.email);
  await usersService.deleteUser(user.id);
});

test("Should update a user", async function () {
  const user = await createUser();
  const data = {
    name: "Vitor Santos",
    email: "notvitor@mail.com",
    password: "abc12345",
  };
  data.name = "Vitor G. P. Santos";
  const response = await request(
    `http://localhost:3333/users/${user.id}`,
    "put",
    data,
    user.token
  );
  expect(response.status).toBe(204);
  var updated = await usersService.getUser(user.id);
  expect(updated.name).toBe(data.name);
  await usersService.deleteUser(user.id);
});
