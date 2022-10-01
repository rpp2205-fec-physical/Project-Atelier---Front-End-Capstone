const path = require('path')
const express = require('express');
let app = express();

let port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/api', (req, res) => {
  res.send('Hello API')
})

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});