window.onload = async function() {
  const loginButton = document.getElementById('log-in');
  const expensesContainer = document.getElementById('expenses-container');
  const expensesList = document.getElementById('expenses-list');
  const fetchTokenButton = document.getElementById('fetch-token');
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
    await showProfile();
    window.history.replaceState({}, document.title, '/');
  } else {
    await auth0Client.init();
    await showProfile();
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
  };

  // configuring the fetch access token button
  fetchTokenButton.onclick = async () => {
    const expensesAPIOptions = {
      audience: 'https://expenses-api',
      scope: 'read:reports',
      silentOnly: false,
      redirect_uri: 'http://localhost:5000/#callback'
    };

    await auth0Client.loginWithPopup(expensesAPIOptions);
    const token = await auth0Client.getToken(expensesAPIOptions);

    const response = await fetch('http://localhost:3001/', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    const expenses = await response.json();

    expenses.forEach(expense => {
      const newItem = document.createElement('li');
      const newItemDescription = document.createTextNode(`$ ${expense.value.toFixed(2)} - ${expense.description}`);
      newItem.appendChild(newItemDescription);
      expensesList.appendChild(newItem);
    });
    expensesContainer.style.display = 'block';
  };

  // function to render the user profile on the page
  async function showProfile() {
    const isAuthenticated = await auth0Client.isAuthenticated();
    if (!isAuthenticated) return;

    const user = await auth0Client.getUser();
    profilePicture.src = user.picture;
    userFullname.innerText = user.name;
    userEmail.innerText = user.email;
    profile.style.display = 'block';
    loginButton.style.display = 'none';
    fetchTokenButton.style.display = 'inline-block';
    logoutButton.style.display = 'inline-block';
  }
};
