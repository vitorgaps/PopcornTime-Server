const seriesSourceData = require("../data/seriesSourceData");

exports.updateSeries = async function () {
  const series = await seriesSourceData.getUpdatedSeries();
  series.forEach(async (serie) => {
    await seriesSourceData.updateLocalDB(serie);
  });
};

exports.getSeries = async function () {
  return seriesSourceData.getSeries();
};
