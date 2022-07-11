const axios = require("axios");
const crypto = require("crypto");
const seriesListService = require("../service/seriesListService");

const request = function (url, method, data) {
  return axios({ url, method, data, validateStatus: false });
};

test("Should get series list", async function () {
  const response = await request("http://localhost:3000/series/list", "get");
  expect(response.status).toBe(200);
});

test("Should get a specific serie list item", async function () {
  const data = { serieId: 1, watched: false, onList: true };
  const listItem = await seriesListService.insertOnList(data, 1);
  const response = await request(
    `http://localhost:3000/series/list/${listItem.id}`,
    "get"
  );
  expect(response.data.watched).toBe(data.watched);
  expect(response.data.onList).toBe(data.onList);
  await seriesListService.deleteFromList(listItem.id);
});

test("Should insert a item on list", async function () {
  const data = { serieId: 1, watched: false, onList: true };
  const seriesList = await seriesListService.getList();
  const response = await request(
    `http://localhost:3000/series/list/user/1`,
    "post",
    data
  );
  expect(response.status).toBe(201);
  expect(response.data.serieId).toBe(data.serieId);
  expect(response.data.watched).toBe(data.watched);
  expect(response.data.onList).toBe(data.onList);
  expect((await seriesListService.getList()).length).toBe(
    seriesList.length + 1
  );
  await seriesListService.deleteFromList(response.data.id);
});

test("Should delete a item of list", async function () {
  const data = { serieId: 1, watched: false, onList: true };
  const listItem = await seriesListService.insertOnList(data, 1);
  const seriesList = await seriesListService.getList();
  const response = await request(
    `http://localhost:3000/series/list/${listItem.id}`,
    "delete"
  );
  expect(response.status).toBe(204);
  expect((await seriesListService.getList()).length).toBe(
    seriesList.length - 1
  );
});

test("Should update a item", async function () {
  const data = { serieId: 1, watched: false, onList: true };
  const listItem = await seriesListService.insertOnList(data, 1);
  expect(listItem.watched).toBe(false);
  expect(listItem.onList).toBe(true);
  const updatedData = { watched: true, onList: false };
  const response = await request(
    `http://localhost:3000/series/list/${listItem.id}`,
    "put",
    updatedData
  );
  const updatedItem = await seriesListService.getListItem(listItem.id);
  expect(response.status).toBe(204);
  expect(updatedItem.watched).toBe(true);
  expect(updatedItem.onList).toBe(false);
  await seriesListService.deleteFromList(listItem.id);
});
