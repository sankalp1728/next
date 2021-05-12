const mongoose = require('mongoose')
const Scehma = mongoose.Schema

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
        required : true // priveledges - admin, recruiter, vendor, employee, interviewer
    },

    userAccess : {
        type : String,
        required : true
    },      // in case special permission, name = special, is to be reffered for access

    hierarchy : {
        type: {
            type :String,
            required : true
        },
        name : {
            type : String,
            required : true
        }
    },

    designation : {
        type : String,
        required : true 
    },

    jobType : {
        type : String,
        required : true
    },// currently internship, full time , temp

    diversity : {
        type : String,
        required : true // challenged
    },
    
    email : {
        type : String,
        required : true // can be changed later on , used as username
    },

    password : {
        type : String,
        required : true // encryption bcrypt.js, SHA256
    },

    location : {
        type : String,
        required : false
    }
})

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel


//username password jwt passport