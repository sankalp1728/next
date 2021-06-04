const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
const keys = require('../keys')
var emailValidator = require("email-validator");
const login = require('../../../Downloads/MERN Stack Front To Back Full Stack React, Redux & Node.js/devcon/validators/login');

const app = express.Router()

app.post("/login",async(req,res)=>{

    try{
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
            email : user._id,
            user : user.userRole
        }
        
        jwt.sign(payload,keys.secret_key,{expiresIn : 3600},(err,token)=>{
            console.log({ token : token })
            res.json({
                token : 'Bearer ' + token
            })
        })   
    }catch(err){
        console.log(err);
        res.status(404).json(err);
    }
    
})

module.exports = app