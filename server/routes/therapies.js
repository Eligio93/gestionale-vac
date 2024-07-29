const express = require('express');
const router = express.Router();
const Therapy = require('../schemas/Therapy')
const Patient = require('../schemas/Patient')
const Hospital = require('../schemas/Hospital')
const Machine = require('../schemas/Machine')

router.post('/newTherapy', async (req, res, next) => {
    const destination = req.body.destination
    const data = req.body.data
    console.log(destination)
    console.log(data)
    const therapyStartDate = new Date(data.therapyStartDate)
    const therapyEndDate = new Date(data.therapyEndDate)
    let therapy
    try {
        therapy = new Therapy({
            startDate: therapyStartDate,
            endDate: therapyEndDate,
            referer: {
                name: data.refererName,
                lastName: data.refererLastName,
                phone: data.refererPhone
            },
            notes: data.therapyNotes,
            archived: false
        })
        await therapy.save();
        if (destination == 'patient') {
            const patient = await Patient.findById(data.patientId)
            if (patient) {
                patient.therapies.push(therapy._id)
                patient.inTherapy = true
                await patient.save()
            } else {
                throw new Error('Paziente non trovato')

            }
        }
        if (destination == 'hospital') {
            const hospital = await Hospital.findById(data.hospitalId)
            console.log(hospital)
            if (hospital) {
                hospital.therapies.push(therapy._id)
                await hospital.save();
            } else {
                throw new Error('Ospedale non trovato')
            }
        }

        const machine = await Machine.findOne({ serialNumber: data.machineSerial })
        if (machine) {
            machine.therapies.push(therapy._id)
            machine.inUse = true;
            await machine.save()
        } else {
            throw new Error('Macchina non trovata')
        }

        res.json({ message: "Terapia Iniziata correttamente" })
    } catch (err) {
        if (therapy && therapy._id) {
            await Therapy.findByIdAndDelete(therapy._id)
        }
        res.status(500).json({ err })
    }
})
module.exports = router