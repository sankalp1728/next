const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const interviewMatrixSchema = new Scehma({

    mrf_id : {
        type : String,
        required : true
    },
    interviewer : [{
        round : {
            type : Number,
        },
        Id : {
            type : String
        }

    }],

})