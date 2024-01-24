const mongoose = require('mongoose')

const machinesSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    machineToGym: {
        type:String,
        required: true
    },
    machineDate:{
        type:String,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Machine', machinesSchema)