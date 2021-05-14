const Scehma = mongoose.Schema

const ProfileSchema =  new mongoose.Schema({
    Role : {
        type : String,
        required : true
    }, // name of role

    Access : {
        CreateUser : {
            type : Boolean,
            required : true
        },

        ASSIGN AUTHENTICATION TO USERS : {
            type : Boolean,
            required : true
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