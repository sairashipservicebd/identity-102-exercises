require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const eoc = require('express-openid-client');

const appUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

const app = express();

app.use(morgan('combined'));

app.use(session({
  name: 'identity102-lab',
  secret: process.env.COOKIE_SECRET,
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(eoc.routes());
app.use(eoc.protect());

app.get('/', (req, res) => res.send("hello!"));

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});
