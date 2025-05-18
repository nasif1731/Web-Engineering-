document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const message = document.getElementById('message');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        // Display success message
        message.textContent = "Form Submitted Successfully!";
        message.classList.remove('hidden');
        contactForm.reset(); 
    });
});
