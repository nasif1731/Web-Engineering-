function submitAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        sessionStorage.setItem('quizAnswer', selectedAnswer.value);
        window.location.href = 'Q3_result.html';
    } else {
        alert('Please select an answer!');
    }
}