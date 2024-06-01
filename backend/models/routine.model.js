const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Period Schema
const periodSchema = new Schema({
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subject: { type: String },
});

// Define Day Schema
const daySchema = new Schema({
    dayName: { type: String, required: true },
    periods: [periodSchema], // Array of periods for each day
});

// Define Schedule Schema
const scheduleSchema = new Schema({
    days: [daySchema], // Array of days in a week
});

// Compile the models
const Period = mongoose.model('Period', periodSchema);
const Day = mongoose.model('Day', daySchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = { Period, Day, Schedule };
