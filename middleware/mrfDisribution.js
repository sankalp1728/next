const Recruiter = require("../models/recruiter")
const Mrf = require("../models/mrf")
const User = require("../models/User")
const SuperAdmin = require("../models/superAdmin")
const Hierarchy = require("../models/heirarchy")
const UserRole = require("../models/UserProfiles")
const MrfDistribution = require("../models/mrfDistribution")
const Approval = require("../models/approval")
const MrfApproval = require("../models/mrfApproval")
const Settings = require("../models/settings")
const MrfRequest = require("../models/mrfRequest")

const distribution = async(req, mrfRequestID)=>{
    // search for admin
    // first in superAdmin collection
    try{
        var admin = await SuperAdmin.findOne({userType : "Super-Admin"})
        if(!admin){
            admin = await User.findOne({userRole : "Super-Admin"})
        }
        const mrfApproval = await MrfApproval.findOne({mrfRequestID : mrfRequestID})
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
        const settings = await Settings.find()

        // get all the recuiters if odd-even
        if(settings[0].distribution === "odd-even"){
            var recruiters = await Recruiter.find().sort({"_id":1})
        }

        if(settings[0].distribution === "department"){
            var recruiters = await Recruiter.find().sort({"_id":1})

            recruiters = recruiters.filter(data =>{
                if(data.departments.includes(hierarchy._id)){
                    return data
                }
            })
        }

        var index = 0;

        for(var x in recruiters){
            if(settings[0].lastRecruiterID === recruiters[x]._id){
                index = x
            }
        }


        console.log(settings)
        console.log(recruiters.length)

        var mrf = []
        var mrfDistribution = new MrfDistribution({
            userID : admin._id,
            mrfRequestID : mrfRequest._id,
            isActive : false,
            mrf : []
        })

        console.log(recruiters)
        console.log(index)
            
        for(var i = index ; i< (req + index) ; i++){
            

            // mrf entry
            const mrfi = new Mrf({
                mrfRequestID : mrfRequest._id,
                mrfApprovalID : mrfApproval._id,
                mrfDistributorID : admin._id,
                rectruiterID : recruiters[i%recruiters.length]._id
            })

            mrf.push(mrfi)

            console.log(i, mrfi)

            // distribution entry
            const distEntry = {
                _id : mrfi._id,
                recruiterID : recruiters[i%recruiters.length]._id
            }

            mrfDistribution.mrf.push(distEntry)

            // recruiter entry

            recruiters[i].mrfAssigned.push({
                _id : mrfi._id,
                isActive : true
            })
            await recruiters[i].save()

            // index conditions
            if(req%recruiters.length == 0){
                // no change
            }else{
                settings.lastRecruiterID = i%recruiters.length
                await settings.save()
            }
            
        }

        const mrfResult = await Mrf.insertMany(mrf)
        await mrfDistribution.save()
    }catch(err){
        console.log(err)
        return err
    }
    
}

module.exports = {
    distribution
}