function renderCalendar() {
  const rawCoursesData = document.getElementById('courses-data').textContent;

  try {
    const courses = JSON.parse(rawCoursesData);
    console.log("📌 Loaded Courses Data:", courses); // Debugging

    const calendar = document.getElementById('calendar');
    const days = ['M', 'T', 'W', 'Th', 'F'];
    const times = Array.from({ length: 25 }, (_, i) => {
      const hour = Math.floor(i / 2) + 8;
      const minutes = i % 2 === 0 ? '00' : '30';
      return `${String(hour).padStart(2, '0')}:${minutes}`;
    });

    let html = '<table border="1"><tr><th>Time</th>';
    days.forEach(day => html += `<th>${day}</th>`);
    html += '</tr>';

    times.forEach(timeStr => {
      const timeInMinutes = parseTime(timeStr); // Convert time for accurate comparison
      html += `<tr><td>${timeStr}</td>`;
      days.forEach(day => {
        let cellContent = '';
        courses.forEach(course => {
          if (course.schedule && Array.isArray(course.schedule)) {
            course.schedule.forEach(slot => {
              if (
                slot.day === day &&
                parseTime(slot.startTime) <= timeInMinutes &&
                parseTime(slot.endTime) > timeInMinutes
              ) {
                cellContent += `<div class="course-box">${course.courseCode} (${course.courseName})</div>`;
              }
            });
          }
        });

        html += `<td>${cellContent || ''}</td>`; // Empty if no course in this slot
      });
      html += '</tr>';
    });

    html += '</table>';
    calendar.innerHTML = html;
  } catch (error) {
    console.error("❌ Error parsing schedule data:", error);
  }
}

function parseTime(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes; // Convert to total minutes
}


function removeFromSchedule(courseCode) {
  fetch('/student/remove-from-schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseCode })
  })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        throw new Error(`Failed to remove ${courseCode}: ${data.error}`);
      }

      console.log(`✅ Removed ${courseCode} from schedule.`);

      // Remove from UI list
      const courseItem = document.querySelector(`li[data-course="${courseCode}"]`);
      if (courseItem) {
        courseItem.remove();
        console.log(`✅ Removed ${courseCode} from UI.`);
      } else {
        console.warn(`⚠ Warning: Could not find ${courseCode} in the UI.`);
      }

      // 🔹 Fetch updated course list from the server
      return fetch('/student/get-schedule-data');
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      return response.json();
    })
    .then(updatedCourses => {
      if (updatedCourses.error) {
        throw new Error(updatedCourses.error);
      }

      console.log("📌 Updated Courses Data:", updatedCourses);
      document.getElementById('courses-data').textContent = JSON.stringify(updatedCourses);
      renderCalendar(); // Re-render the calendar with updated data
    })
    .catch(error => console.error("❌ Error updating schedule:", error));
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