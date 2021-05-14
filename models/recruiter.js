const express = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recruiterSchema = new Schema({
    userID : {
        type : String, 
        required : true
    },
    
    departments : [{
        type : String,
        required : false,
    }],

    skills : [String],

    mrfAssigned : [{
        mrfID : {
            type : String
        },
        requirements : {
            type : Number
        },
        shorlisted : {
            type : Number,
            default : 0
        },
        hired : {
            type : Number,
            default : 0
        }
    }]


})

// for work mrf workload distribution automated method