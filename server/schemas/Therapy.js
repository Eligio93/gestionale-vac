const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const therapySchema = new Schema ({
    startDate:{type:Date},
    endDate:{type:Date},
    referer:{
        name:{type:String},
        lastName:{type:String},
        phone:{type:String}
    },
    notes:{type:String},
    archived:{type:Boolean}
})
module.exports = mongoose.model('Therapy', therapySchema)