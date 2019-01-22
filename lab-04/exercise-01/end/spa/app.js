window.onload = async function() {
  const loginButton = document.getElementById('log-in');
  const logoutButton = document.getElementById('log-out');
  const profile = document.getElementById('profile');
  const profilePicture = document.getElementById('profile-picture');
  const userFullname = document.getElementById('user-fullname');
  const userEmail = document.getElementById('user-email');


  const auth0Client = new Auth0Login({
    domain: 'labs102-bk.auth0.com',
    client_id: 'AT6YZLCKQu1llsqoE55TfEBHsITyvZIf'
  });

  if (window.location.hash === '#callback') {
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    profilePicture.src = user.picture;
    userFullname.innerText = user.name;
    userEmail.innerText = user.email;
    profile.style.display = 'block';
    loginButton.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    window.history.replaceState({}, document.title, '/');
  }

  // configuring the login button
  loginButton.onclick = async () => {
    await auth0Client.loginWithRedirect({
      redirect_uri: 'http://localhost:5000/#callback'
    });
  };

  // configuring the logout button
  logoutButton.onclick = () => {
    auth0Client.logout({
      client_id: 'AT6YZLCKQu1llsqoE55TfEBHsITyvZIf',
      returnTo: 'http://localhost:5000/'
    });
  }
};
