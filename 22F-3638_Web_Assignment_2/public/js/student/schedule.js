function renderCalendar() {
  const courses = JSON.parse(document.getElementById('courses-data').textContent);
  const calendar = document.getElementById('calendar');
  const days = ['M', 'T', 'W', 'Th', 'F'];
  const times = Array.from({ length: 13 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`); // 8:00 to 20:00

  let html = '<table><tr><th>Time</th>';
  days.forEach(day => html += `<th>${day}</th>`);
  html += '</tr>';

  times.forEach(time => {
    html += `<tr><td>${time}</td>`;
    days.forEach(day => {
      const slots = courses.filter(course =>
        course.schedule.some(s =>
          s.day === day &&
          parseTime(s.startTime) <= parseTime(time) &&
          parseTime(s.endTime) > parseTime(time)
        )
      );
      html += `<td${slots.length > 1 ? ' class="conflict"' : ''}>${slots.map(c => c.courseCode).join(', ')}</td>`;
    });
    html += '</tr>';
  });
  html += '</table>';
  calendar.innerHTML = html;
}

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function removeFromSchedule(courseCode) {
  fetch('/student/remove-from-schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseCode })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) location.reload();
    });
}

function confirmRegistration() {
  fetch('/student/confirm-registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      alert(data.success ? 'Registration confirmed' : data.error);
      if (data.success) window.location.href = '/student/dashboard';
    });
}

document.addEventListener('DOMContentLoaded', renderCalendar);