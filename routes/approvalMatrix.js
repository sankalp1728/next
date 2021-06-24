const mongoose = require("mongoose")
const express = require("express")
const passport = require("passport")
const helper = require("../middleware/Access_check")
const approvalMatrix = require("../models/approvalMatrix")
const ApprovalM
const router = express.Router()

router.post("/approval/add",async(req,res)=>{
    const approval = new approvalMatrix(req.body)
    
})