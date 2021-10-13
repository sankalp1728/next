const express = require("express")
const router = express.Router()
const Mrf = require("../models/mrf")
const CandidateDetails = require("../models/candidateDetails")
const passport = require('passport')
const mrfRequestModel = require("../models/mrfRequest")

router.get("/candidates/:id",passport.authenticate("jwt", {session:false}), async(req,res)=>{
    try{
        console.log(typeof req.params.id)

        // get the candidate
        candidate = await CandidateDetails.findById(req.params.id)

        // get the source User
        candidate.sourceID = await User.findById(candidate.sourceID).lean()

        // get the mrf related to the candidate
        candidate.mrfID = await Mrf.findById(candidate.mrfID).lean()

        // get the data from mrfrequestID
        candidate.position = await mrfRequest(candidate)


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