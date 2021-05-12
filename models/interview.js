const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const interviewSchema = new Scehma({
    lineUp_id : {
        type : String,
        required : true
    },

    interviewer_id : {
        type : String,
        required : true
    },

    type : {
        type : String,
        required : true
            // group, solo
    },

    candidate_status : [{ // this is for updating the status, availabilbity and the result of the candidate

        candidate_id : {
            type : String,
            required : true 
        },
        candidate_status : {
            type : String,
            required : true,

            
        }
    
    }],

    roundNumber : {
        type : Number,
        required : true
    },

    remarks : {
        type : String,
        required : false
    },

    status : {
        type : Boolean,
        requried : false
    } // pass, fail
})