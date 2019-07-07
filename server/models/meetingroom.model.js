const mongoose = require('mongoose');

const MeetingRoomSchema = mongoose.Schema({
    room_id: String,
    room_name: String,
    room_size: String,
    level: String,
    unit: String,
    description: String,
    first_booking: String,
    last_booking: String
}, { collection : '_meetingroom' });

module.exports = mongoose.model('meetingroom', MeetingRoomSchema);

