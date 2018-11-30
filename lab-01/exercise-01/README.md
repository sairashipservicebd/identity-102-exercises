The purpose of this exercise is to get started using OpenID connect.

By using [express-openid-connect](https://github.com/auth0/express-openid-connect) we will inject in the application two routes to handle authentication. Namely `/login` and `/callback`.

Add the following require statement at the beginning of the server.js file:

```javascript
const {auth} = require('express-openid-connect');
```

Then add this snippet before the home route:

```javascript
app.use(auth());
```

Create a copy of the `.env-sample` file as `.env` and enter the `ISSUER_BASE_URL` and the `CLIENT_ID`. The `ISSUER_BASE_URL` has this forms `https://<your-name>.auth0.com`

Start the application and head to [http://localhost:3000/](http://localhost:3000/), sign up as a new user and verify you get back to your application already logged in.

## What's happening here?

When you navigate to the homepage the `auth()` middleware detects that you are not logged in yet, it first stores the url you tried to access (the homepage) and then forwards you to the Authorization Server. Once you sign, the Authorization Server will redirect you back to the application `/callback`.

The purpose of this route is to handle the response of the Authorization Server. Once it checks everything, it will redirect you again to the homepage.
