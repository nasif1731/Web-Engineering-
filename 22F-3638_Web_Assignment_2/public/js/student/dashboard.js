// Initialize the dashboard when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Student dashboard loaded');
  
  // Fetch and display the student's registered courses
  fetchRegisteredCourses();
  
  // Add event listener for the search button
  document.getElementById('searchCoursesBtn').addEventListener('click', searchCourses);
});

// Fetch and display the student's registered courses
function fetchRegisteredCourses() {
  fetch('/student/registered-courses')
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch registered courses');
      return response.json();
    })
    .then(courses => {
      const list = document.getElementById('registeredCoursesList');
      list.innerHTML = ''; // Clear existing content
      courses.forEach(course => {
        const li = document.createElement('li');
        li.textContent = course.title;
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching registered courses:', error);
      alert('Unable to load registered courses. Please try again later.');
    });
}

// Search for available courses based on user input
function searchCourses() {
  const searchTerm = document.getElementById('courseSearchInput').value.trim();
  if (!searchTerm) {
    alert('Please enter a search term');
    return;
  }
  
  fetch(`/courses?search=${encodeURIComponent(searchTerm)}`)
    .then(response => {
      if (!response.ok) throw new Error('Failed to search courses');
      return response.json();
    })
    .then(courses => {
      const list = document.getElementById('availableCoursesList');
      list.innerHTML = ''; // Clear existing content
      courses.forEach(course => {
        const li = document.createElement('li');
        li.textContent = course.title;
        const registerBtn = document.createElement('button');
        registerBtn.textContent = 'Register';
        registerBtn.addEventListener('click', () => registerCourse(course._id));
        li.appendChild(registerBtn);
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error searching courses:', error);
      alert('Unable to search courses. Please try again later.');
    });
}

// Register the student for a selected course
function registerCourse(courseId) {
  fetch('/student/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId })
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to register for course');
      return response.json();
    })
    .then(() => {
      alert('Course registered successfully');
      fetchRegisteredCourses(); // Refresh the registered courses list
    })
    .catch(error => {
      console.error('Error registering course:', error);
      alert('Failed to register for the course. Please try again.');
    });
}
function dropCourse(courseCode) {
  if (confirm(`Drop ${courseCode}?`)) {
      fetch('/student/drop-course', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseCode })
      })
      .then(response => {
          if (!response.ok) throw new Error('Network error');
          return response.json();
      })
      .then(data => {
          if (data.success) location.reload(); // Full reload instead of partial update
      })
      .catch(error => {
          alert(error.message);
          console.error('Error:', error);
      });
  }
}
