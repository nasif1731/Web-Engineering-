const performOperations = (operation) => {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    if (isNaN(num1) || isNaN(num2)) {
        errorDiv.style.display = 'block';
        resultDiv.innerHTML = '';
        return;
    }
    
    errorDiv.style.display = 'none';
    
    let result;
    switch(operation) {
        case 'add':
            result = num1 + num2;
            resultDiv.innerHTML = `${num1} + ${num2} = ${result}`;
            break;
        case 'subtract':
            result = num1 - num2;
            resultDiv.innerHTML = `${num1} - ${num2} = ${result}`;
            break;
        case 'multiply':
            result = num1 * num2;
            resultDiv.innerHTML = `${num1} × ${num2} = ${result}`;
            break;
        case 'divide':
            if (num2 === 0) {
                errorDiv.innerHTML = 'Cannot divide by zero';
                errorDiv.style.display = 'block';
                resultDiv.innerHTML = '';
                return;
            }
            result = num1 / num2;
            resultDiv.innerHTML = `${num1} ÷ ${num2} = ${result}`;
            break;
    }
};