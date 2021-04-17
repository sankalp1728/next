const express = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recruiterSchema = new Schema({
    departments : {
        type : String,
        required : false,
    },

    skills : [String]
})