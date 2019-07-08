const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
    room_id: {
		type: String,
		required: true
	},
    startTime: {
		type: Number,
		required: true
	},
    endTime: {
		type: Number,
		required: true
	}
}, { collection : '_schedule' });

module.exports = mongoose.model('schedule', ScheduleSchema);