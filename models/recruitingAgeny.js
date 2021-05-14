const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AgencySchema = Schema({
    UserID : {
        type : String,
        required : true
    },
    MRF : [{
        ID : {
            type : String,
            required : true
        },
        Requirement : {
            type : Number,
            required : true
        }
    }],

    Candidates : [{
        ID : {
            type : String,
            required : true
        },
        DateOfAdd : {
            type : Date,
            required : true
        }
    }]

})
    


