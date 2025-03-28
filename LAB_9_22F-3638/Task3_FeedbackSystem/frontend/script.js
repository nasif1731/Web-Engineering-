const form = document.getElementById('feedback-form');
const feedbackList = document.getElementById('feedback-list');
const alertContainer = document.getElementById('alert-container');

const API_BASE_URL = "http://localhost:3000/api/feedback"; 

async function loadFeedback() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch feedback");

    const feedbacks = await response.json();
    console.log("Loaded Feedback:", feedbacks);
    feedbackList.innerHTML = '';

    feedbacks.forEach(feedback => {
      feedbackList.innerHTML += `
        <tr>
          <td>${feedback.name}</td>
          <td>${feedback.email}</td>
          <td>${feedback.message}</td>
        </tr>`;
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const feedbackData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) throw new Error("Failed to submit feedback");

    alertContainer.innerHTML = `<div class="alert alert-success">Feedback submitted successfully</div>`;
    form.reset();
    loadFeedback();
  } catch (error) {
    console.error("Error submitting feedback:", error);
    alertContainer.innerHTML = `<div class="alert alert-danger">Failed to submit feedback</div>`;
  }
});

// Load feedback on page load
document.addEventListener("DOMContentLoaded", loadFeedback);
