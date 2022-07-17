const axios = require("axios");

const request = function (url, method, data, token) {
  return axios({
    url,
    method,
    data,
    headers: { Authorization: `${token}` ?? "" },
    validateStatus: false,
  });
};

module.exports = request;
