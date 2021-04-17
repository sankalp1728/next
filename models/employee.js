const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const employeeSchema = new Scehma({
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

    hierarchy : {
        type : String,
        required : true
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
        required : true // aurat , langda hi, challenged
    },
    
    email : {
        type : String,
        required : true // can be changed later on , used as username
    },

    password : {
        type : String,
        required : true // encryption bcrypt.js
    },

    location : {
        type : String,
        required : false
    }
})

const employeeModel = mongoose.model("employee", employeeSchema)
module.exports = employeeModel


//username password jwt passport