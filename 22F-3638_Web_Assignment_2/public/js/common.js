// Utility function to get the authentication token from localStorage
function getToken() {
    return localStorage.getItem('token');
  }
  
  // Utility function to set the authentication token in localStorage
  function setToken(token) {
    localStorage.setItem('token', token);
  }
  
  // Utility function to remove the authentication token from localStorage
  function removeToken() {
    localStorage.removeItem('token');
  }
  
  // Utility function to get the user's role from localStorage
  function getUserRole() {
    return localStorage.getItem('userRole');
  }
  
  // Utility function to set the user's role in localStorage
  function setUserRole(role) {
    localStorage.setItem('userRole', role);
  }
  
  // Utility function to remove the user's role from localStorage
  function removeUserRole() {
    localStorage.removeItem('userRole');
  }
  
  // Utility function to check if the user is logged in
  function isLoggedIn() {
    return !!getToken();
  }
  
  // Utility function to log out the user
  function logout() {
    removeToken();
    removeUserRole();
    window.location.href = '/auth/login';
  }
  
  // Utility function to validate form fields
  function validateForm(fields) {
    for (const field of fields) {
      if (!field.value.trim()) {
        return false;
      }
    }
    return true;
  }
  
  // Utility function to display error messages
  function displayError(message, elementId = 'errorMessage') {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
    } else {
      alert(message);
    }
  }
  
  // Utility function to hide error messages
  function hideError(elementId = 'errorMessage') {
    const errorDiv = document.getElementById(elementId);
    if (errorDiv) {
      errorDiv.style.display = 'none';
    }
  }
  
  // Utility function to make API requests with authentication
  function apiRequest(url, method = 'GET', body = null) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    };
    const options = { method, headers };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }
        return response.json();
      });
  }