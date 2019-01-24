const content = document.getElementById('content');
const loadingIndicator = document.getElementById('loading-indicator');

// configuring the Auth0 library
const auth0Client = new Auth0Login({
  domain: 'labs102-bk.auth0.com',
  client_id: 'AT6YZLCKQu1llsqoE55TfEBHsITyvZIf'
});

window.onload = async function() {
  let requestedView = window.location.hash;

  if (requestedView === '#callback') {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, '/');
  } else {
    await auth0Client.init();
  }

  const authenticated = await auth0Client.isAuthenticated();

  if (requestedView === '' && !authenticated) requestedView = '#sign-in';
  if (requestedView === '' && authenticated) requestedView = '#profile';
  if (requestedView === '#sign-in' && authenticated) requestedView = '#profile';
  if (requestedView === '#callback' && authenticated) requestedView = '#profile';
  if (requestedView === '#callback' && !authenticated) requestedView = '#profile';
  await loadView(requestedView);
};

async function loadView(viewName) {
  content.innerHTML = '';
  viewName = viewName.substring(1);
  window.history.replaceState({}, document.title, `/#${viewName}`);
  const response = await fetch(`/views/${viewName}.html`);
  content.innerHTML = await response.text();

  var scriptTag = document.createElement('script');
  scriptTag.src = `/scripts/${viewName}.js`;

  content.appendChild(scriptTag);

  loadingIndicator.style.display = 'none';
  content.style.display = 'block';
}

async function restrictAccess() {
  if (!await auth0Client.isAuthenticated()) {
    await loadView('#sign-in');
    return false;
  }
  return true;
}
