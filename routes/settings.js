const express = require("express")
const Settings = require("../models/settings")
const router = express.Router()

router.get("/settings",async(req,res)=>{
    try{
        const settings = await Settings.find().lean()
        console.log(settings[0])
        res.send(settings[0])
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.post("/settings",async(req,res)=>{
    try{    
        var settings = await Settings.find()
        if(settings.length === 0){
            settings = new Settings({
                distribution : req.body.distribution
            })
            await settings.save()
            return res.json({
                Success : true
            })
        }

        settings[0].distribution = req.body.distribution
        settings[0].save()
        res.json({
            Success : true
        })
        
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router