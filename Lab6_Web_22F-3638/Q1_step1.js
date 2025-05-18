document.getElementById('step1Form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    localStorage.setItem('userData', JSON.stringify({
        name: name,
        email: email
    }));
    window.location.href = 'Q1_step2.html';
});