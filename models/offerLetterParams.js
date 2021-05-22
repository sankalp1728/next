const mongoose = require('mongoose')
const Schema = mongoose.Schema

// parameter to use to build the template
const OfferParamsSchema = new Schema({

    Jobdescription : {
        type:String
    },
    Jobtitle : {
        type: String
    },
    StartingDate : {
        type : String
    },
    Salary : {
        type: String    // break up matrix 
    }
})

const BCGModel = mongoose.model('OfferSchema', BCGSchema)
module.exports = BCGModel

