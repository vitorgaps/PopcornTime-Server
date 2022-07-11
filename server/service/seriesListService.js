const seriesListData = require("../data/seriesListData");

exports.getList = function () {
  return seriesListData.getList();
};

exports.getListItem = function (id) {
  return seriesListData.getListItem(id);
};

exports.insertOnList = function (listItem, userId) {
  return seriesListData.insertOnList(listItem, userId);
};

exports.deleteFromList = function (id) {
  return seriesListData.deleteFromList(id);
};

exports.updateItemFromList = function (listItem, id) {
  return seriesListData.updateItemFromList(listItem, id);
};
