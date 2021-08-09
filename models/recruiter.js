const express = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recruiterSchema = new Schema({
    userID : {
        type : String, 
        required : true,
        unique : true
    },
    
    departments : [String],

    mrfAssigned : [{
        _id : {
            type : String,
            required : true
        },
        isActive : {
            type : Boolean,
            required :true,
            default : true
        },
        hiredCandidateId : {
            type : String,
            required : false,
            default : null
        }
    }]


})


const recruiterModel = mongoose.model("recruiter", recruiterSchema)
module.exports = recruiterModel


// for work mrf workload distribution automated method