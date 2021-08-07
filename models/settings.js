const express = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const settingsSchema = new Schema({
    distribution : {
        type : String,
        required : false,
        enum : ["manual", "odd-even", "department"]
    },
    lastRecruiterID : {
        type : String,
        required : false
    }
})

const settingsModel = mongoose.model("setting", settingsSchema)
module.exports = settingsModel