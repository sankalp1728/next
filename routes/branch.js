const express = require("express")
const mongoose = require("mongoose")
const Branch = require("../models/branch")
const helper = require("../middleware/Access_check")
const passport = require('passport')
const router = express.Router()

router.post("/branch",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"addBranch")){
            throw new Error("Insufficient Access")
        }
        const branch = new Branch(req.body)
        await branch.save()
        res.send(branch);
    }catch(err){
        console.log(err)
        res.json(err)
    }
})


router.get("/branch",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"showBranch")){
            throw new Error("Insufficient Access")
        }
        console.log(req.query)
        const branch = await Branch.find(req.query)
        res.send(branch)
    }catch(err){
        console.log(err);
        res.send(err)
    }
})



router.delete("/branch",passport.authenticate("jwt",{session : false}),async(req,res)=>{
   try{
       if(!await helper.Access_Check(req.user,"removeBranch")){
           throw new Error("Insufficient Access")
       }

       const branch = await Branch.findByIdAndDelete(req.body._id)
       res.send({
           Success : true
       })
   }catch(err){
       console.log(err)
       res.send(err)
   }
})

module.exports = router