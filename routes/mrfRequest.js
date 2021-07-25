const express = require("express")
const mongoose = require("mongoose")
const passport = require('passport')
const MrfRequest = require("../models/mrfRequest")
const Branch = require("../models/branch")
const ApprovalMatrix = require("../models/approvalMatrix")
const Hierarchy = mongoose.model('hierarchy')
const User = require("../models/User")
const helper = require("../middleware/Access_check")
const MrfApproval = require("../models/mrfApproval")
const router = express.Router()
const Approval = require("../models/approval")
const SuperAdmin = require("../models/superAdmin")



router.get("/mrfrequest",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"showMrfRequest")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        var mrf = await MrfRequest.find().lean()

    for(var i in mrf){
        console.log(mrf[i])
        mrf[i].hierarchyID = await Hierarchy.findById(mrf[i].hierarchyID)
        mrf[i].branchID = await Branch.findById(mrf[i].branchID)
        if(await User.findById(mrf[i].reportingManager)){
            mrf[i].reportingManager = await User.findById(mrf[i].reportingManager)
        }else{
            mrf[i].reportingManager = await SuperAdmin.findById(mrf[i].reportingManager)
        }
        
        
        mrf[i].designation.positionID = await ApprovalMatrix.findById(mrf[i].designation.positionID).lean()
        console.log(mrf[i].designation.positionID.approversID.length)
        for(var j = 0 ; j<mrf[i].designation.positionID.approversID.length ; j++){
            mrf[i].designation.positionID.approversID[j]._id = await User.findById(mrf[i].designation.positionID.approversID[j]._id).select("name").lean()
            mrf[i].designation.positionID.approversID[j]._id.userId = mrf[i].designation.positionID.approversID[j]._id._id
            delete mrf[i].designation.positionID.approversID[j]._id._id
        }
        
    }
    res.send(mrf)
    
    }catch(err){
        console.log(err)
        res.send(err)
    }
})











router.post("/mrfrequest",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    try{
            if(!await helper.Access_Check(req.user,"addMrfRequest")){
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
                console.log(i," loop1")
            }
            // from approverIndex+1 to finish
            for(i = (approverIndex) ; i<approval.approversID.length ; i++){
                mrfApproval.Approvers.push({
                    _id : approval.approversID[i]._id,
                    status : 'None'
                })
                console.log(i," loop2")
            }
            
        }else{
            // from 0 to finish
            for(i = 0 ; i<approval.approversID.length ; i++){
                mrfApproval.Approvers.push({
                    _id : approval.approversID[i]._id,
                    status : "None"
                })
                console.log(i," loop3")
            }
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