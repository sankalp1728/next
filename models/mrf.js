const mongoose = require("mongoose")
var Schema = mongoose.Schema;

var mrfSchema = new Schema({
    mrfRequestID : {
        type : String,
        required : true
    },
    mrfApprovalID : {
        type : String,
        required : true
    },
    mrfDistributorID : {
        type : String,
        required : true
    },

    sourceID : [{
        userID : {
            type : String,
            required : false
        }
    }],

    recruiterID : {
        type : String,
        requried : true
    },
    candidates : [{
        _id : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true
        }   
    }]
    

});
// Compile model from schema
var mrfModel = mongoose.model('mrf', mrfSchema );
module.exports = mrfModel