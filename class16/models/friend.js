const mongoose = require('mongoose');
const validator = require('validator');

const friendProfileSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 20 },
    email: { 
        type: String, 
        required: true, 
        unique: false  
    },
    contact: {
        type: String,
        required: true,
    },
    age: { type: Number, required: true }
});


const Friend = mongoose.model('Friend', friendProfileSchema);
module.exports = Friend;
