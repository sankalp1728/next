const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const hierarchy = require('../models/heirarchy')
const Passport  = require('../authentication/Passport')
const Access_Check = require('../middleware/Access_check')



router.post('/hierarchy',async(req,res) => {
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

router.get("/hierarchy", async(req,res)=>{
    try{
        const search = req.body;
        const data = await hierarchy.find(req.params)
        console.log(data);
        res.send(data);
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.delete("/hierarchy", async(req,res) => {
    try{
        // type, name
        const entity = await hierarchy.findOne({name : req.body.name})
        if(!entity){
            throw new Error({
                success : false
            })
        }

        if(req.body.type === "Department"){
            var data = await hierarchy.find({parent : entity.name})
            for(i=0 ; i<data.length ; i++){
                console.log(data[i].name)
                const child = await hierarchy.deleteMany({parent : data[i].name})
            }
            data = await hierarchy.deleteMany({parent : entity.name})
        }

        if(req.body.type === "Sub-Department"){
            const data = await hierarchy.deleteMany({parent : entity.name})
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