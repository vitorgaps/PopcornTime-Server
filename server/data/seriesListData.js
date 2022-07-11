const database = require("../infra/database");

exports.getList = function () {
  var result = database.query('select * from "listItens"');
  return result;
};

exports.getListItem = function (id) {
  var result = database.one('select * from "listItens" where "id" = $1', id);
  console.log(result);
  return result;
};

exports.insertOnList = function (listItem, userId) {
  return database.one(
    'insert into "listItens" ("serieId","userId", "watched", "onList") values ($1,$2,$3,$4) returning *',
    [listItem.serieId, userId, listItem.watched, listItem.onList]
  );
};

exports.updateItemFromList = function (listItem, id) {
  return database.none(
    'update "listItens" set "watched" = $1, "onList" = $2 where "id" = $3',
    [listItem.watched, listItem.onList, id]
  );
};

exports.deleteFromList = function (id) {
  return database.none('delete from "listItens" where "id" = $1', id);
};
