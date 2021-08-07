var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var mrfDistSchema = new Schema({
    userID : {
        type : String,
        required : true
    }, // Id of the person who is distributing the documents
    
    mrfRequestID : {
        type : String,
        required : true
    },

    isActive : {
        type : Boolean,
        required: true,
        default : false
    },

    mrf : [{
    
        "_id" : {
            type : String,
            required : true
        },
        "recruiterID" : {
            type : String,
            required : true
        }
        
    }]
});
// Compile model from schema
var mrfDistModel = mongoose.model('mrfDist', mrfDistSchema );
module.exports = mrfDistModel