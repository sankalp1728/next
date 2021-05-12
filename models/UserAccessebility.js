const mongoose = require('mongoose')
const Scehma = mongoose.Schema

const AccessSchema =  new mongoose.Schema({
    userID : {
        type : String,
        requried : true
    },

    Access : {
        CreateUser : {
            type : Boolean,
            requried : true
        },

        ASSIGN AUTHENTICATION TO USERS : {
            type : Boolean,
            requried : true
        },

        CREATE MRF,
        APPROVE MRF,
        CANCEL MRF,
        EDIT MRF,
        ASSIGNMENT OF MRF TO HR,
        SHARE MRF WITH DIFFERENT SOURCING CHANNELS-REFERRALS, VENDORS, JOB PORTALS ETC,
        VENDOR ID CREATION,
        CAMPUS ID CREATION,
        CHANEL CREATION,
        ADD CANDIDATE,
        ATTACH TO MRF,
        SCREEN CANDIDATE,
        SCREENING REMARKS,
        LINE-UP CANDIDATE,
        LINE-UP REMARKS,
        INTERVIEW CANDIDATE,
        INTERVIEW REMARKS,
        INTERVIEW FEEDBACK/RESULT,
        DOCUMENTATION,
        OFFER LETTER GENERATION,
        CANDIDATE JOINING,


    }
})