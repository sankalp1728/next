const mongoose = require('mongoose')
const Scehma = mongoose.Schema
const emailValidator = require('email-validator')


const UserSchema = new Scehma({
    name : {
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        }
    },

    userType : {
        type : String,
        required : true,
        enum : ['Super-Admin','admin', 'recruiter', 'vendor', 'employee', 'interviewer'] // priveledges - admin, recruiter, vendor, employee, interviewer
    },

    userRole : {
        name : {
            type : String,
            required : true
        },
        _id : {
            type : String,
            required : true
        }
    },

    isActive : {
        type :Boolean,
        required : true,
        default : true
    },

    hierarchyID : {
        type : String,
        required : true
    },

    designation : {
        type : String,
        required : true 
    },

    jobType : {
        type : String,
        required : true,
        enum : ['Internship','Full-Time','Temporary']        
    },// currently internship, full time , temp

    gender : {
        type : String,
        required : true,
        enum : ['Male','Female','Others']
    },
    
    diversity : {
        type : String,
        required : true, // challenged
        enum : ['Physically Challenged', 'Female', 'General']
    },
    
    email : {
        type : String,
        required : true,
        unique : true,
        
        validate(value){
            if(!emailValidator.validate(value)){
                throw new Error("the email is invalid")
            }
        }
        // can be changed later on , used as username

    },

    password : {
        type : String,
        required : true // encryption bcrypt.js, SHA256
    },

    location : {
        type : String,
        required : false
    },

    branchID : {
        type : String,
        required : true
    },

    mrfID : [{
        '_id' : {
            type : String,
            required : false
        }
    }],

    bcgVerificationID : [{
        "_id" : {
            type : String,
            required: false
        },
        "status" : {
            type : Boolean,
            required : false,
            default : null
        }
    }]
    // to be used only in case of vendors and refferals(not in case of Recruiters)
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel


//username password jwt passport