const express = require('express');
const router = express.Router();
const Machine = require('../schemas/Machine')

router.post('/newMachine', async function (req, res) {
    try {
        const existingMachine = await Machine.findOne({ serialNumber: req.body.serialNumber, motor:req.body.machineMotor })
        if (existingMachine) {
            return res.status(400).json({ message: 'Questa macchina e gia stata registrata' })
        }
        const newMachine = new Machine({
            motor: req.body.machineMotor,
            serialNumber: req.body.serialNumber,
            inUse:false
        })
        await newMachine.save();
        return res.json({ message: 'Macchina Aggiunta correttamente' })
    } catch (err) {
        res.status(500).json({ err })
    }
})

module.exports = router