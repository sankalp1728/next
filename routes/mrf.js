const exrpess = require("express")
const mongoose = require("mongoose")
const Mrf = require("../models/mrf")
const passport = require("passport")
const helper = require("../middleware/Access_check")

const router = express.Router()

router.get("/mrf",passport.authenticate("jwt",{session : false}),async(req,res)=>{
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

router.post("/mrf",passport.authentication("jwt",{session:false}),async(req,res)=>{
    try{
        if(!await helper.Access_Check(req.user,"addMrf")){
            return res.status(401).json({
                Access : "Insufficient"
            })
        }

        
    }
})