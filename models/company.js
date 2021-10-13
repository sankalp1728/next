const mongoose = require("mongoose")
const Schema = mongoose.Schema

const companySchema = new Schema({
    name : {
        type : String,
        required: true
    },
})

const companyModel = mongoose.model("company", companySchema)
module.exports = companyModel
