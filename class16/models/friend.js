const mongoose = require('mongoose');
const validator = require('validator');

const friendProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3, // Use `minlength` instead of `min`
        maxlength: 20 // Use `maxlength` instead of `max`
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address'
        }
    },
    contact: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator.isMobilePhone(value, 'any'), // Accepts all locales
            message: 'Invalid contact number'
        }
    }
});

const Friend = mongoose.model('Friend', friendProfileSchema);

module.exports = Friend;
