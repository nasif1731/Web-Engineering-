const express = require('express');
const { v4: uuidv4 } = require('uuid');
const JOI = require('joi');

const schema = JOI.object({
    name: JOI.string().min(3).max(20).required(),
    email: JOI.string().email().required(),
    contact: JOI.string().pattern(/^\d{4}-\d{7}$/).required() // Ensuring contact format: XXXX-XXXXXXX
});

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

const myFriends = [
    { id: 1, name: 'John Doe', email: 'john@example.com', contact: '1234-5678901' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', contact: '2345-6789012' },
    { id: 3, name: 'Bob Doe', email: 'bob@example.com', contact: '3456-7890123' }
];

// Get all friends
app.get('/friends', (req, res) => {
    return res.json(myFriends);
});

// Get a friend by ID
app.get('/friends/:id', (req, res) => {
    const { id } = req.params;
    const friend = myFriends.find(friend => friend.id === id);

    if (!friend) {
        return res.status(404).json({ error: "Friend not found" });
    }
    return res.json(friend);
});

// Add a new friend
app.post('/friends', (req, res) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ "errormessage": error.details[0].message });
    }

    const newFriend = {
        id: uuidv4(),
        name: value.name,
        email: value.email,
        contact: value.contact
    };

    myFriends.push(newFriend);
    return res.status(201).json(newFriend);
});

app.patch('/friends/:id', async(req, res) => {
    const  id = parseInt(req.params.id);
    //schema validation
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ "errormessage": error.details[0].message });
    }
    const friendIndex = await myFriends.findIndex(friend => friend.id === id);

    if (friendIndex === -1) {
        return res.status(404).json({ error: "Friend not found" });
    }
    let friend ={...myFriends[friendIndex],...req.body};
        myFriends[friendIndex]=friend;
    // myFriends[friendIndex]
    //  .name = req.body.name;
    //  myFriends[friendIndex]
    //  .email = req.body.email;
    //  myFriends[friendIndex]
    //  .contact = req.body.contact;
     return res.send("updated");

});
//by put
app.put('/friends/:id', async(req, res) => {
    const  id = parseInt(req.params.id);
    //schema validation
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ "errormessage": error.details[0].message });
    }
    const friendIndex =await myFriends.findIndex(friend => friend.id === id);
    if (friendIndex === -1) {
        return res.status(404).json({ error: "Friend not found" });
    }
    myFriends[friendIndex] = {...req.body};
    return res.send("updated");
    

});
//delete friend

app.delete('/friends/:id', async(req, res) => {
    const  id = parseInt(req.params.id);
    const friendIndex = await myFriends.findIndex(friend => friend.id === id);
    if (friendIndex === -1) {
        return res.status(404).json({ error: "Friend not found" });
    }
    myFriends.splice(friendIndex, 1);
    return res.send(" Record deleted");
});
app.delete('/friends/', async(req, res) => {
    
    myFriends.splice(0);
    return res.send(" Records deleted");
});
//delete all
app.delete('/friends', async(req, res) => {
    myFriends.length=0;
    return res.send("All records deleted");
});

// Root route
app.get('/', (req, res) => {
    res.send('I am active');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
