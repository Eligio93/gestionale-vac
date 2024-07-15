const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const machineSchema = new Schema({
    motor: { type: String },
    serial: { type: String },
    therapies: [{ type: Schema.Types.ObjectId, ref: 'Therapy' }]
})

module.exports = mongoose.model('Machine', machineSchema)