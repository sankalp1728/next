const mongoose = require("mongoose")
const Schema = mongoose.Schema

const candidateProcessSchema = new Schema({
    candidateID : {
        type : String,
        required : true
    },
    recruiterID : {
        type : String,
        required : false
    },

    mrfID : {
        type : String,
        required : true
    },

    sourcetype : {
        type : String,
        required : false
        //vendor,referral,HR,Portal  use JWT
    },

    SourceID : {
        type : String,
        required : false
    }, // userID

    BCGagencyID : {
        type : String,
        required : false
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
    },// mrfID recruiter will give screening verdict
    businessEval : {
        status : {
            type : String,
            required: false
        },
        userID : {
            type : String,
            required : false
        }
    },// will be chosen by the recruiter
    interviews : [{
        InterviewID : {
            type : String,
            required : false
        }
    }],// interview matrix

    documentVerification : {
        type : Boolean,
        required : false
    },// done by third

    offerLetterSent : {
        type : Boolean,
        required : false
    },

    offerAccepted : {
        type : Boolean,
        required : false
    },

    startDate : {
        type : String,
        required : true
    },

    endDate : {
        type : String,
        required : false
    }, // when the process of hiring ends for the candidate, be it a success or failure

    

})

const candidateProcessModel = mongoose.model("candidateProcess",candidateProcessSchema)
module.exports = candidateProcessModel