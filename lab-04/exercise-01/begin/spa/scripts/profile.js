(async function() {
  if (!await allowAccess()) return;

  const profilePicture = document.getElementById('profile-picture');
  const userFullname = document.getElementById('user-fullname');
  const userEmail = document.getElementById('user-email');
})();
