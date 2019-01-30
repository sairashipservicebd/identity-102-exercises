(async function() {
  const logInButton = document.getElementById('log-in');
  const logOutButton = document.getElementById('log-out');

  logInButton.onclick = async () => {
    await auth0Client.loginWithRedirect({
      redirect_uri: 'http://localhost:5000/#callback'
    });
  };

  logOutButton.onclick = () => {
    auth0Client.logout({
      returnTo: 'http://localhost:5000/'
    });
  };

  const isAuthenticated = await auth0Client.isAuthenticated();
  if (isAuthenticated) logOutButton.style.display = 'inline-block';
  else logInButton.style.display = 'inline-block';
})();
