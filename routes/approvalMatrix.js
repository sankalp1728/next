const mongoose = require("mongoose")
const express = require("express")
const passport = require("passport")
const helper = require("../middleware/Access_check")
const ApprovalMatrix = require("../models/approvalMatrix")
const Hierarchy = require("../models/heirarchy")
const User = require("../models/User")
const router = express.Router()

router.get("/approvalmatrix",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"updateApprovalMatrix")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        const approvalMatrix = ApprovalMatrix.find();
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
        req.body.verified = true;
        const hierarchy = await Hierarchy.findById(req.body.hierarchyID)
        if(!hierarchy){
            throw new Error("The hierarchy_id is incorrect")
        }
        const approval = new ApprovalMatrix(req.body)
        for(i = 0 ; i<approval.approversID.length ; i++){
            if(!await User.findById(approval.approversID[i]._id)){
                return res.status(400).send("The ID on index " + i + " does not exist in the Database")
            }
        }
        await approval.save()
        res.send(approval)
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
        res.send(approval)
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