require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

app.get('/', (req, res) => res.send("hello!"));

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});
