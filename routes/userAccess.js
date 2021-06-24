const express = require("express")
const mongoose = require("mongoose")
const { Passport } = require("passport")
const UserProfile = require("../models/UserProfiles")
const passport= require("passport")
const helper = require("../middleware/Access_check")

const router = express.Router()

router.post("/userprofile/add",passport.authenticate("jwt",{session:false}) , async(req,res) => {
    try{
        if(!(await helper.Access_Check(req.user,"addUserProfile"))){
            return res.json({
                Access : "Insufficient"
            })
        }
        const userProfile = new UserProfile(req.body)
        await userProfile.save()
        res.json({
            success : true
        })
    }catch(err){
        console.log(err);
        res.send(err);
    } 
})

router.post("userprofile/update",passport.authenticate("jwt",{session:false}),async(req,res) =>{

    try{
        if(!Access_Check(user,"updateUserProfile")){
            return res.json({
                Access : false
            })
        }
        const userProfile = await UserProfile.findOneAndUpdate({role : req.body.role},{access : req.body.access})
        console.log("updated")
        res.json({
            success : true
        })
    }catch(err){
        console.log()
    }

})

router.post("useprofile/delete",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!Access_Check(user,"deleteUserProfile")){
            return res.json({
                Access : false
            })
        }
        const userProfile = await UserProfile.findOneAndDelete({role : req.body.role})
        res.json(userProfile)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})


router.post("userprofile/search",passport.authenticate("jwt",{session : false},async(req,res)=>{
    try{
        if(!await helper.Access_Check(user, "searchUserProfile")){
            return res.json({
                Access : "Insufficient"
            })
        }
        const profiles = await UserProfile.find().select("role");
        res.send(profiles)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}))




module.exports = router;