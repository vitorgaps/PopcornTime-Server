const database = require("../infra/database");

exports.getReviews = function () {
  var result = database.query("select * from reviews");
  return result;
};

exports.getReviewsByUser = function (id) {
  return database.query('select * from reviews where "userId" = $1', id);
};

exports.getReviewsById = function (id) {
  return database.one('select * from reviews where "id" = $1', [id]);
};

exports.saveReview = function (review) {
  return database.one(
    'insert into reviews ("serieId","userId","reviewText","reviewNote") values ($1,$2,$3,$4) returning *',
    [review.serieId, review.userId, review.reviewText, review.reviewNote]
  );
};

exports.updateReview = function (review, id) {
  return database.none(
    'update reviews set "serieId" = $1, "userId" = $2, "reviewText" = $3, "reviewNote" = $4 where "id" = $5',
    [review.serieId, review.userId, review.reviewText, review.reviewNote, id]
  );
};

exports.deleteReview = function (id) {
  return database.none("delete from reviews where id=$1", id);
};
