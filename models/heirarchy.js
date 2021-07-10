const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const { validate } = require('./User')

const hierSchema = new Schema({
    
    type : {
        type : String,
        required : true,

        validate(value){
            if(value != "Department" && value != "Sub-Department" && value != "Team"){
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
        default : null,
    }
        // management in case of department entry
        // sub dep : dep name
        // team : sub-dep name
    })


const hierModel = mongoose.model("hierarchy",hierSchema)

module.exports = hierModel