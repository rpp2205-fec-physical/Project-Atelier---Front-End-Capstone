require("dotenv").config();
const axios = require('axios');
const upstreamApi = process.env.APIURL;
const headers = {
  'Authorization': process.env.AUTHORIZATION
};
const Cache = require('../lib/cache');
const cache = new Cache(process.env.CACHE_DURATION);

module.exports = (req, res) => {
  const method = req.method;
  const endpoint = req.url.slice(4);
  const url = upstreamApi + endpoint;

  switch (method) {
    case 'GET':
      const cached = cache.get(endpoint);

      if (cached) {
        res.send(cached);
      } else {
        axios.get(url, { headers })
          .then(response => {
            cache.store(endpoint, response.data);
            res.send(response.data);
          })
          .catch(err => {
            console.log('PROXY ERROR: ', err);
            res.status(500).end();
          });
      }
      break;

    case 'POST':
    case 'PUT':
      const data = req.body;
      const config = { method, url, headers, data };

      axios(config)
        .then(response => {
          res.status(response.status).end();
        })
        .catch(err => {
          console.log('PROXY ERROR: ', config);
          res.status(500).end();
        });
  }

};