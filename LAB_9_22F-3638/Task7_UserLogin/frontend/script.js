const apiUrl = "http://localhost:3000/api";

document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (data.success) {
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("alertContainer").innerHTML =
      '<div class="alert alert-danger">Invalid credentials</div>';
  }
});
