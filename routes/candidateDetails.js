const express = require("express")
const router = express.Router()
const CandidateDetails = require("../models/candidateDetails")
const passport = require('passport')

router.get("/candidates/:id",passport.authenticate("jwt", {session:false}), async(req,res)=>{
    try{
        console.log(typeof request.params.id)
        if(req.params.id === null){
            candidates = CandidateDetails.find().lean()
            return res.send({
                message : " trying to work"
            })
        }else{
            res.send({
                error : "apparently didn't work"
            })
        }
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router