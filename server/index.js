require("dotenv").config();
const path = require('path')
const express = require('express');
let app = express();
let axios = require('axios')

const port = process.env.PORT;
const auth = process.env.AUTHORIZATION;
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/products', (req, res) => {
  // likely move this into a controller file?
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/'
  axios.get(url, {
    headers: {
      'Authorization': auth
    }
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch(err => {
    console.log(err);
  });
})

app.get('/api/products/71697/styles', (req, res) => {
  // likely move this into a controller file?
  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/'
  axios.get(url, {
    headers: {
      'Authorization': auth
    }
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch(err => {
    console.log(err);
  });
})

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
