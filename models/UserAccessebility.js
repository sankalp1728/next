const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const AccessSchema =  new mongoose.Schema({
    userID : {
        type : String,
        requried : true
    },

    access : {
        addEmployee : {
            type : Boolean,
            required : true
        },
        changePassword : {
            type : Boolean,
            requried : true
        },
        addBranch : {
            type : Boolean,
            required : true
        },
        addUserProfile : {
            type : Boolean,
            requried : true
        },
        updateUserProfile : {
            type : Boolean,
            required : true
        },
        deleteUserProfile : {
            type : Boolean,
            required : true
        },
    }
})

const userAccessModel = mongoose.model("UserAccessability",AccessSchema)

module.exports  = userAccessModel