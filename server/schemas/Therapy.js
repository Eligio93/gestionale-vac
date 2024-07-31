const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const therapySchema = new Schema({
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    machine: { type: Schema.Types.ObjectId, ref: 'Machine' },
    hospital: { type: Schema.Types.ObjectId, ref: 'Hospital' },
    startDate: { type: Date },
    endDate: { type: Date },
    referer: {
        name: { type: String },
        lastName: { type: String },
        phone: { type: String }
    },
    notes: { type: String },
    archived: { type: Boolean }
})
module.exports = mongoose.model('Therapy', therapySchema)