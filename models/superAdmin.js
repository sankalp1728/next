const mongoose = require("mongoose")
const Schema = mongoose.Schema
const emailValidator = require('email-validator')

const superAdminSchema = new Schema({
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

    email : {
        type : String,
        required : true,
        unique : true,
        
        validate(value){
            if(!emailValidator.validate(value)){
                throw new Error("the email is invalid")
            }
        }
    },

    password : {
        type : String,
        required : true // encryption bcrypt.js, SHA256
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

    userType : {
        type : String,
        default : "Super-Admin"
    }

})

const superAdminModel = mongoose.model("Super-Admin",superAdminSchema)
module.exports = superAdminModel