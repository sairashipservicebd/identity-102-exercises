require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const request = require('request-promise');
const {auth, requiresAuth} = require('express-openid-connect');

const appUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('combined'));

app.use(session({
  name: 'identity102-lab-02',
  secret: process.env.COOKIE_SECRET,
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(auth({
  required: false,
  auth0Logout: true
}));

app.get('/', (req, res) => {
  res.render('home', { user: req.openid && req.openid.user });
});

app.get('/user', requiresAuth(), (req, res) => {
  res.render('user', { user: req.openid && req.openid.user });
});

app.get('/expenses', requiresAuth(), errorHandler(async (req, res) => {
  const expenses = await request(process.env.API_URL, {
    json: true
  });

  res.render('expenses', {
    user: req.openid && req.openid.user,
    expenses,
  });
}));

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

function errorHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error(err.stack);
      res.status(500).send(err);
    });
  };
}

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});
