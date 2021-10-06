const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const interviewSchema = new Scehma({
    lineUpId : {
        type : String,
        required : true
    },

    candidateId : {
        type : String,
        required : true
    },

    mrfId : {
        type : String,
        required : true
    },

    interviewerId : {
        type : String,
        required : true
    },

    type : {
        type : String,
        required : true
            // group, solo
    },

    roundNumber : {
        type : Number,
        required : true
    },

    remarks : {
        type : String,
        required : false
    },

    status : {
        type : String,
        requried : false
    } // pass, fail, not-appeared
})