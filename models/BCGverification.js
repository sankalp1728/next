const mongoose = require("mongoose")
const Schema = mongoose.Schema
// contains the locations of all the branches of the office or the location of employees, used to run searches in the dropdowns
const bcgVerificationSchema = new Schema({
    name : {
        type : String,
        unique : true,
        required : true
    },
    location : {
        type : String,
        required : true
    },
})

const bcgVerificationModel = mongoose.model("bcgVerification", bcgVerificationSchema)
module.exports = bcgVerificationModel