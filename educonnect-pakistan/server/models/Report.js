const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema({
    metric: { type: String, required: true },
    period: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    value: { type: mongoose.Schema.Types.Mixed }
  }, { timestamps: true });
  
module.exports = mongoose.model('Report', reportsSchema);
