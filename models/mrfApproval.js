// mrf_id , status - approver names with boolean
// this schema is for tracking the approval of each and every mrf
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MRFApprovalSchema = new Schema({
    mrfRequestID : {
        type : String,
        required : true
    },
    
    tat : {
        type : Number,
        required : true
    },

    isActive : {
        type : Boolean,
        required : true,
        default : true
    },

    Approvers : [{
        _id : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true,
            enum : ['None','Accept','Reject']
        }

    }]
},
{ timestamps: true }
)

const mrfApprovalModel = mongoose.model("mrfApproval",MRFApprovalSchema)
module.exports = mrfApprovalModel