const apiUrl = "http://localhost:3000/api/todos";

// Fetch tasks when the page loads
document.addEventListener("DOMContentLoaded", fetchTasks);

// Fetch all tasks
async function fetchTasks() {
  try {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = `list-group-item ${task.completed ? "completed" : ""}`;
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask('${task._id}', this.checked)">
        <span id="task-text-${task._id}">${task.text}</span>
        <button class="edit-btn" onclick="editTask('${task._id}', '${task.text}')">&#9998;</button>
        <button class="delete-btn" onclick="deleteTask('${task._id}')">&times;</button>
      `;
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Add a new task
async function addTask() {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();
  if (!text) return alert("Task cannot be empty");

  try {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    taskInput.value = "";
    fetchTasks(); // Refresh task list
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

// Toggle task status
async function toggleTask(id, completed) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed })
    });

    fetchTasks(); // Refresh task list
  } catch (error) {
    console.error("Error toggling task:", error);
  }
}

// Edit a task
function editTask(id, oldText) {
  const newText = prompt("Edit task:", oldText);
  if (newText === null || newText.trim() === "") return;

  updateTask(id, newText);
}

// Update a task
async function updateTask(id, text) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    fetchTasks(); // Refresh task list
  } catch (error) {
    console.error("Error updating task:", error);
  }
}

// Delete a task
async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) return;

  try {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchTasks(); // Refresh task list
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}
