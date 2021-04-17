const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const herSchema = Schema({
    
    type : {
        type : String,
        required : true,

        validate(value){
            if(value != "Department" || value != "Sub-Dep" || value != "Team"){
                throw new Error("The type selected is incorrect")
            }
        }
    },
    name : {
        type : String,
        required : true,
        unique : true
    },
    parent : {
        type : String,
        required : true
        // management in case of department entry
        // sub dep : dep name
        // team : sub-dep name
    }
})


const herModel = mongoose.model("hierarchy",herSchema)

module.exports = herModel