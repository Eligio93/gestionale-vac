const express = require('express');
const router = express.Router();
const Hospital = require ('../schemas/Hospital')

router.post('/newHospital',async(req,res,next)=>{
    const hospitalName = req.body.name.toUpperCase();
    const hospitalCity = req.body.city.toUpperCase();

    const existingHospital = await Hospital.findOne({name:hospitalName, city: hospitalCity})
    console.log(existingHospital)
    if(existingHospital){
        return res.status(400).json({message:"L' ospedale e gia stato inserito"})
    }
    try{
        const hospital = new Hospital({
            name:hospitalName,
            city:hospitalCity
        })
        await hospital.save()
        return res.json({message:'Ospedale inserito correttamente'})
    }catch(err){
        return res.status(500).json({err})
    }
})

module.exports = router