const express = require('express')
const mongoose = require('mongoose')
const app = express()
// const swaggerJSDocs = require('swagger-jsdoc')
// const swaggerUI = require('swagger-ui-express')
// const swaggerOption = {
//     swaggerDefinition : {
//         info : {
//             title : "crm1728",
//             description : "Customer relationship management system",
//             contact : {
//                 name : "Sankalp Gupta"
//             },
//             server : ["http://localhost:2233/"]
//         }
//     },
//     apis : ["./routes/*.js","index.js"]
// };

// const swaggerDocs = swaggerJSDocs(swaggerOption)
// app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.use(express.json())

port = 2233||process.env.port

const url = "mongodb+srv://sankalp1728:Sankalp%231728@cluster0.uqisn.mongodb.net/next?retryWrites=true&w=majority"

/**
 * @swagger
 * definitions : 
 *      
 */

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

app.listen(port,()=>{
    console.log(`server has been connected to port ${port}` )
})