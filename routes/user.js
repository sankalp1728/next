const express = require('express')
const router = express.Router()
const User = require('../models/User')
const SuperAdmin = require("../models/superAdmin")
const mongoose = require('mongoose')
const generatePassword = require('../middleware/password_generator')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const helper = require("../middleware/Access_check")
const mailer = require('./mailer')
const passport = require('passport')
const emailValidator = require('email-validator')




router.get("/user",passport.authenticate("jwt",{session : false}),async(req,res) =>{
    try{
        if(! await helper.Access_Check(req.user,"searchUser")){
            res.status(401).send({
                Access : "Insufficient"
            })
        }
        const users = await User.find().lean();
        res.send(users);
    }catch(err){
        console.log(err)
        res.send(err)
    }
})



router.post('/super-admin/add',async(req,res)=>{
    try{   
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(req.body.password,salt)
        req.body.password = hash;
        const admin = new SuperAdmin(req.body);
        await admin.save();
        console.log("hi")
        res.send({
            success : true
        });
    }catch(err){
        console.log(err)
        res.json(err)
    }
})



router.post('/user',passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        const password = await generatePassword()
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password,salt)
        req.body.password = hash
        const employee = new User(req.body)
        
        
        var notifRecievers = await User.find({
            locationID : employee.branchID,
            userType : "admin" || userType 
        }).select('email').lean()

        notifRecievers.push({
            email : employee.email
        })// notifrecievers => receiverString
        console.log(notifRecievers)
        notifRecievers.push({
            email : employee.email
        })
        await employee.save()
        

        console.log(password)
        // list of recievers, will be converted to recieverString in mailer.js

        const Subject = "Added a new Employee to the database"
        const text  = "A new employee has been added into the system, the email " + employee.email + "password of the user is " + password
        const html = undefined;
        mailer(req.user,notifRecievers, Subject, text, html)
        res.send(password)
    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})

//user trying to fetch his own data, to view his profile

router.patch("/user/forgotpassword",async(req,res)=>{
    
    try{
        const password = await generatePassword()
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password,salt)
        const user = await User.findOneAndUpdate({email : req.body.email}, {password : hash})
        const Subject = "Forgot Password"
        const text  = "A new password has been generated for your account, please login and change your password. Your new and current password is :- " + password + " ."
        const html = undefined;
        const notifRecievers = [];
        notifRecievers.push({email : req.body.email})
        mailer(req.body,notifRecievers,Subject,text,html)
        res.send("saved")
    }catch(err){
        console.log(err)
        res.send(err)    
    }
})

module.exports = router



