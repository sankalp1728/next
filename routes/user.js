const express = require('express')
const router = express.Router()
const User = require('../models/User')
const mongoose = require('mongoose')
const generatePassword = require('../middleware/password_generator')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')


router.post('/employee/add',async(req,res)=>{
    try{
        const password = await generatePassword()
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password,salt)
        req.body.password = hash
        const employee = new User(req.body)
        await employee.save()
        res.send(employee)
        
        
    }catch(err){
        console.log(err);
        res.status(400).send("err")
    }
})

module.exports = router;
