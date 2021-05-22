const mongoose = require('mongoose')
const { validate } = require('./employee')
const Scehma = mongoose.Schema

const candidateStatusSchema = new Scehma({
    candidateID : {
        type : String,
        required : true
    },
    screened : {
        type : Boolean,
        required : true // screening process
    },
    interview : [{
        round : {
            type : Number,
        },
        status : {
            type : Boolean,            
        },
        remarks : {
            type : String,            
        }
        
    }],

    offerLetterAcknowlegement:{
        type : Boolean,
        required : false
    },
    annexureSent : {
        type: Boolean,
        required: false
    },

    bcgVer : {
        type : String,
        required : false
    }

    
})