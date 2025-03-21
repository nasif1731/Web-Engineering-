// Initialize the authentication script when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
});

// Handle login form submission
function handleLogin(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get form input values
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const userType = document.getElementById('userType').value;
  
  // Validate inputs
  if (!username || !password) {
    displayError('Please enter both username and password');
    return;
  }
  
  // Prepare the login data
  const loginData = { username, password, userType };
  
  // Send login request to the server
  fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json();
  })
  .then(data => {
    // Assuming the server returns a token and user role
    localStorage.setItem('token', data.token);
    localStorage.setItem('userRole', data.role);
    
    // Redirect to the appropriate dashboard
    if (data.role === 'admin') {
      window.location.href = '/admin/dashboard';
    } else if (data.role === 'student') {
      window.location.href = '/student/dashboard';
    } else {
      displayError('Unknown user role');
    }
  })
  .catch(error => {
    console.error('Error during login:', error);
    displayError('Invalid credentials or server error');
  });
}

// Display error messages to the user
function displayError(message) {
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  } else {
    alert(message);
  }
}