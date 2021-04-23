const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const swaggerJSDocs = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const hierarchyRouter = require('./routes/hierarchy')



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

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))
app.use(express.json())
app.use(passport.initialize())





port = 2233||process.env.port

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

mongoose.connect(url,{useNewUrlParser : true, useUnifiedTopology: true}).then(()=>{
    console.log(`the mongoose server has established the connection`)
})

app.use(hierarchyRouter)

app.listen(port,()=>{
    console.log(`server has been connected to port ${port}` )
})