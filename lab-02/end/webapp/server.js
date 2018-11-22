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
  issuer_base_url: process.env.AUTH0_DOMAIN,
  client_id: process.env.AUTH0_CLIENT_ID,
  client_secret: process.env.AUTH0_CLIENT_SECRET,
  base_url: appUrl,
  authorizationParams: {
    response_type: 'code id_token',
    audience: 'https://expenses-api',
    scope: 'openid profile email reports:read'
  },
}));

app.get('/', (req, res) => {
  res.render('home', {user: req.session.user});
});

app.get('/user', eoc.protect(), (req, res) => {
  res.render('user', {user: req.session.user});
});

app.get('/expenses', eoc.protect(), (req, res) => {
  request(process.env.API_URL, {
    headers: {
      authorization: `Bearer ${req.session.accessToken}`
    },
    json:true
  }).then((data) => {
    res.render('expenses', {
      user: req.session.user,
      expenses: data
    });
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});
