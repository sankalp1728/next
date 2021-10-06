const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const candidateEmployementSchema = new Scehma({

    title : {
        type : String,
        required : true
    },
    employementType : {
        type : String,
        required : true,
        enum : ['Internship','Full-Time','Temporary']
    },
    company : {
        type : String,
        required: true
    },
    location : {
        type : String,
        required : true
    },
    startDate : {
        type : Date,
        required: true
    },
    endDate : {
        type : Date,
        required: true
    },
    skills : [String]
})

const candidateEmploymentModel = mongoose.model( "candidateEmployment", candidateEmploymentSchema)
module.exports = candidateEmploymentModel
