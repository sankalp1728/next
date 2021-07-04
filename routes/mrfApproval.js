const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const helper = require("../middleware/Access_check")

const mrfApproval = require("../models/mrfApproval")

const router = express.Router()

router.get("/approval",passport.authenticate("jwt",{session : false}),async(req,res)=>{
    try{
        const approval
    }catch(err){
        console.log(err)
        res.send(err)
    }
})
