const express = require('express')
const mongoose = require('mongoose')
const User = require("../models/User")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const keys = require('../keys')
var emailValidator = require("email-validator");


const app = express.Router()

app.post("/login",async(req,res)=>{

    try{
        console.log(typeof(req))
        if(!emailValidator.validate(req.body.email)){
            throw new Error("Email Invalid")
        }
        const user = await User.findOne({email : req.body.email})
        
        
        if(!user){
            throw new Error("Email Not Registered")
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            throw new Error("Password Incorrect")
        }

        const payload = {  
            email : user.email,
            Role : user.userRole
        }
        
        jwt.sign(payload,keys.secret_key,{expiresIn : 3600},(err,token)=>{
            console.log({ token : token })
            res.json({
                token : 'Bearer ' + token,
                role : user.userRole
            })
        })   
    }catch(err){
        console.log(err);
        res.status(404).json(err);
    }
    
})

module.exports = app