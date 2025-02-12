
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedTasks =
  JSON.parse(localStorage.getItem("completedTasks")) || [];
let searchQuery = "";


updateUI();

document.body.addEventListener("click", handleActions);
document.getElementById("taskForm").addEventListener("submit", addTask);
document.getElementById("search").addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase();
  updateUI();
});

function addTask(e) {
  e.preventDefault();
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("prioritySelect").value;
  const taskText = input.value.trim();

  if (!taskText) {
    alert("Task cannot be empty!");
    return;
  }

  const isDuplicate = tasks.some(
    (task) =>
      task.text.toLowerCase() === taskText.toLowerCase() &&
      task.priority === priority
  );

  if (isDuplicate) {
    alert("This task already exists under the same priority!");
    return;
  }

  tasks.push({
    id: Date.now(),
    text: taskText,
    priority,
    completed: false,
    createdAt: new Date(),
  });

  input.value = "";
  saveData();
  updateUI();
}

function handleActions(e) {
  const taskEl = e.target.closest(".task-item");
  if (!taskEl) return;

  const taskId = Number(taskEl.dataset.id);
  const allTasks = [...tasks, ...completedTasks];
  const task = allTasks.find((t) => t.id === taskId);

  if (!task) return;

  if (e.target.classList.contains("complete-btn")) {
    if (task.completed) {
      task.completed = false;
      completedTasks = completedTasks.filter((t) => t.id !== taskId);
      tasks.push(task);
    } else {
      task.completed = true;
      tasks = tasks.filter((t) => t.id !== taskId);
      completedTasks.push(task);
    }
  }

  if (e.target.classList.contains("delete-btn")) {
    tasks = tasks.filter((t) => t.id !== taskId);
    completedTasks = completedTasks.filter((t) => t.id !== taskId);
  }

  saveData();
  updateUI();
}

function updateUI() {
  const filteredTasks = filterTasks(tasks);
  const groupedTasks = groupTasks(filteredTasks);
  renderColumns(groupedTasks);
  renderCompleted();
  updateCounter();
}

function filterTasks(tasks) {
  return tasks.filter(
    (task) =>
      task.text.toLowerCase().includes(searchQuery) ||
      task.priority.includes(searchQuery)
  );
}

function groupTasks(tasks) {
  return tasks.reduce(
    (acc, task) => {
      if (!acc[task.priority]) acc[task.priority] = []; 
      acc[task.priority].push(task);
      return acc;
    },
    { high: [], medium: [], low: [] }
  );
}

function renderColumns(grouped) {
  const columns = document.getElementById("priorityColumns");
  columns.innerHTML = Object.entries(grouped)
    .map(
      ([priority, tasks]) => `
              <div class="priority-column ${priority}">
                  <h3 class="priority-title">${priority.toUpperCase()}</h3>
                  <ul class="task-list">
                      ${tasks
                        .map(
                          (task) => `
                          <li class="task-item" data-id="${task.id}">
                              <span>${task.text}</span>
                              <div class="task-actions">
                                  <button class="complete-btn">✓</button>
                                  <button class="delete-btn">×</button>
                              </div>
                          </li>
                      `
                        )
                        .join("")}
                  </ul>
              </div>
          `
    )
    .join("");
}

function renderCompleted() {
  const completedList = document.getElementById("completedTasks");
  completedList.innerHTML = completedTasks
    .filter((task) => task.text.toLowerCase().includes(searchQuery))
    .map(
      (task) => `
          <li class="task-item" data-id="${task.id}">
              <s>${task.text}</s>
              <div class="task-actions">
                  <button class="complete-btn">↩</button> <!-- Restore to active -->
                  <button class="delete-btn">×</button> <!-- Delete permanently -->
              </div>
          </li>
      `
    )
    .join("");
}

function updateCounter() {
  const count = tasks.reduce((acc) => acc + 1, 0);
  document.querySelector(
    ".task-count"
  ).textContent = `(${count} pending)`;
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}
