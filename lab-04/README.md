## Auth0 Configuration

First and foremost, you will need to create an Auth0 Application to represent your app. To do so, head to the [_Applications_ section of your Auth0 Dashboard](https://manage.auth0.com/#/applications) and click on _Create Application_. On the form that Auth0 shows, name your application and choose _Single Page Web App_ as its type. Then, after clicking on _Create_, head to the _Settings_ tab and change the following two fields:

- _Allowed Callback URLs_: In this field, add `http://localhost:5000/callback`. This will make Auth0 whitelist this callback URL for users authenticating through this app.
- _Allowed Logout URLs_: In this field, add `http://localhost:5000/`. This is the only URL Auth0 will call after a logout attempt.

After changing these fields, hit the _Save Changes_ button. Then, use the _Domain_ and the _Client ID_ properties of your new Auth0 Application to replace `client_id` and `domain` on the `./exercise-01/end/spa/app.js` file.

## Running the Sample
 
To serve the SPA locally, you can use [the `serve` NPM package](https://github.com/zeit/serve#readme):

```bash
npm i -g serve

serve ./exercise-01/end/spa/
```
