const express = require('express')
const mongoose = require('mongoose')
const User = require("../models/User")
var bcrypt = require('bcryptjs');
const PushNotifications = require('@pusher/push-notifications-server');
var jwt = require('jsonwebtoken')
const keys = require('../keys')
var emailValidator = require("email-validator");
const SuperAdmin = require("../models/superAdmin")


let beamsClient = new PushNotifications({
    instanceId: "b24879e8-5451-46e8-b512-e667ccc1a0e1",
    secretKey: "4C501B1EA5F7801417598D08865E887FFC89F82C64735CD191ECB2DD5C56096A",
  });

const app = express.Router()

app.post("/login",async(req,res)=>{

    try{
        if(!emailValidator.validate(req.body.email)){
            throw new Error("Email Invalid")
        }
        var user = await User.findOne({email : req.body.email})
        if(!user){
            user = await SuperAdmin.findOne({email : req.body.email})
            if(!user){
                return res.status(401).json({
                    email : "Invalid"
                })
            }
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            console.log("error")
            return res.status(401).json({
                password : "Invalid"
            })
        }

        const payload = {  
            _id : user._id,
            email : user.email,
            Role : user.userRole.name
        }
       console.log(user._id, user._id instanceof mongoose.Types.ObjectId)
        
        jwt.sign(payload,keys.secret_key,{expiresIn : 36000},(err,token)=>{
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