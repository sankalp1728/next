const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var approvalSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true      //apporvalMatrix, candidate-mrf Mismatch approval, Bussiness, BCG, interview
    },
    status : {
        type : Boolean,
        required : true
    },
    remarks : {
        type : String,
        required : true
    }

});

//Export the model
module.exports = mongoose.model('User', approvalSchema);