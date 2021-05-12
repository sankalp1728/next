const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const lineUpSchema = new Schema({

    candidate : [String],
    slotStart : Date,
    slotEnd : Date,
    candidateId : Number,
    status: ["Pending","Upcoming","Reschedule","Cancel"],
})

module.exports = mongoose.model("LineUpSchema",lineUpSchema);

// only info to interviewers no approval