const mongoose = require('mongoose')
const { validate } = require('./employee')
const Scehma = mongoose.Schema

const apporvalMatrixSchema = new Scehma({
    postition : {
        type : String,
        Required : true
    },
    type : {
        type : String,
        required : true,
    },
    parent : {
        type : String,
        required : true
    },
    verified : {
        type : Boolean,
        Required : true
    },
    TAT : {
        type : Date,
        required : true
    },
    approvers : [{type : String}]
})

// approver TAT redifining >> << Time pe notification, system, email