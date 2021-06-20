const express = require("express")
const mongoose = require("mongoose")
const Branch = require("../models/branch")
const Access_Check = require("../middleware/Access_check")
const passport = require("passport")
const router = express.Router()

// router.post("/branch/add",passport.autheticate("jwt",{session : false}),async(req,res)=>{
//     try{
//         if(!Access_Check(req.user,"addBranch")){
//             throw new Error("Insufficient Access")
//         }
//         const branch = new Branch(req.body)
//         await branch.save()
//         res.send(branch);
//     }catch(err){
//         console.log(err)
//         res.json(err)
//     }
// })


// router.post("/branch/search",passport.autheticate("jwt",{session : false}),async(req,res)=>{
//     try{
//         if(!Access_Check(req.user,"searchBranch")){
//             throw new Error("Insufficient Access")
//         }
//         const branch = Branch.find(req.body)
//         res.send(branch)
//     }catch(err){
//         console.logg(err);
//         res.send(err)
//     }
// })



// router.post("/branch/remove",passport.authenticate("jwt",{session : false}),async(req,res)=>{
//    try{
//        if(!Access_Check(req.user,"removeBranch")){
//            throw new Error("Insufficient Access")
//        }

//        const branch = Branch.findOneAndDelete(req.body)
//        res.send(branch)
//    }catch(err){
//        console.log(err)
//        res.send(err)
//    }
// })

module.exports = router