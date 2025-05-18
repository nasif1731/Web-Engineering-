document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;

   
    alert(`Full Name: ${fullName}\nEmail: ${email}\nSelected Course: ${course}`);

    
    this.reset();
});