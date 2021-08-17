const express = require("express")
const passport = require("passport")
const helper = require("../middleware/Access_check")
const MrfDistribution = require("../models/mrfDistribution")
const SuperAdmin = require("../models/superAdmin")
const Approval = require("../models/approval")
const Settings = require("../models/settings")
const Hierarchy = require("../models/heirarchy")
const User = require("../models/User")
const ApprovalMatrix = require("../models/approvalMatrix")
const Distributor = require("../middleware/mrfDisribution")
const MrfApproval = require("../models/mrfApproval")
const MrfRequest = require("../models/mrfRequest")
const Branch = require("../models/branch")
const { findById } = require("../models/User")

const router = express.Router()


// handle both acceptance and rejection
/*
requestBody = {
    approvalID : <id>,
    status : "Accept"/"Reject",
    remarks : If rejected then should be mentioned.
}
*/

// cron.schedule('0 0 * * *', async function() {
//     const mrfApproval = await MrfApproval.find({
//         isActive : true
//     }).lean()

//     for(var i in mrfAprroval){
//         if(mrfApproval[i].updatedAt)
//     }
    
// });


router.post("/approval/mrf",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"giveApproval")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        // there should always be remarks in case of a Rejection
        const settings = await Settings.find()
        const approval = await Approval.findById(req.body._id)
        if(!approval){
            return res.status(400).json({
                error : "approval id invalid"
            })
        }


        if(approval.status === "Reject"|| approval.status === "Accept"){
            return res.status(400).json({
                error : "The Approval Request has already been " + approval.status + "ed" 
            })
        }


        if(req.body.status === "Reject" && !req.body.remarks){
            return res.status().json({
                error : "Remarks are compulsory with rejection"
            })
        }

        // Case - Rejection

        if(req.body.status === "Reject"){
            approval.status = "Reject",
            approval.remarks = req.body.remarks
            const mrfApproval = await MrfApproval.findById(approval.documentId)
            for(i = 0; i<mrfApproval.Approvers.length; i++){
                // approval rejected for the current rejecting user
                if(mrfApproval.Approvers[i]._id === approval.userId){
                    mrfApproval.Approvers[i].status = "Reject"
                }
            }
            // mrf request status changing to rejected and remarks set to what the remarks are in req.body
            const mrf = await MrfRequest.findByIdAndUpdate(mrfApproval.mrfRequestID,{status : "rejected"})
            await approval.save()
            await mrfApproval.save()
        }

        // Rejection.notification send to the reporting manager, the one created the mrf

        

        // Case - Acceptance
        
        if(req.body.status === "Accept"){
            approval.status = "Accept"
            await approval.save()
            const doc = await MrfApproval.findById(approval.documentId)
            var i = 0
            for(i = 0 ; i<doc.Approvers.length ; i++){
                if(doc.Approvers[i]._id === approval.userId){
                    doc.Approvers[i].status = "Accept"
                    break;
                    // doc.Approvers[i].remarks = req.body.remarks
                    // notification to the new approver
                }
            }
            await doc.save()
            // check if he is the last approver
            // if Yes
            if(i === (doc.Approvers.length-1)){
                // send notification to reporting manager(mrf is live)
                // send notification to all admin HR
                // create mrf distribution tab(frontend)
                if(settings.distribution === "manual"){
                    const superAdmin = await SuperAdmin.findOne({userType : "Super-Admin"})
                    const mrfDistribution = new MrfDistribution({
                        userID : superAdmin._id,
                        mrfRequestID : doc.mrfRequestID,
                        isActive : true
                    })
                    await mrfDistribution.save()
                    return res.json({
                        "message" : "mrf Distributed manually"
                    })
                }else{
                    const mrf = await MrfRequest.findById(doc.mrfRequestID).lean()
                    const result = await Distributor.distribution(mrf.candidates.requirement, doc.mrfRequestID)
                }
                // const distribution = await distributor(doc.mrfRequestID).................
                // const mrfApproval = MrfApproval.findById(approval.documentId)
                const mrf = await MrfRequest.findByIdAndUpdate(doc.mrfRequestID,{status : "assignment"})
                // notification to both the CHRO and the reporting manager on the request
            }
            // if No
            else{
                // prepare the new document for the 
                const newapproval = new Approval({
                    userId : doc.Approvers[i+1]._id,
                    type : "Approval Matrix", 
                    documentId  : approval.documentId,
                    status : "None",
                })
                await newapproval.save()
            }
        }

        res.json({
            Success : true
        })

        // Acceptance.notification
        
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
        const approvals = await Approval.find({userId : req.user._id}).lean()
        for(i = 0 ; i< approvals.length ; i++){
            var requestID = await MrfApproval.findById(approvals[i].documentId).lean()
            approvals[i]
            approvals[i].mrfInfo = await MrfRequest.findById(requestID.mrfRequestID).lean()
            approvals[i].mrfInfo.hierarchyID = await Hierarchy.findById(approvals[i].mrfInfo.hierarchyID).lean()
            approvals[i].mrfInfo.branchID = await Branch.findById(approvals[i].mrfInfo.branchID).lean()
            approvals[i].mrfInfo.reportingManager = await User.findById(approvals[i].mrfInfo.reportingManager).lean()
            approvals[i].mrfInfo.designation.positionID = await ApprovalMatrix.findById(approvals[i].mrfInfo.designation.positionID).select("position").lean()
            
        }
        res.send(approvals)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})


router.get("/mrfapproval", async(req,res)=>{
    try{
        console.log(34)
        var mrfApproval = await MrfApproval.find().lean()

        for(var i in mrfApproval) {
            mrfApproval[i].mrfRequestID = await MrfRequest.findById(mrfApproval[i].mrfRequestID).lean()
            mrfApproval[i].mrfRequestID.hierarchyID = await Hierarchy.findById(mrfApproval[i].mrfRequestID.hierarchyID).lean()
            mrfApproval[i].mrfRequestID.branchID = await Branch.findById(mrfApproval[i].mrfRequestID.branchID).lean()
            let result = await User.findById(mrfApproval[i].mrfRequestID.reportingManager).lean()
            if(!result){
                mrfApproval[i].mrfRequestID.reportingManager = await SuperAdmin.findById(mrfApproval[i].mrfRequestID.reportingManager).lean()
            }else{
                mrfApproval[i].mrfRequestID.reportingManager = result
            }
            mrfApproval[i].mrfRequestID.designation.positionID = await ApprovalMatrix.findById(mrfApproval[i].mrfRequestID.designation.positionID).lean()
            // console.log(mrfApproval[i].mrfRequestID.designation.positionID)
            console.log(mrfApproval[i].mrfRequestID.reportingManager)
            for(var j in mrfApproval[i].Approvers){
                mrfApproval[i].Approvers[j]._id = await User.findById(mrfApproval[i].Approvers[j]._id).lean()
            }
        }

        res.send(mrfApproval)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})


module.exports = router