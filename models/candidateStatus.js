const mongoose = require('mongoose')
const { validate } = require('./employee')
const Scehma = mongoose.Schema

const candidateStatusSchema = new Scehma({
    candidateID : {
        type : String,
        required : true
    },
    verified : {
        type : Boolean,
        required : true
    },
    interview : {
        round : {
            type : Number,
            required : true
        },
        status : {
            type : Boolean,
            required : true
        },
        
    }
})