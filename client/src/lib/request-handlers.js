import axios from 'axios';
import Cache from './cache-client';

const cache = new Cache(6000000);

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