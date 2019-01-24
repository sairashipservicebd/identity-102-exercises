(async function() {
  if (!await restrictAccess()) return;

  const profilePicture = document.getElementById('profile-picture');
  const userFullname = document.getElementById('user-fullname');
  const userEmail = document.getElementById('user-email');

  const user = await auth0Client.getUser();
  profilePicture.src = user.picture;
  userFullname.innerText = user.name;
  userEmail.innerText = user.email;
})();
