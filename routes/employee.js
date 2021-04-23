const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')
const mongoose = require('mongoose')
const generatePassword = require('../middleware/password_generator')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')


router.post('/employee/add',()=>{
    try{
        const password = await generatePassword()
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password,salt)
        req.password = hash
        const employee = new Employee(req.body)
        await employee.save()

        
        
    }catch(err){

    }
})