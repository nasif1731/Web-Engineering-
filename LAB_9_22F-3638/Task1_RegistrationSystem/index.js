const emailInput = document.getElementById('email');
const form = document.getElementById('registration-form');
const alertContainer = document.getElementById('alert-container');
let emailAvailable = false;

// Check email availability
emailInput.addEventListener('change', async () => {
  const email = emailInput.value;
  const response = await fetch(`http://localhost:3000/api/students/check-email/${email}`);
  const data = await response.json();

  if (data.exists) {
    emailInput.classList.add('is-invalid');
    document.getElementById('email-feedback').textContent = 'Email already exists';
    emailAvailable = false;
  } else {
    emailInput.classList.remove('is-invalid');
    document.getElementById('email-feedback').textContent = '';
    emailAvailable = true;
  }
});

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!emailAvailable) {
    alertContainer.innerHTML = '<div class="alert alert-danger">Email already exists</div>';
    return;
  }

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    department: document.getElementById('department').value
  };

  const response = await fetch('http://localhost:3000/api/students/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (response.ok) {
    alertContainer.innerHTML = '<div class="alert alert-success">Registration successful</div>';
  } else {
    alertContainer.innerHTML = '<div class="alert alert-danger">Registration failed</div>';
  }
});
