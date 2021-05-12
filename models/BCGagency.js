const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BCGSchema = new Schema({
    UserID : {
        type : String,
        required : true
    },

    CandidateID : [{
        type : String,
        required : true
    }]    
})

const BCGModel = mongoose.model('BCGagency', BCGSchema)
module.exports = BCGModel