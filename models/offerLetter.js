const mongoose = require('mongoose')
const Schema = mongoose.Schema

// it will be act as bridge between the candidates and users and to traverse the data through microservices for dashboard representation
const OfferSchema = new Schema({

    CandidateID : [{
        type : String,
        required : true
    }],
    OfferListId : {
        type : id
    }
})

const BCGModel = mongoose.model('OfferSchema', BCGSchema)
module.exports = BCGModel