const mongoose = require("mongoose")
const {isValidPhone} = require("valid-phone-number")
const Schema = mongoose.Schema

const candidateDetailsSchema = new Schema({

    name : {
        type : String,
        required : true
    },


    photo : {
        type : String,
        required : true
    },

    phone : [{
        type: String,
        validate: {
          validator: function(v) {
            return isValidPhone(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      }],
    // validate check

    social : {
        skype : {
            type : String,
            required : false
        },
        linkedIn : {
            type : String,
            required : false
        }
    },


    email : {
        type : String
    }, // used as primary

    address : {
        current : {
            street : {
                type : String,
                required : false
            },
            city : {
                type : String,
                required : false
            },
            state : {
                type : String,
                required : false
            },
            landmark : {
                type : String,
                required : true
            },
            pincode : {
                type : String,
                required: function() {
                    return this.pincode.length === 6
                }
            }
        },
        permanent : {
            street : {
                type : String,
                required : false
            },
            city : {
                type : String,
                required : false
            },
            state : {
                type : String,
                required : false
            },
            landmark : {
                type : String,
                required : true
            },
            pincode : {
                type : String,
                required: function() {
                    return this.pincode.length === 6
                }
            }
        }
    },
    

    dob : {
        type : Date,
        required : true
    },

    pid : {
        pan : {
            type : String,
            required : true
        },
        aadhar : {
            type : String,
            required : true
        }
    },

    fatherName : {
        type : String,
        required :true
    },

    gender : {
        type : String,
        required : true,
        enum : ["male", "female", "non-binary"]
    },

    differentlyAbled  : {
        type : Boolean,
        required : true
    },

    highest_edu : {
        type : String,
        required : true

        //10,12,G,PG,anythings else, others etc
    },

    certifications : [{
        type : String,
        required : false
    }],

    ComputerProficiency : {
        type : Boolean,
        required : true
    },

    
    employement : {
        total_experience : {
            type : Number,
            required : true
        },
        
        relevant_experience : {
            type : Number,
            required  : true
        },
        
        age : {
            type : Number,
            required : true
        }
    },
    
    educationHistory : [{
        
        school : {
            type : String,
            required : false
        },
        degree  : { 
            type : String,
            required : false
        },
        specialization : { 
            type : String,
            required : false
        },
        startDate : { 
            type : Date,
            required :                                                                                                                                                                                                     true
        },
        endDate : { 
            type : Date,
            required : false
        },
        grade : {
            type : mongoose.Decimal128,
            required : false
        },
        description : {
            type : String,
            required : false
        }
    }],
    
    employementHistory : [{
        
        position : {
            type : String,
            required : false
        },
        employementType : {
            type : String,
            required : false,
            enum : ['Internship','Full-Time','Temporary']
        },
        companyName : {
            type : String,
            required: false
        },
        location : {
            type : String,
            required : false
        },
        startDate : {
            type : Date,
            required: false
        },
        endDate : {
            type : Date,
            required: false
        },
        skills : [String]
    }],

    sourceID : {
        type : String,
        required : false
    }, // userID

    mrfID : {
        type : String,
        required: false
    },
    
    remarks : {
        type : String,
        required : false
    }
})

const candidateDetailsModel = mongoose.model("candidateDetails", candidateDetailsSchema)
module.exports = candidateDetailsModel