const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
    room_id: String,
    startTime: String,
    endTime: String
}, { collection : '_schedule' });

module.exports = mongoose.model('schedule', ScheduleSchema);