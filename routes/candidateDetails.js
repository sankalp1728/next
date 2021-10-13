const express = require("express")
const router = express.Router()
const CandidateDetails = require("../models/candidateDetails")
const passport = require('passport')

router.get("/candidates/:id",passport.authenticate("jwt", {session:false}), async(req,res)=>{
    try{
        console.log(typeof req.params.id)
        candidate = await CandidateDetails.findById(req.params.id)
        console.log(candidate)
        res.send(candidate)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get("/candidates", passport.authenticate("jwt", {session : false}), async(req,res)=>{
    try{
        console.log(req.user._id)
        const user = User.findById(req.user._id).lean()

        if(user.userType === "vendor"){
            return res.send({
                message : "trying something new"
            })
        }


        
    }
    catch(err){
        res.send(err)
    }
})


router.post("/candidates", passport("jwt",{session : false}), async(req,res)=>{
    
})


module.exports = router