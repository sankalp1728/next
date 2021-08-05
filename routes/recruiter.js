const express = require("express")
const router = express.Router()
const Recruiter = require("../models/recruiter")
const passport = require("passport")



router.get("/recruiters", passport.authenticate("jwt",{session : false}), async(req,res)=>{
    try{// access_check

        
        const recruiters = await Recruiter.find().lean()

        for(var i in recruiters){
            recruiter.userID = await User.findById(recruiter.userID)
        }
        return res.send(recruiters)
    
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.patch("recruiter", passport.authenticate("jwt",{session : false}), async(req,res)=>{
    try{
        const recruiter = Recruiter.findById(req.body._id).lean()
        if(!recruiter){
            return res.status(400).json({
                err : "No recruiter"
            })
        }
        recruiter.departments = req.body.departments
        res.json({
            success : true
        })

    }catch(err){
        console.log(err)
        res.send(err)
    }
})