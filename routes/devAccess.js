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
    access :  {
        name : "accessName",
        status : true/false
    }
}
*/


router.post("/dev/updateaccess",async(req,res)=>{
    try{
        const userProfile = await UserProfile.findOneAndDelete({role : req.user.role})
        userProfile.access[req.body.access.name] = access.status;
        await userProfile.save();
        res.send(userProfile)
    }catch(err){
        console.log(err)
        res.send(err)
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