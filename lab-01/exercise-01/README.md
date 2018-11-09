The purpose of this exercise is to get started using OpenID connect.

By using [express-openid-client](https://github.com/auth0/express-openid-client) we will inject in the application two routes to handle authentication.

Add the following require statement at the beginning of the server.js file:

```javascript
const eoc = require('express-openid-client');
```

Then add this snippet before the home route:

```javascript

app.use(eoc.routes({
  issuer_url: process.env.AUTH0_DOMAIN,
  client_id: process.env.AUTH0_CLIENT_ID,
  client_url: appUrl
}));

app.use(eoc.protect());
```

Start the application and head to http://localhost:3000/, sign up as a new user and verify you get back to your application already logged in.
