const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const hierarchy = require('../models/heirarchy')
const passport  = require('../authentication/Passport')



router.post('/hierarchy/add',async(req,res) => {
    try{

        // if(req.user.userType !== "admin"){
        //     return res.send({
        //         user : "not permitted"
        //     })
        // }

        const entity = new hierarchy(req.body)
        await entity.save()
        console.log(entity)
        res.json({
            success : true
        })

    }catch(err){
        console.log(err);
        res.send(err)
    }
})

router.post("/heirarchy/show", async(req,res)=>{
    try{
        const type = req.body.type;
        const data = await (await hierarchy.find({hier_type : type}))
        res.json(data)
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.post("/hierarchy/remove", async(req,res) => {
    try{
        // type, name
        const entity = await hierarchy.findOne({name : req.body.name})
        if(!entity){
            throw new Error({
                success : false
            })
        }

        if(req.body.type === "Department"){
            const data = await hierarchy.find({parent : entity.name})
            for(i=0 ; i<data.length ; i++){
                const child = await hierarchy.deleteMany({parent : data.name})
            }
        }

        if(req.body.type === "Sub-Dep"){
            const data = await hierarchy.delete({parent : entity.name})
        }

        await hierarchy.deleteOne({name : entity.name})
        console.log("document deleted")
        res.json({
            success : true
        })
        
    }catch(err){
        console.log(err);
        res.send(err)
    }
})

module.exports = router