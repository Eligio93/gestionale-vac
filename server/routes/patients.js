const express = require('express');
const router = express.Router();
const Patient = require('../schemas/Patient')

//GET ALL PATIENTS
router.get('/', async (req, res, next) => {
    const patients = await Patient.find({})
        .populate({
            path: 'therapies',
            populate: {
                path: 'machine',
                model: 'Machine'
            }
        });
    return res.json({ patients })
})



//ADD NEW PATIENT
router.post('/newPatient', async (req, res, next) => {
    //Check if the patient is already in the system
    const existingPatient = await Patient.findOne({
        name: req.body.name.toUpperCase(),
        lastName: req.body.lastName.toUpperCase(),
        city: req.body.city.toUpperCase(),
        phone: req.body.phone
    })
    //If it s in the system return error message
    if (existingPatient) {
        return res.status(400).json({ message: "Il paziente e' gia' stato inserito" })
    }
    try {
        const patient = new Patient({
            name: req.body.name.toUpperCase(),
            lastName: req.body.lastName.toUpperCase(),
            phone: req.body.phone,
            city: req.body.city.toUpperCase(),
            inTherapy: false
        })
        await patient.save()
        return res.json({ message: 'Paziente Creato Correttamente' })
    } catch (err) {
        return res.status(500).json({ err })
    }
})

module.exports = router
