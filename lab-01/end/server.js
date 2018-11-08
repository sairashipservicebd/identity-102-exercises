require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const auth = require('./auth');

const appUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

const app = express();

app.use(morgan('combined'));

app.use(session({
  name: 'identity102-lab',
  secret: process.env.COOKIE_SECRET,
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(auth.routes({
  issuer_url: `https://${process.env.AUTH0_DOMAIN}`,
  client_id: process.env.AUTH0_CLIENT_ID,
  authorizationParams: {
    scope: 'openid profile email',
    redirect_uri: `${appUrl}/callback`
  }
}))

app.use('/user', auth.protect(), (req, res) => {
  res.send(`hello ${req.session.user.name}`);
});

app.get('/', (req, res) => res.send("hello!"));

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});
