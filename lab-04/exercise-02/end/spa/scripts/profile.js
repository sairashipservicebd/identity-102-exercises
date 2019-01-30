(async function() {
  if (!await allowAccess()) return;

  const profilePicture = document.getElementById('profile-picture');
  const userFullname = document.getElementById('user-fullname');
  const userEmail = document.getElementById('user-email');

  const user = await auth0Client.getUser();
  profilePicture.src = user.picture;
  userFullname.innerText = user.name;
  userEmail.innerText = user.email;

  const consentNeeded = document.getElementById('consent-needed');
  const expensesDiv = document.getElementById('expenses-container');
  const expensesList = document.getElementById('expenses-list');
  const loadExpesesButton = document.getElementById('load-expenses');

  async function loadExpenses(accesstoken) {
    const response = await fetch('http://localhost:3001/', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${accesstoken}`
      },
    });

    const expenses = await response.json();

    expenses.forEach(expense => {
      const newItem = document.createElement('li');
      const description = `$ ${expense.value.toFixed(2)} ` +
                          `- ${expense.description}`;
      const newItemDescription = document.createTextNode(description);
      newItem.appendChild(newItemDescription);
      expensesList.appendChild(newItem);
    });

    consentNeeded.style.display = 'none';
    loadExpesesButton.style.display = 'none';
    expensesDiv.style.display = 'block';
  }

  const expensesAPIOptions = {
    audience: 'https://expenses-api',
    scope: 'read:reports',
  };

  let accesstoken;
  try {
    accesstoken = await
        auth0Client.getTokenSilently(expensesAPIOptions);
    await loadExpenses(accesstoken);
  } catch (err) {
    consentNeeded.style.display = 'block';
    loadExpesesButton.style.display = 'inline-block';
  }

  loadExpesesButton.onclick = async () => {
    accesstoken = await
        auth0Client.getTokenWithPopup(expensesAPIOptions);
    await loadExpenses(accesstoken);
  };
})();
