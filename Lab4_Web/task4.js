
let projects = JSON.parse(localStorage.getItem('projects')) || [];

function addProject() {
    const title = document.getElementById('projectTitle').value;
    const desc = document.getElementById('projectDesc').value;
    const status = document.getElementById('projectStatus').value;

    if (!title || !desc) return alert('Please fill all fields');

    projects.push({
        id: Date.now(),
        title,
        description: desc,
        status
    });

    saveAndRender();
    clearForm();
}

function editProject(id) {
    const project = projects.find(p => p.id === id);
    const newTitle = prompt('Enter new title:', project.title);
    const newDesc = prompt('Enter new description:', project.description);
    const newStatus = prompt('Enter new status (Pending/In Progress/Completed):', project.status);

    if (newTitle && newDesc && newStatus) {
        project.title = newTitle;
        project.description = newDesc;
        project.status = newStatus;
        saveAndRender();
    }
}

function deleteProject(id) {
    projects = projects.filter(p => p.id !== id);
    saveAndRender();
}

function filterProjects() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    const filtered = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    renderProjects(filtered);
}

function renderProjects(projectsToRender) {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = projectsToRender.map(project => `
                    <div class="project-item">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <p>Status: ${project.status}</p>
                        <button onclick="editProject(${project.id})">Edit</button>
                        <button onclick="deleteProject(${project.id})">Delete</button>
                    </div>
                `).join('');
}

function saveAndRender() {
    localStorage.setItem('projects', JSON.stringify(projects));
    filterProjects();
}

function clearForm() {
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDesc').value = '';
    document.getElementById('projectStatus').value = 'Pending';
}

// Initial render
filterProjects();
