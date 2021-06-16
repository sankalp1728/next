const express = require('express')
const mongoose = require('mongoose')
const User = require("../models/User")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const keys = require('../keys')
var emailValidator = require("email-validator");
const SuperAdmin = require("../models/superAdmin")


const app = express.Router()

app.post("/login",async(req,res)=>{

    try{
        console.log(typeof(req))
        console.log(req)
        if(!emailValidator.validate(req.body.email)){
            throw new Error("Email Invalid")
        }
        var user = await User.findOne({email : req.body.email})
        if(!user){
            user = await SuperAdmin.findOne({email : req.body.email});
            if(!user){
                return res.json({
                    email : "Invalid"
                })
            }
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