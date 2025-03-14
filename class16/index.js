const mongoose = require('mongoose');

const Friend = require('./models/friend'); // Ensure proper case for model imports
const ContactLog = require('./models/contactLog');

mongoose
    .connect('mongodb://localhost:27017/myfriends', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log('Database connection error:', err));

async function recordFriendDocument() {
    try {
        const frnd = new Friend({
            name: 'John',
            email: 'john@example.com',
            contact: '1234-5678901'
        });

        await frnd.save();
        console.log('Friend document saved');

        // Close the connection after saving
        mongoose.connection.close();
    } catch (err) {
        console.log('Error saving document:', err);
    }
}

// Call the function
recordFriendDocument();
