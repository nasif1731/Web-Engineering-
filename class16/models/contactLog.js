const mongoose = require('mongoose');

const friendContactHistorySchema = new mongoose.Schema({
    contactDate: {
        type: Date,
        default: Date.now // Don't use `Date.now()`, just `Date.now`
    },
    contactMessage: { // Fixed the typo in `contactMesssage`
        type: String,
        required: true
    }
});

const ContactLog = mongoose.model('ContactLog', friendContactHistorySchema);

module.exports = ContactLog;
