const MeetingRoom = require('../models/meetingroom.model.js');

// Retrieve all meetingroom from the database.
exports.findAll = (req, res) => {
    MeetingRoom.find()
    .then(meetingrooms => {
        var result = {
            'status': {
                'code': 200,
                'error': null,
                'description': null
            },
            'response': {
                'meeting_room_list':meetingrooms
            }
        };
        res.send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving meeting rooms."
        });
    });
};