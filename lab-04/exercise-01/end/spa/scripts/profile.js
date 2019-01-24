(async function() {
  if (!await restrictAccess()) return;

  const profilePicture = document.getElementById('profile-picture');
  const userFullname = document.getElementById('user-fullname');
  const userEmail = document.getElementById('user-email');
  const logoutButton = document.getElementById('log-out');

  const user = await auth0Client.getUser();
  profilePicture.src = user.picture;
  userFullname.innerText = user.name;
  userEmail.innerText = user.email;

  // making the logout button terminate the session at Auth0
  logoutButton.onclick = () => {
    auth0Client.logout({
      client_id: 'AT6YZLCKQu1llsqoE55TfEBHsITyvZIf',
      returnTo: 'http://localhost:5000/'
    });
  };
})();
