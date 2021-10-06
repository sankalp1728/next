const mongoose = require("mongoose")
const Schema = mongoose.Schema

const candidateDetailsSchema = new Schema({

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
    // validate check

    social : {
        skype : {
            type : String,
            required : false
        },
        linkedIn : {
            type : String,
            required : false
        }
    },


    email : {
        type : String
    }, // used as primary

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
    

    dob : {
        type : Date,
        required : true
    },

    pid : {
        pan : {
            type : String,
            required : true
        },
        aadhar : {
            type : String,
            required : true
        }
    },

    fatherName : {
        type : String,
        required :true
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

        //10,12,G,PG,anythings else, others etc
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
    
    remarks : {
        type : String
    },

    candidateID : {
        type : String,
        required : true
    },

    educationID : {
        type  : String,
        required : false
    },

    employementID : {
        type : String,
        required : false
    }
})

const candidateDetailsModel = mongoose.model("candidateDetails", candidateDetailsSchema)
module.exports = candidateDetailsModel