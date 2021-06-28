const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const apporvalMatrixSchema = new Scehma({
    position : {
        type : String,
        Required : true
    },
    
    hierarchyID : {
        type : String,
        required : true
    }, // API 1

    branchID : {
        type : String,
        required : true
    },
    coolingPeriod : {
        type : Number,
        required  : true
    }, // Time after which you can apply
    verified : {
        type : Boolean,
        Required : true
    },
    tat : {
        type : Number,
        required : true
    },
    approversID : [{
        _id : {
            type : String,
            required : true
        }
    }]
})

const approvalMatrixModel = mongoose.model("approvalMatrix",apporvalMatrixSchema)
module.exports = approvalMatrixModel

// approver TAT redifining >> << Time pe notification, system, email