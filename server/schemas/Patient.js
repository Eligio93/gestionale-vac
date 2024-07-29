const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: { type: String },
    lastName: { type: String },
    city: { type: String },
    phone: { type: String },
    inTherapy:{type:Boolean},
    therapies:[{type:Schema.Types.ObjectId,ref:'Therapy'}]
})

module.exports = mongoose.model('Patient', patientSchema)