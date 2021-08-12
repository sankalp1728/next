const mongoose = require("mongoose")
const Schema = mongoose.Schema

const candidateDetailsSchema = new Schema({

    candidateID : {
        tpye : String,
        required : true
    },

    Education : [{
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
    }],

    Experience : [{
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

    }]
})

const candidateDetailsModel = mongoose.model("candidateDetails", candidateDetailsSchema)
module.exports = candidateDetailsModel