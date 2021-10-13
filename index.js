const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const swaggerJSDocs = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const cors = require("cors")
const PushNotifications = require('@pusher/push-notifications-server');
const hierarchyRouter = require('./routes/hierarchy')
const user = require('./routes/user')
const login = require('./routes/login')
const branch = require("./routes/branch")
const userAccess = require("./routes/userAccess")
const settings = require("./routes/settings")
const devAccess = require("./routes/devAccess")
const company = require("./routes/company")
const approvalMatrix = require("./routes/approvalMatrix")
const mrfRequest = require("./routes/mrfRequest")
const mrfApproval = require("./routes/mrfApproval")
const candidateDetails = require("./routes/candidateDetails")
const recruiter = require("./routes/recruiter")
const userProfile = require("./routes/userProfile")
const mrfDist = require("./routes/mrfDist")

//notification declared
let beamsClient = new PushNotifications({
    instanceId : "b24879e8-5451-46e8-b512-e667ccc1a0e1",
    secretKey: "4C501B1EA5F7801417598D08865E887FFC89F82C64735CD191ECB2DD5C56096A"
  });




const options = {
    definition : {
        openapi : '3.0.0',
        info : {
            title : 'Next CRM',
            version : '1.0.0',
            description : "This is the REST API for the project :- NEXT",
            contact : {
                name : "Shekhar"
            }
        },
    },
    servers : ['http://localhost:2233'],
    apis : ['index.js', './routes/*.js']
}

const swaggerDocs = swaggerJSDocs(options)


const app = express()

app.use(express.json())
app.use(cors())

//pasport initialization
//passport config
require("./authentication/Passport")(passport)


app.use(passport.initialize())
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))
app.use('/',login)
app.use('/',recruiter)
app.use("/",settings)
app.use('/',user)
app.use('/',userProfile)
app.use('/',branch)
app.use('/',userAccess)
app.use('/',devAccess)
app.use('/',approvalMatrix)
app.use('/',mrfRequest)
app.use('/',mrfApproval)
app.use('/', mrfDist)
app.use('/',candidateDetails)
app.use('/',company)




port = process.env.PORT || 2233

const url = "mongodb+srv://sankalp1728:Sankalp%231728@cluster0.uqisn.mongodb.net/next?retryWrites=true&w=majority"


app.get('/', (req,res)=>{
    try{
        
        console.log("this is a try statement")
        res.send("success")
    }catch(err){
        console.log("there is no error")
        res.send(err)
    }
})

mongoose.connect(url,{useNewUrlParser : true, useUnifiedTopology: true,useFindAndModify:false}).then(()=>{
    console.log(`the mongoose server has established the connection`)
})


app.use(hierarchyRouter)

app.listen(port,()=>{
    console.log(`server has been connected to port ${port}` )
})

