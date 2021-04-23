const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const candidateSchema = new Scehma({

    name : {
        type : String,
        required : true
    },

    photo : {
        type : String,
        required : true
    },

    contact : [{
        type : String
    }],

    Email : [{
        type : String
    }], // used as primary

    address : {
        current : {
            type : String,
            required : true
        },
        permanent : {
            type : String,
            required : true
        }
    },

    dateOfBirth : {
        type : Date,
        required : true
    },

    p_ID : {
        PAN : {
            type : String,
            required : true
        },
        aadhar : {
            type : String,
            required : true
        }
    },

    fatherName : {
        type : String
    },

    gender : {
        type : String,
        required : true
    },

    differentlyAbled  : {
        type : Boolean,
        required : true
    },

    highest_edu : {
        type : String,
        required : true

        //10,12,G,PG, etc
    },
    certifications : [{
        type : String,
        required : true
    }],

    ComputerProficiency : {
        type : Boolean,
        required : true
    },

    sourcetype : {
        type : String,
        required : true
        //vendor,referral,HR,Portal
    },

    sourceName : {
        type : String,
        required : true
    },

    employement : {
        total_experience : {
            type : Number,
            required : true
        },
        
        relevant_experience : {
            type : Number,
            required  : true
        },

        age : {
            type : Number,
            required : true
        }
    },

})