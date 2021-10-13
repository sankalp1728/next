const CandidateEducation  = require("../models/candidateEducation")
const express = require("express")
const { request } = require("express")
const Router = express.Router()




Router.get("/candidateeducation/:id", async(req,res)=> {
    try{
        if(request.params.id == null){
            return res.send({
                error : "There is no ID parameter in parameters of the request url"
            }) 
        }

        candidateEduction = await CandidateEducation.find()

    }catch(err){
        console.log(err)
        res.send(err)
    }
})