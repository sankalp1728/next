// mrf_id , status - approver names with boolean
// this schema is for tracking the approval of each and every mrf
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MRFApprovalSchema = new Schema({
    mrfRequestID : {
        type : String,
        required : true
    },
    TAT : {
        type : Number,
        required : true
    },
    Approvers : [{
        _id : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true
        }

    }]
},
{ timestamps: true }
)