const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const lineUpSchema = new Schema({

    candidateID : [String],
    slotStart : Date,
    slotEnd : Date,
    interviewerID : String,
    roundNumber : Number,
    meetingLink : String,
    status: ["Pending","Upcoming","Reschedule","Cancel"],
})

module.exports = mongoose.model("LineUpSchema",lineUpSchema);

// only info to interviewers no approval