function toggleForm() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    if (signupForm.style.display === 'none') {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const errorElement = document.getElementById('signup-error');
    if (password.length < 6) {
        errorElement.textContent = 'Password must be at least 6 characters long';
        return false;
    }
    if (!email.includes('@')) {
        errorElement.textContent = 'Please enter a valid email address';
        return false;
    }
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.find(u => u.email === email)) {
        errorElement.textContent = 'Email already registered';
        return false;
    }
    
    errorElement.textContent = '';

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    event.target.reset();
    toggleForm();
    return false;
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        errorElement.textContent = '';
        alert('Login successful!');
        event.target.reset();
    } else {
        errorElement.textContent = 'Invalid email or password';
    }
    
    return false;
}