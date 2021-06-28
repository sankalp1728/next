const exrpess = require("express")
const mongoose = require("mongoose")
const Mrf = require("../models/mrf")
const passport = require("passport")
const helper = require("../middleware/Access_check")

const router = express.Router()

router.get("/mrf",passport.authenticate("jwt",{session : true}),async(req,res)=>{
    try{
        
    }catch(err){

    }
})