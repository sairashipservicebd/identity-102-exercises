(async function() {
  const signInButton = document.getElementById('sign-in');
  const summary = document.getElementById('summary');
  const expensesCount = document.getElementById('expenses-count');
  const expensesTotal = document.getElementById('expenses-total');

  signInButton.onclick = async () => {
    await auth0Client.loginWithRedirect({
      redirect_uri: 'http://localhost:5000/#callback'
    });
  };

  const response = await fetch('http://localhost:3001/total');

  const expenses = await response.json();
  expensesCount.innerText = expenses.count;
  expensesTotal.innerText = expenses.total.toFixed(2);
  summary.style.display = 'block';
})();
