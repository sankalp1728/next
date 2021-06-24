const mongoose = require('mongoose')
const { validate } = require('./employee')
const Scehma = mongoose.Schema

const apporvalMatrixSchema = new Scehma({
    postition : {
        type : String,
        Required : true
    },
    
    hierarchy : {
        type : {
            type : String,
            required : true
        },
        name : {
            type : String,
            required : true
        }
    },

    coolingPeriod : {
        type : Number,
        required  : true
    },
    verified : {
        type : Boolean,
        Required : true
    },
    TAT : {
        type : Number,
        required : true
    },
    approvers : [{type : String}]
})

const approvalMatrixModel = mongoose.model("approvalMatrix",apporvalMatrixSchema)

// approver TAT redifining >> << Time pe notification, system, email