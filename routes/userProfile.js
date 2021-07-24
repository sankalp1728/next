const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Passport = require("passport")
const helper = require("../middleware/Access_check")
const UserProfile = require("../models/UserProfiles")

router.get("/userprofile",Passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user, "searchUserProfile")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        const userProfiles = await UserProfile.find().lean();
        res.send(userProfiles)

    }
    catch(err){
        console.log(err)
        res.send(err)
    }
    
})



router.post("/userprofile",Passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user, "addUserProfile")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        const userProfile = new UserProfile(req.body)
        await userProfile.save()
        res.json({
            Success : true
        })
    }

    catch(err){
        console.log(err);
        res.send(err);
    }
})

router.patch("/userprofile",Passport.authenticate("jwt",{session : false}),async(req,res)=>{

    try{
        if(!await helper.Access_Check(req.user, "updateUserProfile")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        
        console.log(req.body._id,req.body.access)
        const userProfile = await UserProfile.findByIdAndUpdate(req.body._id, {access : req.body.access});
        res.json({
            Success: true
        })
    }
    catch(err){
        console.log(err)
        res.send(err)
    }


})

module.exports = router