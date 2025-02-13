# Modern Task Manager ✅  

I implemented this as an **interactive to-do list** using **vanilla JavaScript** to dynamically add, delete, and prioritize tasks. Tasks are categorized by priority, and users can mark them as completed, moving them to a separate section.  

## Features  
- 🏷 **Priority-Based Task Organization** (High, Medium, Low)  
- ✅ **Mark Tasks as Completed** and move them to a separate section  
- ❌ **Delete Tasks** instantly with a button click  
- 📊 **Live Task Count** using `reduce()`  
- 🔍 **Search & Filter** by task name or priority  
- 🌙 **Dark Mode Toggle** for improved accessibility  
- 🔄 **Real-time UI Updates** without page refresh  
- 💾 **Local Storage Integration** to save tasks persistently  

## Implementation Details  
- **Arrays & Objects** store task data dynamically  
- **map()** renders tasks efficiently  
- **reduce()** calculates and displays the total number of pending tasks  
- **Event Delegation** ensures efficient event handling  
- **DOM Manipulation** updates the UI dynamically  

## How to Use  
1. Open `index.html` in your browser.  
2. Add a task with a priority level.  
3. Use the **Complete** button to move tasks to the completed section.  
4. Click **Delete** to remove a task permanently.  
5. Use the **Search Bar** to filter tasks dynamically.  
6. Toggle **Dark Mode** using the 🌙 button.  

## Constraints  
- **No external libraries** – implemented using vanilla JavaScript  
- **Prevents empty task entries** for data integrity  
- **Optimized UI updates** – no unnecessary page reloads  

🚀 A lightweight and efficient task manager for personal productivity!  
