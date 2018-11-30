require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const appUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

const app = express();

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send("hello!"));

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});
