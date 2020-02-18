const mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
    tittle: {
        type: String,
        required: [true, 'Event name cannot blank']
    },
    description: {
        type: String
    },
    eventUnit: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Unit cannot blank']
    },
    eventLeader: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Event leader cannot blank']
    },
    eventAddress: {
        type: String,
        required: [true, 'Event address cannot blank']
    },
    workInfor: {
        type: String,
        required: [true, 'Work Information cannot blank']
    },
    socialDays: {
        type: Number,
        required: [true, 'Number of social days cannot blank']
    },
    userCreated: {
        type: mongoose.Types.ObjectId,
        required: [true]
    },
    maxRegister: {
        type: Number,
        required: [true]
    },
    userRegistered:{
        type: [{
            userId: mongoose.Types.ObjectId,
            createdAt: Number
        }],
        default: []
    }, 
    createdAt: {
        type: Number,
        required: [true, 'Created days cannot blank']
    },
    startAt: {
        type: Number,
        required: [true, 'Start day cannot blank']
    },
    finishAt: {
        type: Number,
        required: [true, 'Finish day cannot blank']
    },
});

export default mongoose.model("event", eventSchema);