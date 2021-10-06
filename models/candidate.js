const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const candidateSchema = new Scehma({

    candidateDetailsID : {
        type : String,
        required : true
    }

})

const candidateModel = mongoose.model( "candidate", candidateSchema)
module.exports = candidateModel
// screening steps will be addded as per the approval requirements
// screening approvals will be in control of HR. Can skip bussiness people.