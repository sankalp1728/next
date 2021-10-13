const mongoose = require("mongoose")
const Schema = mongoose.Schema

const vendorSchema = new Schema({
    userID : {
        type : String,
        required : true
    },

    mrfID : [{type : mongoose.Types.ObjectId, required : false}]
})
