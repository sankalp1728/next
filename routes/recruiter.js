const express = require("express")
const router = express.Router()
const Recruiter = require("../models/recruiter")
const User = require("../models/User")
const passport = require("passport")
const Branch = require("../models/branch")
const Hierarchy= require("../models/heirarchy")



router.get("/recruitermanagement", passport.authenticate("jwt",{session : false}), async(req,res)=>{
    try{// access_check

        
        const recruiters = await Recruiter.find().lean()

        for(var i in recruiters){

            for(var j in recruiters[i].departments){
                recruiters[i].departments[j] = await Hierarchy.findById(recruiters[i].departments[j]).lean()
            }
            recruiters[i].userID = await User.findById(recruiters[i].userID).lean()
            recruiters[i].userID.branchID = await Branch.findById(recruiters[i].userID.branchID).lean()
            recruiters[i].userID.hierarchyID = await Hierarchy.findById(recruiters[i].userID.hierarchyID).lean()
        }
        res.send(recruiters)
    
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.patch("/recruitermanagement", passport.authenticate("jwt",{session : false}), async(req,res)=>{
    try{
        var recruiter = await Recruiter.findByIdAndUpdate(req.body._id, {departments : req.body.departments}).lean()
        if(!recruiter){
            return res.status(400).json({
                err : "No recruiter"
            })
        }
        res.json({
            Success : true
        })

    }catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router