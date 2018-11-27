require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const eoc = require('express-openid-client');
const request = require('request-promise');

const appUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('combined'));

app.use(session({
  name: 'identity102-lab',
  secret: process.env.COOKIE_SECRET,
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(eoc.routes());

app.get('/', (req, res) => {
  res.render('home', { user: req.openid && req.openid.user });
});

app.get('/user', eoc.protect(), (req, res) => {
  res.render('user', { user: req.openid && req.openid.user });
});

app.get('/expenses', eoc.protect(), async (req, res) => {
  const expenses = await request(process.env.API_URL, {
    json: true
  });

  res.render('expenses', {
    user: req.openid && req.openid.user,
    expenses
  });
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});
