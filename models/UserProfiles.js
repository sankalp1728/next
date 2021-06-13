const mongoose = require("mongoose")
const Scehma = mongoose.Schema

const ProfileSchema =  new mongoose.Schema({
    role : {
        type : String,
        required : true
    }, // name of role

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
        }
    }
})

const profileModel = mongoose.model("UserProfile",ProfileSchema)

module.exports = profileModel