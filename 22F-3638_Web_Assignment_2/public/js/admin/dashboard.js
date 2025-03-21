// Initialize the dashboard when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Admin dashboard loaded');
  
  // Fetch and display all courses and students
  fetchCourses();
  fetchStudents();
  
  // Add event listener for adding a new course
  document.getElementById('addCourseBtn').addEventListener('click', addCourse);
});

// Fetch and display all courses
function fetchCourses() {
  fetch('/admin/courses')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch courses');
      return response.json();
    })
    .then(courses => {
      const tbody = document.getElementById('courseTableBody');
      tbody.innerHTML = ''; // Clear existing content
      courses.forEach(course => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${course.title}</td>
          <td>${course.schedule}</td>
          <td>${course.capacity}</td>
          <td>
            <button onclick="editCourse('${course._id}')">Edit</button>
            <button onclick="deleteCourse('${course._id}')">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error fetching courses:', error);
      alert('Unable to load courses. Please try again later.');
    });
}

// Fetch and display all students
function fetchStudents() {
  fetch('/admin/students')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch students');
      return response.json();
    })
    .then(students => {
      const tbody = document.getElementById('studentTableBody');
      tbody.innerHTML = ''; // Clear existing content
      students.forEach(student => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${student.name}</td>
          <td>${student.id}</td>
          <td>${student.email}</td>
          <td>
            <button onclick="editStudent('${student._id}')">Edit</button>
            <button onclick="deleteStudent('${student._id}')">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error fetching students:', error);
      alert('Unable to load students. Please try again later.');
    });
}

// Add a new course
function addCourse() {
  const title = document.getElementById('courseTitle').value.trim();
  const schedule = document.getElementById('courseSchedule').value.trim();
  const capacity = document.getElementById('courseCapacity').value.trim();
  
  if (!title || !schedule || !capacity) {
    alert('Please fill in all course details');
    return;
  }
  
  fetch('/admin/courses/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, schedule, capacity })
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to add course');
      return response.json();
    })
    .then(() => {
      alert('Course added successfully');
      fetchCourses(); // Refresh the course list
    })
    .catch(error => {
      console.error('Error adding course:', error);
      alert('Failed to add the course. Please try again.');
    });
}

// Delete a course
function deleteCourse(courseId) {
  if (!confirm('Are you sure you want to delete this course?')) return;
  
  fetch(`/admin/courses/delete/${courseId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to delete course');
      alert('Course deleted successfully');
      fetchCourses(); // Refresh the course list
    })
    .catch(error => {
      console.error('Error deleting course:', error);
      alert('Failed to delete the course. Please try again.');
    });
}

// Delete a student
function deleteStudent(studentId) {
  if (!confirm('Are you sure you want to delete this student?')) return;
  
  fetch(`/admin/students/delete/${studentId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to delete student');
      alert('Student deleted successfully');
      fetchStudents(); // Refresh the student list
    })
    .catch(error => {
      console.error('Error deleting student:', error);
      alert('Failed to delete the student. Please try again.');
    });
}

// Placeholder functions for editing (to be expanded as needed)
function editCourse(courseId) {
  console.log(`Edit course with ID: ${courseId}`);
  // TODO: Fetch course details and display an edit form or modal
}

function editStudent(studentId) {
  console.log(`Edit student with ID: ${studentId}`);
  // TODO: Fetch student details and display an edit form or modal
}