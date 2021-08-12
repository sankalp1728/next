const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const MrfDist = require("../models/mrfDistribution")
const Mrf = require("../models/mrf")
const MrfRequest = require("../models/mrfRequest")
const Recruiter = require("../models/recruiter")
const passport = require("passport")
const MrfRequest = require("../models/mrfRequest")
const MrfApproval = require("../models/mrfApproval")


router.get("/mrfdistribution",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        const mrfDistribution = await MrfDist.find({userID : req.user.userID}).lean()
        
        for(var i in mrfDistribution){
            mrfDistribution[i].mrfRequestID = await MrfRequest.findById(mrfDisribution.mrfRequestID).lean()
            for(var j in mrfDistribution[i].mrf){
                mrfDistribution[i].mrf[j]._id = await Mrf.findById(mrfDistribution[i].mrf[j]._id)
                
                mrfDistribution[i].mrf[j].recruiterID = await User.findById(await Recruiter.findById(mrfDistribution[i].mrf[j].recruiterID).userID).lean()
            }
        }
        res.send(mrfDisribution)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})


/*
    mrfDistributionID : <_id>,
    arr : [{
        RecruiterID : <id>,
        quantity : <number>
    }]
*/


router.post("/mrfdistribution", async(req,res)=>{
    try{
        const mrfDistribution = await MrfDist.findById(req.body._id)
        
        for(var i in req.body.arr){
            for(let j = 0 ; j<req.body.arr[i].quantity ; j++){
                // mrf create
                const mrfi = new Mrf({
                    mrfRequestID : mrfRequest,
                    mrfApprovalID : MrfApproval._id,
                    mrfDistributorID : admin._id,
                    rectruiterID : recruiters[i%recruiters.length]._id
                })
                // mrfDistribution add
                // recruiter profile addition
            }
        }
    }catch(err){

    }
})