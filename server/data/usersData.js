const database = require("../infra/database");

exports.getList = function () {
  return database.query("select * from users");
};

exports.getUser = function (id) {
  return database.one('select * from users where "id" = $1', id);
};

exports.createUser = function (nome, email, password) {
  return database.one(
    'insert into users ("name","email","password") values ($1,$2,$3) returning *',
    [nome, email, password]
  );
};

exports.deleteUser = function (id) {
  return database.none('delete from users where "id" = $1', id);
};

exports.updateUser = function (nome, email, password, id) {
  return database.none(
    'update users set "name" = $1, "email" = $2, "password" = $3 where "id" = $4',
    [nome, email, password, id]
  );
};
