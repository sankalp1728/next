const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const helper = require("../middleware/Access_check")
const Approval = require("../models/approval")

const mrfApproval = require("../models/mrfApproval")

const router = express.Router()


// handle both acceptance and rejection
/*
requestBody = {
    approvalID : <id>,
    status : "Accept"/"Reject",
    remarks : If rejected then should be mentioned.
}
*/


router.post("/approve",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        const approval = await Approval.findById(req.body.approvalID)
        
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get("/approval",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if()
        const approvals = await Approval.find(req.params)
        res.send(approvals)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
