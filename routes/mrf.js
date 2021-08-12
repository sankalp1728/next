const express = require("express")
const router = express.Router()
const Mrf = require("../models/mrf")
const MrfDistribution = require("../models/mrfDistribution")
const SuperAdmin = require("../models/superAdmin")
const Approval = require("../models/approval")
const Settings = require("../models/settings")
const Hierarchy = require("../models/heirarchy")
const User = require("../models/User")
const ApprovalMatrix = require("../models/approvalMatrix")
const Distributor = require("../middleware/mrfDisribution")
const MrfApproval = require("../models/mrfApproval")
const MrfRequest = require("../models/mrfRequest")
const passport = require("passport")

router.get("/mrf", passport.authenticate("jwt", {session : false}),async(req,res)=>{
    try{
        // access check pending

        if(req.Role !== "Super-Admin" || req.Role !== "admin"){
            
        }
        
    }catch(err){

    }
})