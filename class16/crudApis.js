const mongoose = require('mongoose');
const express = require('express');
const colors = require('colors');
const validator = require('validator');

const Friend = require('./models/friend');
const ContactLog = require('./models/contactLog');

const app = express();
app.use(express.json());

mongoose
    .connect('mongodb://localhost:27017/myfriends', {})
    .then(() => console.log('Connected to database'.green))
    .catch((err) => console.log('Database connection error:'.red, err));

// GET all friends
app.get('/friends', async (req, res) => {
    try {
        const friends = await Friend.find();
        res.json(friends);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new friend
app.post('/friends', async (req, res) => {
    try {
        const { name, email, contact, age } = req.body;
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        const newFriend = new Friend({ name, email, contact, age });
        await newFriend.save();
        res.status(201).json(newFriend);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update friend’s email if age > 45
app.put('/friends/update-email', async (req, res) => {
    try {
        const friends = await Friend.find({ age: { $gte: 45 } });
        for (let i = 0; i < friends.length; i++) {
            friends[i].email = `updatedEmail${i}@gmail.com`;
            await friends[i].save();
        }
        res.json({ message: `${friends.length} friends updated` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update friend’s name using multiple conditions
app.put('/friends/update-name', async (req, res) => {
    try {
        const result = await Friend.updateOne(
            {
                $and: [
                    { email: 'john.doe@example.com' },
                    { contact: '1234-5678901' },
                    { age: { $eq: 35 } }
                ]
            },
            { $set: { name: 'Updated Name' } },
            { new: true }
        );
        
        res.json({ message: result.modifiedCount > 0 ? "Friend's name updated successfully!" : "No matching friend found or no changes made." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE a friend by email
app.delete('/friends/:email', async (req, res) => {
    try {
        const result = await Friend.deleteOne({ email: req.params.email });
        res.json({ message: result.deletedCount > 0 ? 'Friend deleted successfully' : 'No friend found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'.cyan));
