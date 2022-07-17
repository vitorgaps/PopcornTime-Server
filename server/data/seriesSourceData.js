const axios = require("axios");
const database = require("../infra/database");

exports.getUpdatedSeries = async function () {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=pt-BR&page=4`
  );
  var series = [];
  response.data.results.forEach((serie) => {
    series.push({
      name: serie.name,
      imageUrl:
        "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + serie.poster_path,
      description: serie.overview,
      apiSerieId: serie.id,
      ratingAverage: serie.vote_average,
      ratingNumber: serie.vote_count,
    });
  });
  return series;
};

exports.updateLocalDB = function (serie) {
  return database.one(
    'insert into series ("name","imageUrl","description","ratingAverage","ratingNumber","apiSerieId") values ($1,$2,$3,$4,$5,$6) returning *',
    [
      serie.name,
      serie.imageUrl,
      serie.description,
      serie.ratingAverage,
      serie.ratingNumber,
      serie.apiSerieId,
    ]
  );
};
