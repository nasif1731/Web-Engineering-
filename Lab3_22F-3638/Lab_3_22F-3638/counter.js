let count = 0;

        const counterDisplay = document.getElementById('counter');
        const increaseButton = document.getElementById('increase');
        const decreaseButton = document.getElementById('decrease');
        const resetButton = document.getElementById('reset');
        const incrementValueInput = document.getElementById('incrementValue');

        increaseButton.addEventListener('click', () => {
            const incrementValue = parseInt(incrementValueInput.value) || 1;
            count += incrementValue;
            counterDisplay.textContent = count;
    });

        decreaseButton.addEventListener('click', () => {
            const decrementValue = parseInt(incrementValueInput.value) || 1;
            count = Math.max(0, count - decrementValue);
            counterDisplay.textContent = count;
        });

        resetButton.addEventListener('click', () => {
            count = 0;
            counterDisplay.textContent = count;
            incrementValueInput.value = 1; 
        });