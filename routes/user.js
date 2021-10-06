const express = require('express')
const passport = require('passport')
const emailValidator = require('email-validator')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const mailer = require('./mailer')

const router = express.Router()

const helper = require("../middleware/Access_check")
const generatePassword = require('../middleware/password_generator')

const SuperAdmin = require("../models/superAdmin")
const UserProfile = require('../models/UserProfiles')
const User = require('../models/User')
const Branch = require("../models/branch")
const UserAccessability = require("../models/UserAccessebility")
const Hierarchy = require("../models/heirarchy")
const Recruiter = require("../models/recruiter")
const { findById } = require('../models/recruiter')

// get all users

router.get("/user",passport.authenticate("jwt",{session : false}),async(req,res) =>{
    try{
        if(! await helper.Access_Check(req.user,"searchUser")){
            res.status(401).send({
                Access : "Insufficient"
            })
        }
        var users = await User.find().lean();


        for(i = 0 ; i< users.length; i++){
            if(users[i].userRole.name === "Special"){
                var userAccess = await UserAccessability.findById(users[i].userRole._id, "access")
                users[i].access = userAccess.access
                console.log(userAccess.access)
            }
            users[i].branchID = await Branch.findById(users[i].branchID)
            users[i].hierarchyID = await Hierarchy.findById(users[i].hierarchyID)
        }
        res.send(users);
    }catch(err){
        console.log(err)
        res.send(err)
    }
})


// add user


router.post('/user',passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"addUser")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }
        const password = await generatePassword()
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password,salt)
        console.log(req.body)
        req.body.password = hash
        req.body.userRole._id = "343"
        const employee = new User(req.body)

        
        
        if(!await Hierarchy.findById(req.body.hierarchyID)){
            res.status(401).send("The hierarchyID is invalid")
        }
        
        if(!await Branch.findById(req.body.branchID)){
            res.status(401).send("The branchID is invalid")
        }
        
        if(req.body.userRole.name === "Special"){           // make user accessability for special cases
            const userAccess = new UserAccessability({
                userId : employee._id,
                access : req.body.access
            })
            await userAccess.save()
            employee.userRole._id = userAccess._id
        }
        
        // if he is a recruiter add him to the recruiters list

        if(employee.userType === "recruiter"){
            const recruiter = new Recruiter({
                userID : employee._id
            })
            await recruiter.save()
        }
        
        
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
        res.json({
            password : password,
            Success : true
        })
    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})

// delete User


router.delete("/user",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"deleteUser")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }
        const user = await User.findByIdAndDelete(req.body._id)
        console.log(user)
        res.send({
            Success : true
        })
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

// edit User

router.patch("/user",passport.authenticate("jwt",{session: false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"editUser")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        if(!await Hierarchy.findById(req.body.hierarchyID)){
            res.status(401).send("The hierarchyID is invalid")
        }
        
        if(!await Branch.findById(req.body.branchID)){
            res.status(401).send("The branchID is invalid")
        }

        const user = User.findByIdAndUpdate(req.body._id,req.body)

        res.send({
            Success : true
        })
        
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
















// forgot password

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
        console.log(password, user)
        res.send("saved")
    }catch(err){
        console.log(err)
        res.send(err)    
    }
})


// add super-admin

router.post('/super-admin/add',async(req,res)=>{
    try{   
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(req.body.password,salt)
        req.body.password = hash;
        req.body.userType  = "Super-Admin";
        if(!await UserProfile.findOne({role : "Super-Admin"})){
            const userRole = new UserProfile({
            role : "Super-Admin",
            access : {
                addUser : true,
                searchUser : true,
                deleteUser : true,
                editUser : true,
                changePassword : true,
                addBranch : true,
                showBranch : true,
                addUserProfile : true,
                updateUserProfile : true,
                deleteUserProfile : true,
                addHeirarchy :  true,
                removeHeirarchy : true,
                searchHeirarchy : true,
                searchUserProfile : true,
                addUserProfile : true,
                addApprovalMatrix : true,
                deleteApprovalMatrix : true,
                updateApprovalMatrix : true,
                requestApprovalMatrix : true,
                addMrfRequest : true,
                deleteMrfRequest : true,
                editMrfRequest : true,
                showMrfRequest : true,
                showApproval : true,
                giveApproval : true
            }
        })
        await userRole.save()}
        req.body.userRole = {
            _id : (await UserProfile.findOne({role : "Super-Admin"}))._id,
            name : "Super-Admin",
        }
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



/*
*req.body = {
    oldPassword : <old password>,
    newPassword : <new Password>
}
*/

router.post("/changepassword",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        const user = User.findById(req.user)
        if(!user){
            const user = SuperAdmin.findById(req.user)
            if(!user){
                return res.status(400).json({
                    err : "Invalid User"
                })
            }
        }

        const salt = bcrypt.genSalt(10)
        const hash = bcrypt.hash(req.body.password)
        User.password = hash
        User.save()
        res.status(200).json({
            success : true
        })
        
    }catch(err){
        console.log(err)
        res.send(err)
        
    }
})




//user trying to fetch his own data, to view his profile



module.exports = router



