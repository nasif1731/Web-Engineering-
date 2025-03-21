# Course Registration System

This is a web-based course registration system designed for a university, aimed at simplifying the process of course enrollment by addressing issues such as scheduling conflicts, real-time seat availability, and course filtering. The system supports two types of users—**students** and **admins**—and is built with server-side rendering using Express.js and EJS, with MongoDB as the database.

## Features

### Student Features
- **Login:** Authenticate using roll number and password.
- **Interactive Schedule:** View a weekly calendar with highlighted scheduling conflicts.
- **Real-Time Seats:** Check seat availability updates without refreshing the page (via AJAX).
- **Course Filtering:** Search courses by department, level, time, days, and available seats.
- **Session-Based Schedule:** Build a schedule incrementally with checks for conflicts and prerequisites.
- **Prerequisites:** View prerequisites for each course.
- **Drop Courses:** Remove registered courses directly from the dashboard.
- **Bonus:** Subscribe to full courses to receive seat availability notifications.

### Admin Features
- **Login:** Authenticate using username and password.
- **Course Management:** Add, update, or delete courses with intuitive schedule inputs.
- **Student Management:** View and override student registrations as needed.
- **Seat Management:** Adjust the total number of seats for courses.
- **Reports:** Generate reports including students per course, courses with available seats, and students missing prerequisites.

## Setup Instructions

Follow these steps to set up and run the course registration system locally:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/course-registration-system.git
   cd course-registration-system
   ```
2. **Install Dependencies:**
```bash
npm install
```
3. **Set Environment Variables:**
- Create a `.env` file in the root directory with the following format:
makefile
```bash
MONGO_URI=mongodb://localhost:27017/course-registration
PORT=3000
SESSION_SECRET=your-secret-key
```
4. **Run the Application:**
```bash
npm start
```
**Technologies Used**
- **Frontend:** EJS for templating, AJAX for real-time updates, and CSS 
- **Backend:** Express.js for server-side rendering, MongoDB for database management, and Node.js 
- **Database:** MongoDB for storing user data, course information, and scheduling conflicts.


