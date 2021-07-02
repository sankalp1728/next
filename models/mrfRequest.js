const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mrfSchema = new Schema({
    designation : {
        positionID : {
            type : String,
            required : true
        },

        position_type : {
            type : String,
            required : true
        }, // replacement/new

        replacement_id : {
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

    reporting_manager : {
        type : String,
        required : true
    }, // the one who created the mrf

    department_head : {
        type : String,
        required : true
    },  // any user with hierarchy department, from the department of the mrf creator
    // NOT FRONT-END

    sub_dep_head : {
        type : String,
        required : true
    }, // any user with gierarchy sub-department, from the sub department of the mrf creator
    // NOT FRONT-END
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
        required : true
    },
    
    specification : {
        age : {
            type : Number,
            required : false
        },
        rel_exp : {
            type : Number,
            required : False
        },
        total_exp : {
            type : Number,
            required : False
        },
        education : {
            type : String,
            required : true
        }
    },

    diversity : {
        type : String,
        required : false
    },

    //females, physically/visuall handicaped

    start_date : {
        type : Date,
        required : true
    }, // approval date

    //company will define TAT(unique for each mrf)
    //company will decide  TAT or end date
    end_date : {
        type : Date,
        required : true
    }, // end date bulk mrf changes, and TAT separate



    job_type : {
        type : String, 
        required : true,
        enum : ["Part-Time", "Permanent", "Internship"]
    }, // time frame for contractual and internship -- scehma addition

    status : {
        type : String,
        required : true,

        validate(value){
            const arr = ["unapproved","rejected" , "open" , "closed", "overdue"]
        }
    },

    remarks : {
        type : String,
        required : true
    } // 
    
})

// every mrf will be shared with each HR recruiters
// HR task assignment 1. manually 2. Automated 2.1. odd even 2.2. department-vise 2.3. skill-based
// dynamically change the database schema...(calculation of development efforts)