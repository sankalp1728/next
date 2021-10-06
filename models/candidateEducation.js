const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const candidateEducationSchema = new Scehma({

    school : {
        type : String,
        required : true
    },
    degree  : { 
        type : String,
        required : true
    },
    fieldOfStudy : { 
        type : String,
        required : true
    },
    startDate : { 
        type : Date,
        required :                                                                                                                                                                                                     true
    },
    endDate : { 
        type : Date,
        required : true
    },
    grade : {
        type : mongoose.Decimal128,
        required : true
    },
    description : {
        type : String,
        required : true
    }

})

const candidateEducationModel = mongoose.model( "candidateEducation", candidateEducationSchema)
module.exports = candidateEducationModel
