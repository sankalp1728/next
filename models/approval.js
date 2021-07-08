const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var approvalSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true,
        enum : ['Approval Matrix']     //apporvalMatrix, candidate-mrf Mismatch approval, Bussiness, BCG, interview
    }, 
    documentId : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        required : true,
        enum : ["None","Accept","Reject"]
    },
    remarks : {
        type : String,
        required : false
    }

});

//Export the model
module.exports = mongoose.model('Approvals', approvalSchema);