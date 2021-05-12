const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SourcingSchema = new Schema({
    Name : {
        type : String,
        Required : true
    }, // for sourcing channel limitation eg-Campus, Job Portal, Recruitement Agency(under vendors)    
})

const SourcingModel = mongoose.model('SourcingChannel', SourcingSchema)
module.exports = SourcingModel