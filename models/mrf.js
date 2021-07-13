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
    mrfDistID : {
        type : String,
        required : true
    },
    candidateID : {
        type : String,
        required : false
    }

});
// Compile model from schema
var mrfModel = mongoose.model('mrf', mrfSchema );
module.exports = mrfModel