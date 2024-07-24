const express = require('express');
const router = express.Router();
const Patient = require('../schemas/Patient')

//GET ALL PATIENTS
router.get('/',async (req,res,next)=>{
    const patients = await Patient.find({});
    return res.json({patients})
})



//ADD NEW PATIENT
router.post('/newPatient',async(req,res,next)=>{
    const existingPatient = await Patient.findOne({
        name:req.body.name.toUpperCase(), 
        lastName:req.body.lastName.toUpperCase(),
        city:req.body.city.toUpperCase(),
    })
    if(existingPatient){
        return res.status(400).json({message:"Il paziente e' gia' stato inserito"})
    }
    try{
        const patient = new Patient({
            name:req.body.name.toUpperCase(),
            lastName:req.body.lastName.toUpperCase(),
            phone:req.body.phone,
            city:req.body.city.toUpperCase()
        })
        await patient.save()
        return res.json({message:'Paziente Creato Correttamente'})

    }catch(err){
       return res.status(500).json({err})
    }
    
})

module.exports = router
