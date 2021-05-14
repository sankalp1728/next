const mongoose = require("mongoose")
const Schema = mongoose.Schema
// contains the locations of all the branches of the office or the location of employees, used to run searches in the dropdowns
const locationSchema = new Schema({
    Location : {
        type : String,
        required : true
    }
})