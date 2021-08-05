const Recruiter = require("../models/recruiter")
const Mrf = require("../models/mrf")
const User = require("../models/User")
const SuperAdmin = require("../models/superAdmin")
const UserRole = require("../models/UserProfiles")
const recruiter = require("../models/recruiter")

const distribution = async(req, settings,approvalID)=>{
    // search for admin
    // first in superAdmin collection

    var admin = await SuperAdmin.findOne({userRole : "Super-Admin"})
    if(!admin){
        admin = await User.findOne({userRole : "Super-Admin"})
    }

    // check if settings says odd-even or department wise

    // get all the recuiters if odd-even
    if(settings.distribution === "odd-even"){
        var recruiters = await Rectruiter.find().lean()
    }

    if(settings.distribution === "department"){
        var recruiter = await Recruiter.find().lean()

        for(var i in recruiter){
            
        }

    }

    for(var i = 0 ; i< req; i++){
        var mrf = new Mrf({

        })
    }
}