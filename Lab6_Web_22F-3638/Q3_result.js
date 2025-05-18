window.onload = function() {
    const answer = sessionStorage.getItem('quizAnswer');
    const resultDiv = document.getElementById('result');
    if (answer) {
        resultDiv.innerHTML = `You selected: ${answer}`;
        sessionStorage.removeItem('quizAnswer');
    } else {
        resultDiv.innerHTML = 'No answer found. Please take the quiz first.';
    }
}