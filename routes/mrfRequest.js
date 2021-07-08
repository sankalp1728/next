const express = require("express")
const mongoose = require("mongoose")
const passport = require('passport')
const MrfRequest = require("../models/mrfRequest")
const Branch = require("../models/branch")
const ApprovalMatrix = require("../models/approvalMatrix")
const User = require("../models/User")
const helper = require("../middleware/Access_check")
const MrfApproval = require("../models/mrfApproval")
const router = express.Router()
const Approval = require("../models/approval")



router.get("/mrfrequest",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"searchMrf")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        const mrf = await MrfRequest.find()
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

        // Handle the candidate requirement

        req.body.candidates = {
            requirement : req.body.candidates.requirement,
            screening : 0,
            businessEval : 0,
            linedUp : 0,
            interviewed : 0,
            shortlisted : 0,
            BCGVerified : 0,
            hired : 0
        }



        // put status to unapproved

        req.body.status = "unapproved"

        const mrfRequest = new MrfRequest(req.body)
        await mrfRequest.save();

        // check for the first approver.

        const approval = await ApprovalMatrix.findById(req.body.designation.positionID)

        // initialize mrfApproval document

        var mrfApproval = {
            mrfRequestID : mrfRequest._id,
            tat : approval.tat,
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
                    status : 'Accept'
                })
            }
            // from approverIndex+1 to finish
            for(i = approverIndex+1 ; i<=approval.approversID.length ; i++){
                mrfApproval.Approvers.push({
                    _id : approval.approversID[i]._id,
                    status : 'None'
                })
            }
            
        }else{
            // from 0 to finish
            for(i = 0 ; i<approval.approversID.length ; i++){
                mrfApproval.Approvers.push({
                    _id : approval.approversID[i]._id,
                    status : "None"
                })
            }
        }

        // in case of no duplication 

        for(i = 0 ; i<approval.approversID.length ; i++){
            
            mrfApproval.Approvers.push({
                _id : approval.approversID[i]._id,
                status : 'None'
            })
        }

        mrfApproval = new MrfApproval(mrfApproval)
        await mrfApproval.save()

        // generate an approval and check for every user that is present in the approval matrix
        var approv = {
            type : "Approval Matrix",
            documentId : mrfApproval._id,
            status : "None"
        }

        if(approverIndex === -1){
            console.log(approval.approversID[approverIndex+1])

            approv.userId = approval.approversID[0]._id
        }else if((approverIndex+1) < (approval.approversID.length)){
            console.log(approval.approversID[approverIndex+1])
            approv.userId = approval.approversID[approverIndex+1]
        }

        approv = new Approval(approv)
        await approv.save()

        

        console.log(mrfApproval)
        res.send(mrfApproval)

        
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router