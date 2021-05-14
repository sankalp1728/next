const mongoose = require('mongoose')
const Schema = mongoose.Schema

const skillSchema = new Schema({
    skill : {
        type : String,
        required : true
    }
})

const skillModel = mongoose.model('skill',skillSchema)
module.exports = skillModel;