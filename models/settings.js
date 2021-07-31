const express = require("express")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const settingsSchema = new schema({
    distribution : {
        type : String,
        required : true,
        enum : ["manual", "odd-even", "department"]
    }
})