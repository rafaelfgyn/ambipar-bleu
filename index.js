const express = require('express');
const controller = require('./api/controller')
const app = express();

app.get('/', controller);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});