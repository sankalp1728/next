const express = require('express')
const router = express.Router()
const User = require('../models/User')
const mongoose = require('mongoose')
const generatePassword = require('../middleware/password_generator')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const mailer = require('./mailer')


//email conf





router.post('/employee/add',async(req,res)=>{
    try{
        const password = await generatePassword()
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password,salt)
        req.body.password = hash
        const employee = new User(req.body)
        const notifRecievers = User.find({
            locationID : employee.locationID,
            userType : "admin"
        }).select('email')
        await employee.save()
        res.send(employee)
        

        // mail to the employee ID and all admin IDs of the same location
        const sender = {
            mail : user.email,
            password : user.mailPassword    
        } // sender here is the user in the mailer function
        
        notifRecievers.push({
            email : employee.email
        })
        // list of recievers, will be converted to recieverString in mailer.js

        const Subject = "Added a new Employee to the database"
        const text  = "A new employee has been added into the system"

        mailer(user, notifRecievers, Subject, text, html)

        
        
        
    }catch(err){
        console.log(err);
        res.status(400).send("err")
    }
})



//user trying to fetch his own data, to view his profile
route.post("user/data")

module.exports = router;
