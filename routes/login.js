const express = require('express')
const mongoose = require('mongoose')
var emailValidator = require("email-validator");

const app = express.Router()

app.get("/login",async(req,res)=>{

    try{
        emailValidator.validate(req.body.username)
        
    }catch(err){

    }
    
})