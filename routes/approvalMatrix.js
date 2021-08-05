const mongoose = require("mongoose")
const express = require("express")
const passport = require("passport")
const helper = require("../middleware/Access_check")
const ApprovalMatrix = require("../models/approvalMatrix")
const Hierarchy = require("../models/heirarchy")
const Branch = require("../models/branch")
const User = require("../models/User")
const router = express.Router()



router.get("/approvalmatrix",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"updateApprovalMatrix")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        const approvalMatrix = await ApprovalMatrix.find(req.params).lean();
        for(var i in approvalMatrix){
            element = approvalMatrix[i];
            element.hierarchyID = await Hierarchy.findById(element.hierarchyID);
            console.log(i, element.hierarchyID)
            element.branchID = await Branch.findById(element.branchID);
            // console.log(element.approversID) 
            for(j = 0 ; j < element.approversID.length ; j++){
                element2 = element.approversID[j];
                // console.log(element2)
                element2._id = await User.findById(element2).select('_id name email')
            }
        }

        // console.log(approvalMatrix)
        res.send(approvalMatrix)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.post("/approvalmatrix",passport.authenticate("jwt", {session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"addApprovalMatrix")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }
        console.log(typeof req.body.hierarchyID)
        req.body.verified = true;
        const hierarchy = await Hierarchy.findById(req.body.hierarchyID)
        console.log(hierarchy)
        if(!hierarchy){
            throw new Error("The hierarchy_id is incorrect")
        }

        // check duplicated

        const approval = new ApprovalMatrix(req.body)
        if(!approval.approversID.length === new Set(approval.approversID).size){
            res.status(401).send("there are duplicates in approvers")
        }

        //  check if the user are legit 

        for(i = 0 ; i<approval.approversID.length ; i++){
            if(!await User.findById(approval.approversID[i]._id)){
                return res.status(400).send("The ID on index " + i + " does not exist in the Database")
            }
        }



        
        await approval.save()
        res.send({
            success : true
        })
    }catch(err){
        console.log(err)
        res.send(err)
    }
    
})

router.patch("/approvalmatrix",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"updateApprovalMatrix")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }
        const hierarchy = await Hierarchy.findById(req.body.hierarchyID)
        if(!hierarchy){
            throw new Error("The hierarchy_id is incorrect")
        }
        for(i = 0 ; i<req.body.approversID.length ; i++){
            if(!await User.findById(req.body.approversID[i])){
                return res.status(400).send("The ID on index " + i + ".")
            }
        }
        const approval = await ApprovalMatrix.findOneAndUpdate({_id : req.body._id},req.body)
        res.send(approval)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.delete("/approvalmatrix",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"deleteApprovalMatrix")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }
        const approval = await ApprovalMatrix.findOneAndDelete({_id : req.body._id})
        res.json({
            success : true
        })
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.post("/approvalmatrix/request",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"requestApprovalMatrix")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }
        req.body.verified = false;
        const hierarchy = await Hierarchy.findById(req.body.hierarchy)
        if(!hierarchy){
            throw new Error("The hierarchy_id is incorrect")
        }
        const approval = new ApprovalMatrix(req.body)
        await approval.save()
        res.send(approval)

    }catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router