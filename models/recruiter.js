const express = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recruiterSchema = new Schema({
    UserID : {
        type : String, 
        required : true
    },
    
    departments : [{
        type : String,
        required : false,
    }],

    skills : [String],

    MrfAssigned : [{
        MrfID : {
            type : String
        },
        requirements : {
            type : Number
        }
    }]


})

// for work mrf workload distribution automated method