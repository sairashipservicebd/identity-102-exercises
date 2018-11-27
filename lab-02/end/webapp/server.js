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
  name: 'identity102-lab-02',
  secret: process.env.COOKIE_SECRET,
}));

app.use(bodyParser.urlencoded({extended: false}));

app.use(eoc.routes({
  authorizationParams: {
    response_type: 'code id_token',
    audience: 'https://expenses-api',
    scope: 'openid profile email reports:read offline_access'
  },
}));

app.get('/', (req, res) => {
  res.render('home', {user: req.session.user});
});

app.get('/user', eoc.protect(), (req, res) => {
  res.render('user', {user: req.session.user});
});

app.get('/expenses', eoc.protect(), async (req, res) => {
  const {expires_at} = req.session.tokens;

  if (expires_at * 1000 <= Date.now()) {
    const {refresh_token} = req.session.tokens;
    res.send('you will need a refresh token');
  }

  const expenses = await request(process.env.API_URL, {
    headers: {
      authorization: `Bearer ${req.session.tokens.access_token}`
    },
    json: true
  });

  res.render('expenses', {
    user: req.session.user,
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
