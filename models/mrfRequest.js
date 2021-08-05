const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mrfRequestSchema = new Schema({
    designation : {
        positionID : {
            type : String,
            required : true
        },

        positionType : {
            type : String,
            required : true,
            enum : ['replacement','new']
        }, // replacement/new


        replacementID : {
            type : String,
            required : false
        }, // approval matrix diff for new and replacement positions, defined by the client
        
    },

    hierarchyID : {
        type : String,
        required : true
    },

    skillsRequired : [{
        type : String, 
    }],

    reportingManager : {
        type : String,
        required : true
    }, // the one who created the mrf

    departmentHead : {
        type : String,
        required : false
    },  // any user with hierarchy department, from the department of the mrf creator
    // NOT FRONT-END

    subDepHead : {
        type : String,
        required : false
    }, // any user with gierarchy sub-department, from the sub department of the mrf creator
    // NOT FRONT-END
    branchID : {
        type : String,
        required : true
    },

    candidates : {
        requirement : {
            type : Number,
            required : true
        },
        screening : {
            type : Number,
            required : true
        },
        businessEval : {
            type : Number,
            required : true
        },
        linedUp : {
            type : Number,
            required : true
        },
        interviewed : {
            type : Number,
            required : true
        },
        shortlisted : {
            type : Number,
            required : true
        },
        BCGVerified : {
            type : Number,
            required : true
        },
        hired : {
            type : Number,
            required : true
        }
    },

    location : {
        type : String,
        required : true
    },
    // Work From Home
    budget : {
        type : Number,
        required : true
    },

    jd_attachment : {
        type : String,
        required : false
    },
    
    specification : {
        age : {
            type : Number,
            required : true
        },
        relExp : {
            type : Number,
            required : true
        },
        totalExp : {
            type : Number,
            required : true
        },
        education : {
            type : String,
            required : true
        }
    },

    diversity : {
        type : String,
        required : true,
        enum : ['Physically Challenged', 'Visually Challenged','Women','General']
    },

    //females, physically/visuall handicaped

    startDate : {
        type : Date,
        required : true
    }, // approval date

    //company will define TAT(unique for each mrf)
    //company will decide  TAT or end date
    endDate : {
        type : Date,
        required : true
    }, // end date bulk mrf changes, and TAT separate



    jobType : {
        type : String, 
        required : true,
        enum : ["Part-Time", "Full-Time", "Internship"]
    }, // time frame for contractual and internship -- scehma addition

    status : {
        type : String,
        required : true,
        enum : ["unapproved","assignment","rejected" , "open" , "closed", "overdue"]
    },

    remarks : {
        type : String,
        required : false
    } // 
    
})

const mrfRequestModel = mongoose.model("mrfRequest", mrfRequestSchema)
module.exports = mrfRequestModel

// every mrf will be shared with each HR recruiters
// HR task assignment 1. manually 2. Automated 2.1. odd even 2.2. department-vise 2.3. skill-based
// dynamically change the database schema...(calculation of development efforts)