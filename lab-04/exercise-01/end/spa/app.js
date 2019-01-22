window.onload = async function() {
  const auth0Client = new Auth0Login({
    domain: 'labs102-bk.auth0.com',
    client_id: 'AT6YZLCKQu1llsqoE55TfEBHsITyvZIf'
  });

  // configuring the login button
  const loginButton = document.getElementById('log-in');
  loginButton.onclick = async () => {
    await auth0Client.loginWithRedirect({
      redirect_uri: 'http://localhost:5000/'
    });
  };

  // configuring the handle callback button
  const handleCallbackButton = document.getElementById('handle-callback');
  handleCallbackButton.onclick = async () => {
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    window.history.replaceState({}, document.title, '/');
  };
};
