const { Router } = require("express")
const express = require("express")
const mongoose = require("mongoose")
const Branch = require("../models/branch")
const Access_Check = require("../middleware/Access_check")
const router = express.Router()

router.post("/branch/add",async(req,res)=>{
    try{
        if(!Access_Check(req.user,"addBranch")){
            throw new Error("Insufficient Access")
        }
        const branch = new Branch(req.body)
        await branch.save()
        res.send(branch);
    }catch(err){
        console.log(err)
        res.json(err)
    }
})

module.exports = router