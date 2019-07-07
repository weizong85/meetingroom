module.exports = (app) => {
    const meetingrooms = require('./meetingroom.controller.js');
    const schedule = require('./schedule.controller.js');

    // Retrieve all MeetingRooms
    app.get('/meetingrooms', meetingrooms.findAll);

    // Create booking schedule
    app.post('/schedule', schedule.create);

    // get booking schedule
    app.post('/getSchedule', schedule.findById);
}