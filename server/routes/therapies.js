const express = require('express');
const router = express.Router();
const Therapy = require('../schemas/Therapy')
const Patient = require('../schemas/Patient')
const Hospital = require('../schemas/Hospital')
const Machine = require('../schemas/Machine')


router.get('/', async (req, res, next) => {
    const therapies = await Therapy.find({})
        .populate('patient')
        .populate('machine')
        .populate('hospital')
    return res.json({ therapies })
})

//EDIT THERAPY
router.put('/edit/:therapyId', async (req, res, next) => {
    const therapyId = req.params.therapyId
    console.log(therapyId)
    console.log(req.body)
})


//CREATE A NEW THERAPY
router.post('/newTherapy', async (req, res, next) => {
    const destination = req.body.destination
    const data = req.body.data
    const therapyStartDate = new Date(data.therapyStartDate)
    const therapyEndDate = new Date(data.therapyEndDate)
    let therapy
    try {
        therapy = new Therapy({
            patient: null,
            hospital: null,
            machine: null,
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

        if (destination == 'patient') {
            therapy.patient = data.patientId;
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
            therapy.hospital = data.hospitalId;
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
            therapy.machine = machine._id;
            machine.therapies.push(therapy._id)
            machine.inUse = true;
            await machine.save()
        } else {
            throw new Error('Macchina non trovata')
        }
        await therapy.save();
        res.json({ message: "Terapia Iniziata correttamente" })
    } catch (err) {
        if (therapy && therapy._id) {
            await Therapy.findByIdAndDelete(therapy._id)
        }
        res.status(500).json({ err })
    }
})
module.exports = router