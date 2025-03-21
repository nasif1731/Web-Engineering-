function loadCourses() {
    const filters = {
      department: document.getElementById('department')?.value || '',
      level: document.getElementById('level')?.value || '',
      time: document.getElementById('time')?.value || '',
      days: document.getElementById('days')?.value || '',
      openSeats: document.getElementById('openSeats')?.checked ? 'true' : 'false'
    };
    fetch('/student/api/courses?' + new URLSearchParams(filters))
      .then(response => response.json())
      .then(courses => {
        const courseList = document.getElementById('course-list');
        courseList.innerHTML = '';
        courses.forEach(course => {
          const div = document.createElement('div');
          div.innerHTML = `
            <h3>${course.courseCode}: ${course.courseName}</h3>
            <p>Department: ${course.department} | Level: ${course.level}</p>
            <p>Seats Available: ${course.seatsAvailable}</p>
            <p>Prerequisites: ${course.prerequisites.join(', ') || 'None'}</p>
            <p>Schedule: ${course.schedule.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(', ')}</p>
            <button onclick="addToSchedule('${course.courseCode}')">Add to Schedule</button>
            ${course.seatsAvailable <= 0 ? `<button onclick="subscribe('${course.courseCode}')">Subscribe</button>` : ''}
          `;
          courseList.appendChild(div);
        });
      });
  }
  
  function addToSchedule(courseCode) {
    console.log('Attempting to add:', courseCode); // Debug 6
    fetch('/student/add-to-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseCode })
    })
    .then(response => {
        console.log('Add response status:', response.status); // Debug 7
        return response.json();
    })
    .then(data => {
        console.log('Add response data:', data); // Debug 8
        if (data.success) loadCourses();
    })
    .catch(error => console.error('Add error:', error));
}
  
  function subscribe(courseCode) {
    fetch('/student/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseCode })
    })
      .then(response => response.json())
      .then(data => {
        alert(data.success ? 'Subscribed to course' : 'Subscription failed');
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    ['department', 'level', 'time', 'days', 'openSeats'].forEach(id => {
      const element = document.getElementById(id);
      if (element) element.addEventListener('change', loadCourses);
    });
  });