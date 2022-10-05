require("dotenv").config();
const axios = require('axios');
const upstreamApi = process.env.APIURL;

const Cache = require('../util/cache');
const cache = new Cache(process.env.CACHE_DURATION);

const options = {
  headers: {
    'Authorization': process.env.AUTHORIZATION
  }
};

module.exports = (req, res) => {
  const endpoint = req.url.slice(4);
  const url = upstreamApi + endpoint;
  const cached = cache.get(endpoint);

  if (cached) {
    res.send(cached);
  } else {
    axios.get(url, options)
      .then(response => {
        cache.store(endpoint, response.data);
        res.send(response.data);
      })
      .catch(err => {
        console.log('PROXY ERROR: ', err);
        res.status(500).end();
      });
  }
};