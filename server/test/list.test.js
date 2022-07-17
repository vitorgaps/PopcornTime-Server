const axios = require("axios");
const crypto = require("crypto");
const seriesListService = require("../service/seriesListService");
const usersService = require("../service/usersService");
const request = require("./utils/requestUtil");
const createUser = require("./utils/createUser");

test("Should get series list", async function () {
  const user = await createUser();
  const response = await request(
    "http://localhost:3333/series/list",
    "get",
    "",
    user.token
  );
  expect(response.status).toBe(200);
  await usersService.deleteUser(user.id);
});

test("Should get a specific serie list item", async function () {
  const user = await createUser();
  const data = { serieId: 1, watched: false, onList: true };
  const listItem = await seriesListService.insertOnList(data, user.id);
  const response = await request(
    `http://localhost:3333/series/list/${listItem.id}`,
    "get",
    "",
    user.token
  );
  expect(response.data.watched).toBe(data.watched);
  expect(response.data.onList).toBe(data.onList);
  await seriesListService.deleteFromList(listItem.id);
  await usersService.deleteUser(user.id);
});

test("Should insert a item on list", async function () {
  const user = await createUser();
  const data = { serieId: 1, watched: false, onList: true };
  const seriesList = await seriesListService.getList();
  const response = await request(
    `http://localhost:3333/series/list/user/${user.id}`,
    "post",
    data,
    user.token
  );
  expect(response.status).toBe(201);
  expect(response.data.serieId).toBe(data.serieId);
  expect(response.data.watched).toBe(data.watched);
  expect(response.data.onList).toBe(data.onList);
  expect((await seriesListService.getList()).length).toBe(
    seriesList.length + 1
  );
  await seriesListService.deleteFromList(response.data.id);
  await usersService.deleteUser(user.id);
});

test("Should delete a item of list", async function () {
  const user = await createUser();
  const data = { serieId: 1, watched: false, onList: true };
  const listItem = await seriesListService.insertOnList(data, user.id);
  const seriesList = await seriesListService.getList();
  const response = await request(
    `http://localhost:3333/series/list/${listItem.id}`,
    "delete",
    "",
    user.token
  );
  expect(response.status).toBe(204);
  expect((await seriesListService.getList()).length).toBe(
    seriesList.length - 1
  );
  await usersService.deleteUser(user.id);
});

test("Should update a item", async function () {
  const user = await createUser();
  const data = { serieId: 1, watched: false, onList: true };
  const listItem = await seriesListService.insertOnList(data, user.id);
  expect(listItem.watched).toBe(false);
  expect(listItem.onList).toBe(true);
  const updatedData = { watched: true, onList: false };
  const response = await request(
    `http://localhost:3333/series/list/${listItem.id}`,
    "put",
    updatedData,
    user.token
  );
  const updatedItem = await seriesListService.getListItem(listItem.id);
  expect(response.status).toBe(204);
  expect(updatedItem.watched).toBe(true);
  expect(updatedItem.onList).toBe(false);
  await seriesListService.deleteFromList(listItem.id);
  await usersService.deleteUser(user.id);
});
