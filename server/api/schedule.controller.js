const Schedule = require('../models/schedule.model.js');

exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Schedule content can not be empty"
        });
    }

    // Create a Schedule
    const schedule = new Schedule({
        room_id: req.body.roomId, 
        startTime: req.body.from,
        endTime: req.body.to
    });

    // Save Schedule in the database
    schedule.save()
    .then(data => {
        var result = {
            'status': {
                'code': 200,
                'error': null,
                'description': null
            },
            'response': data
        };
        res.send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the schedule."
        });
    });
};

exports.findById = (req, res) => {
    Schedule.find({ 
        room_id: { $eq: req.body.roomId },
        $and: [ 
                { startTime: { $gte: req.body.from } }, 
                { startTime: { $lte: req.body.to } }
              ] 
    })
    .then(schedule => {
        if(!schedule) {
            schedule = [];         
        }
        var result = {
            'status': {
                'code': 200,
                'error': null,
                'description': null
            },
            'response': {
                "bookings": schedule
            }
        };   
        res.send(result);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Schedule not found with room id " + req.params.roomId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving schedule with room id " + req.params.roomId
        });
    });
};
