const Recruiter = require("../models/recruiter")
const Mrf = require("../models/mrf")
const User = require("../models/User")
const SuperAdmin = require("../models/superAdmin")
const Hierarchy = require("../models/")
const UserRole = require("../models/UserProfiles")
const Recruiter = require("../models/recruiter")
const Approval = require("../models/approval")
const MrfApproval = require("../models/mrfApproval")
const Settings = require("../models/settings")
const MrfRequest = require("../models/mrfRequest")

const distribution = async(req, settings,mrfRequestID)=>{
    // search for admin
    // first in superAdmin collection

    var admin = await SuperAdmin.findOne({userRole : "Super-Admin"})
    if(!admin){
        admin = await User.findOne({userRole : "Super-Admin"})
    }
    const mrfAprroval = MrfApproval.findOne({mrfRequestID : mrfRequest})
    const mrfRequest = await MrfRequest.findById(mrfRequestID).lean()
    const hierarchy = await Hierarchy.findById(mrfRequest.hierarchyID).lean()

    // fetch the hierarchy of the mrfRequest so that the departments of the recruiters can be looked at

    if(hierarchy.type === "Sub-Department"){
        hierarchy = await Hierarchy.findOne({name : hierarchy.parent})
    }
    if(hierarchy.type === "Team"){
        hierarchy = await Hierarchy.findOne({name : hierarchy.parent})
        hierarchy = await Hierarchy.findOne({name : hierarchy.parent})
    }

    // check if settings says odd-even or department wise

    // get all the recuiters if odd-even
    if(settings.distribution === "odd-even"){
        var recruiters = await Rectruiter.find().lean().sort({"_id":1})
    }

    if(settings.distribution === "department"){
        var recruiters = await Recruiter.find().lean().sort({"_id":1})

        recruiters = recruiters.filter(data =>{
            if(data.departments.includes(hierarchy._id)){
                return data
            }
        })
    }

    const settings = await Settings.find().lean()[0]
    var index = settings.lastRecruiterID
    if(settings.length === 0){
        index = recruiter[0]._id;
    }


    console.log(settings)
    console.log(recruiters.length)

    var mrf = []
    var mrfDistribution = {
        userID : admin._id,
        mrfRequestID : mrfRequest._id,
        isActive : false,
        mrf : []
    }

    if(req < recruiters.length){
        
        
        for(let i = index ; i< (req + index) ; i++){
            
            const mrfi = new Mrf({
                mrfRequestID : mrfRequest,
                mrfApprovalID : MrfApproval._id,
                mrfDistributorID : admin._id,
                rectruiterID : recruiters[i]._id
            })

            mrf.push({
                _id : mrfi._id,
                recruiterID : recruiters[i]._id
            })


        }
        
    }


}