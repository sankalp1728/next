const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const interviewMatrixSchema = new Scehma({

    position : {
        type : String,
        required : true
    },
    interviewer : [{
        round : {
            type : Number,
        },
        userId : {
            type : String
        }

    }]

})