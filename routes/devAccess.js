const mongoose = require("mongoose")
const express = require("express")
const UserProfile = require("../models/UserProfiles")

const router = express.Router()

router.post("dev/userprofile/add",async(req,res)=>{
    try{
        const userProfile = new UserProfile(req.body)
        await userProfile.save()
        res.send("route saved")
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

/*
{
    role : "rolename",
    access :  [
        Name : status
    ] // just make it an array
}
*/


router.post("/dev/updateaccess",async(req,res)=>{
    try{
        var userProfile = await UserProfile.findOneAndDelete({role : req.body.role}).lean()
        if(!userProfile){
            throw new Error("UserProfile incorrect")
        }
        const prop = Object.keys(req.body.access);
        console.log(prop);
        userProfile.access = Object.assign(userProfile.access,req.body.access)
        console.log(userProfile)
        userProfile = new UserProfile(userProfile)
        await userProfile.save();
        // const userProfile = "profile";
        res.send(userProfile)
    }catch(err){
        console.log(err)
        res.json(err)
    }
})

router.post("/dev/addaccess",async(req,res)=>{
    try{
        const userProfile = new UserProfile(req.body)
        await userProfile.save()
        res.send(userProfile)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router