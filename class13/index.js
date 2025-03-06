const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

const myFriends = [
    { id: 1, name: 'John Doe', email: 'john@example.com', contact: 37890 },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', contact: 78901 },
    { id: 3, name: 'Bob Doe', email: 'bob@example.com', contact: 89012 }
];

// Get all friends
app.get('/friends', (req, res) => {
    return res.json(myFriends);
});

// Get a friend by ID
app.get('/friends/:id', (req, res) => {
    const id = parseInt(req.params.id);  // Convert string ID to number
    const friend = myFriends.find(friend => friend.id === id);

    if (!friend) {
        return res.status(404).json({ error: "Friend not found" });
    }
    return res.json(friend);
});

// Add a new friend
app.post('/friends', (req, res) => {
    const { name, email, contact } = req.body;

    // Validate request body
    if (!name || !email || !contact) {
        return res.status(400).json({ error: "All fields (name, email, contact) are required" });
    }

    const friend = {
        id: uuidv4(),
        name,
        email,
        contact
    };

    myFriends.push(friend);
    return res.status(201).json(friend);
});

// Root route
app.get('/', (req, res) => {
    res.send('I am active');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
