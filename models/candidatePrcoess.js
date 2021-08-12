const mongoose = require("mongoose")
const Schema = mongoose.Schema

const candidateProcessSchema = new Schema({
    candidateID : {
        type : String,
        required : true
    },
    screening : {
        status : {
            type : String,
            required : false
        },
        userID : {
            type : String,
            required: false
        }
    },
    businessEval : {
        status : {
            type : String,
            required: true
        },
        userID : {
            type : String,
            required : true
        }
    },
    Interview : [{
        status : {
            type : String,
            required : true
        },
        InterviewID : {
            type : String,
            required : true
        },
        feedBackFormID : {
            type : String,
            required : true
        },
    }],

    startDate : {
        type : String,
        required : true
    },

    endDate : {
        type : String,
        required : true
    }, // when the process of hiring ends for the candidate, be it a success or failure

    

})

const candidateProcessModel = mongoose.model("candidateProcess",candidateProcessSchema)
module.exports = candidateProcessModel