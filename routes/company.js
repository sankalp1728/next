const express = require("express")
const router = express.Router()
const passport = require("passport")
const Company = require("../models/company")

router.get("/company", passport.authenticate("jwt", {session:false}),async(req,res)=>{
    try{
        const companies = await Company.find().lean()
        return res.status(200).send(companies)
    }catch(err){
        console.log(err)
        return res.send(err)
    }
})

router.post("/company",passport.authenticate("jwt", {session : false}),(req,res)=>{
    try{
        const company = new Company(req.body)
        company.save()
        res.send({
            "success" : "saved"
        })
    }catch(err){
        res.send(err)
        console.log(err)
    }
})

router.put("/company", passport.authenticate("jwt", {session : false}), async(req,res)=>{
    try{
        var company = await Company.findByIdAndUpdate(req.body.id, {name : req.body.name})
        company = await Company.findById(req.body.id).lean()
        res.send(company)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router