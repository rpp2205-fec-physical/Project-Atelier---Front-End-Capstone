require("dotenv").config();
const proxy = require('./controllers/proxy');
const logger = require("./middleware/logger");
const path = require('path')
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(logger);
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api/*', proxy);

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
