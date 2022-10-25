require("dotenv").config();
import axios from 'axios';
const Cache = require('../../util/cache.js');

const cache = new Cache(process.env.CLIENT_CACHE_DURATION);

export function get(endpoint) {
  const cached = cache.get(endpoint);

  if (cached) {
    return Promise.resolve(cached);
  } else {
    return axios.get('/api' + endpoint)
      .then(response => {
        cache.store(endpoint, response.data);
        return response.data;
      })
      .catch(err => {
        console.log("'GET' ERROR: ", err);
        return null;
      });
  }
}

export function post(endpoint, data) {
  return axios.post('/api' + endpoint, data);
}

export function put(endpoint, data) {
  return axios.put('/api' + endpoint, data);
}