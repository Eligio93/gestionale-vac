const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    name:{type:String},
    town:{type:String},
    therapies: [{ type: Schema.Types.ObjectId, ref: 'Therapy' }]
})

module.exports = mongoose.model('Hospital', hospitalSchema)