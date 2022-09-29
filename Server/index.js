const express = require('express');
let app = express();

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});