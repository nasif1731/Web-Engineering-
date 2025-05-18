const userData = JSON.parse(localStorage.getItem('userData'));
document.getElementById('userInfo').innerHTML = `
            <p>Name: ${userData.name}</p>
            <p>Email: ${userData.email}</p>
        `;

document.getElementById('step2Form').addEventListener('submit', function (e) {
    e.preventDefault();
    const phone = document.getElementById('phone').value;
    userData.phone = phone;
    localStorage.setItem('userData', JSON.stringify(userData));
    document.getElementById('step2Form').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
});