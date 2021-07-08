const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const helper = require("../middleware/Access_check")
const Approval = require("../models/approval")
const ApprovalMatrix = require("../models/approvalMatrix")

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


router.post("/approval",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"giveApproval")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }
        const approval = await Approval.findById(req.body.approvalID)
        if(req.body.status === "Reject" && !req.body.remarks){
            return res.send("Remarks are compulsory with rejection")
        }
        
        if(req.body.status === "Accept"){
            approval.status = "Accept"
            const doc = await ApprovalMatrix.findById(approval.documentId)
            for(i = 0 ; i<doc.Approvers.length ; i++){
                if(doc.Approvers[i]._id === approval.documentId){
                    doc.Approvers[i].status = 
                }
            }
        }
        
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get("/approval",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"showApproval")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }
        const approvals = await Approval.find(req.params)
        res.send(approvals)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
