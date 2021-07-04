const express = require("express")
const mongoose = require("mongoose")
const passport = require('passport')
const MrfRequest = require("../models/mrfRequest")
const Branch = require("../models/branch")
const ApprovalMatrix = require("../models/approvalMatrix")
const User = require("../models/User")
const helper = require("../middleware/Access_check")

const router = express.Router()



router.get("/mrfrequest",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"searchMrf")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        const mrf = Mrf.find()
        res.send(mrf)
    
    }catch(err){
        console.log(err)
        res.send(err)
    }
})











router.post("/mrfrequest",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"addMrf")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        // check if reporting manager ID invalid

        req.body.reportingManager = req.user._id

        //check if the position is new, there must be a replacementID

        if(req.body.designation.positionType === 'replacement'){
            if(!req.body.designation.replacementID){
                return res.status(401).send("replacementID required if The PositionType is replacement")
            }
        }

        // check if branch is valid

        if(! await Branch.findById(req.body.branchID)){
            throw new Error("Branch Invalid")
        }

        // put status to unapproved

        req.body.status = "unapproved"

        const mrfRequest = new MrfRequest(req.body)
        await mrfRequest.save();

        // check for the first approver.

        const approval = await ApprovalMatrix.findById(req.body.designation.positionID)

        // initialize mrfApproval document

        const mrfApproval = {
            mrfRequestID : mrfRequest._id,
            TAT : approval.tat,
            Approvers : []
        }
        
        
        // 1.1 Yes - then approve everything untill him
        // 1.2 No - then let it be
        approverIndex = -1;

        // 1 check if the user is in the approval matrix

        for(i = 0 ; i<approval.approversID.length ; i++){
            if(req.user._id === approval.approversID[i]){
                approverIndex = i
            }
        }

        if(approverIndex !== -1){
            // from 0 to approvrIndex loop for status : true
            for(i = 0 ; i<=approverIndex ; i++){
                mrfApproval.Approvers.push({
                    _id : approval.approversID[i]._id,
                    status : true
                })
            }
            // from approverIndex to finish
            for(i = approverIndex ; i<=approval.approversID.length ; i++){
                mrfApproval.Approvers.push({
                    _id : approval.approversID[i]._id,
                    status : false
                })
            }
            
        }else{
            // from 0 to finish
            for(i = 0 ; i<approval.approversID.length ; i++){
                mrfApproval.Approvers.push({
                    _id : approval.approversID[i]._id,
                    status : false
                })
            }
        }

        // in case of no duplication 

        for(i = 0 ; i<approval.approversID.length ; i++){
            
            mrfApproval.Approvers.push({
                _id : approval.approversID[i]._id,
                status : false
            })
        }
        console.log(mrfApproval)
        res.send(mrfApproval)

        
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router