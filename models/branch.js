const mongoose = require("mongoose")
const Schema = mongoose.Schema
// contains the locations of all the branches of the office or the location of employees, used to run searches in the dropdowns
const branchSchema = new Schema({
    location : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
})

const branchModel = mongoose.model("Branch",branchSchema);

module.exports = branchModel