const express = require('express')
const router = express.Router()
const User = require('../models/User')
const SuperAdmin = require("../models/superAdmin")
const mongoose = require('mongoose')
const generatePassword = require('../middleware/password_generator')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const mailer = require('./mailer')
const passport = require('passport')
const emailValidator = require('email-validator')


//email conf

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




router.post('/employee/add',passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        const password = await generatePassword()
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password,salt)
        req.body.password = hash
        const employee = new User(req.body)
        const user = await User.findOne({email : req.user.email}).select("emailPassword")
        
        var notifRecievers = await User.find({
            locationID : employee.locationID,
            userType : "admin"
        }).select('email')
        console.log(notifRecievers)
        await employee.save()

        // mail to the employee ID and all admin IDs of the same location
        const sender = {
            email : req.user.email,
            password :  user.emailPassword
        } // sender here is the user in the mailer function
        
        
        notifRecievers.push({
            email : employee.email
        })

        console.log(password)
        // list of recievers, will be converted to recieverString in mailer.js

        const Subject = "Added a new Employee to the database"
        const text  = "A new employee has been added into the system, the email " + employee.email + "password of the user is " + password
        const html = undefined;
        res.send(password)
        // mailer(sender, notifRecievers, Subject, text, html)
    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})

router.post("/employee/search",passport.authenticate("jwt",{session : false}),async(req,res) =>{
    res.json(req.user)
})
//user trying to fetch his own data, to view his profile

router.post("/employee/changepassword",passport.authenticate("jwt",{session : false}) , async(req,res)=>{
    
    try{
        
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(req.body.password,salt)
        const user = await User.findOneAndUpdate({email : req.user.email}, {password : hash})
        await user.save()
        res.send("saved")
    }catch(err){
        console.log(err)
        res.send(err)    
    }
})

module.exports = router



