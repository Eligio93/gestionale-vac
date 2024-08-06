const express = require('express');
const router = express.Router();
const Machine = require('../schemas/Machine')
const Therapy = require('../schemas/Therapy')
const Patient = require('../schemas/Patient');
const { default: mongoose } = require('mongoose');

/*GET ALL MACHINES*/
router.get('/', async (req, res, next) => {
    const machines = await Machine.find({})
    return res.json({ machines })
})

/*CREATE A NEW MACHINE*/
router.post('/newMachine', async function (req, res) {
    try {
        const existingMachine = await Machine.findOne({ serialNumber: req.body.serialNumber, motor: req.body.machineMotor })
        if (existingMachine) {
            return res.status(400).json({ message: 'Questa macchina e gia stata registrata' })
        }
        const newMachine = new Machine({
            motor: req.body.machineMotor,
            serialNumber: req.body.serialNumber,
            inUse: false
        })
        await newMachine.save();
        return res.json({ message: 'Macchina Aggiunta correttamente' })
    } catch (err) {
        res.status(500).json({ err })
    }
})

/*RETURN A MACHINE*/
router.put('/return', async (req, res, next) => {
    // const patient = req.body.patient
    const patient = req.body.patient
    const machine = req.body.machine
    const hospital = req.body.hospital
    const therapyId = req.body._id
    //start session to make sure all the field are updated correctly
    const session = await mongoose.startSession();
    session.startTransaction();

    if ((patient || hospital) && machine && therapyId) {
        try {
            if (patient) {
                const updatedPatient = await Patient.findByIdAndUpdate(
                    patient._id,
                    {
                        $set: {
                            inTherapy: false
                        }
                    },
                    { new: true, session }
                );
                if (!updatedPatient) {
                    throw new Error('Paziente non trovato');
                }
            }
            const updatedMachine = await Machine.findByIdAndUpdate(
                machine._id,
                {
                    $set: {
                        inUse: false
                    }
                },
                { new: true, session }

            )
            if (!updatedMachine) {
                throw new Error('Macchina non trovata');
            }
            const updatedTherapy = await Therapy.findByIdAndUpdate(
                therapyId,
                {
                    $set: {
                        archived: true
                    }
                },
                { new: true, session }
            )
            if (!updatedTherapy) {
                throw new Error('Terapia non trovata');
            }
            //if everything goes well the session committ all changes
            await session.commitTransaction();
            session.endSession();
            return res.json('Macchina ritirata con successo')
        } catch (err) {
            console.log(err)
            //if there s an error the transaction gets aborted
            await session.abortTransaction()
            session.endSession();
            return res.status(500).json({message:'Errore nel ritiro della macchina',error:err.message})
        }
    }else{
        return res.status(500).json({message:'Errore nel ritiro della macchina, terapia non trovata'})
    }
})


module.exports = router