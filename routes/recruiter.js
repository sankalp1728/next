const express = require("express")
const router = express.Router()
const Recruiter = require("../models/recruiter")
const User = require("../models/User")
const passport = require("passport")



router.get("/recruitermanagement", passport.authenticate("jwt",{session : false}), async(req,res)=>{
    try{// access_check

        
        const recruiters = await Recruiter.find().lean()

        for(var i in recruiters){
            recruiters[i].userID = await User.findById(recruiters[i].userID)
        }
        res.send(recruiters)
    
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.patch("/recruitermanagement", passport.authenticate("jwt",{session : false}), async(req,res)=>{
    try{
        const recruiter = await Recruiter.findById(req.body._id)
        if(!recruiter){
            return res.status(400).json({
                err : "No recruiter"
            })
        }
        recruiter.departments = req.body.departments

        await recruiter.save()
        res.json({
            success : true
        })

    }catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router