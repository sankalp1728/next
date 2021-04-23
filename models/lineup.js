const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const lineUpSchema = new Schema({

    candidate : [Number],
    slotStart : Date,
    slotEnd : Date,
    candidateId : Number,
    status: ["Pending","Upcoming","Reschedule","Cancel"],
})

module.exports = mongoose.model("LineUpSchema",lineUpSchema);