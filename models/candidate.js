const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const candidateSchema = new Scehma({

    name : {
        type : String,
        required : true
    },

    mrfID : {
        tpye : String,
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

    recruiterID : {
        type : String,
        required : false
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

    docsLink : {
        type : String,
        default : "",
        required : false
    }

})

// screening steps will be addded as per the approval requirements
// screening approvals will be in control of HR. Can skip bussiness people.