const express = require('express')
const router = express.Router()
const machine = require('../models/machine')

// GET all
router.get('/', async (req, res) => {
    try{
        const machines = await Machine.find()
        res.json(machines)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// GET one
router.get('/:id', getMachine, (req,res)=>{
    res.send(res.machine)
})

//CREATE one
router.post('/', async (req,res)=>{
    const machine = new Machine({
        name: req.body.name,
        machineToGym: req.body.machineToGym
    })
    try {
        const newMachine = await machine.save()
        res.status(201).json(newMachine)
    }catch(err){
        res.status(400).json({message: err.message })
}})

//UPDATE one
router.patch('/:id', getMachine, async (req,res)=>{
    if(req.body.main !=  null){
        res.machine.name = req.body.name
    }
    if(req.body.machineToGym != null){
        res.machine.machineToGym= req.body.machineToGym
    }
    try{
        const updatemachine = await res.machine.save()
        res.json(updatemachine)
    }catch(err){
        res.status(400).json({message:"Update Failed!"})
    }
})

//DELETE one
router.delete('/:id', getMachine, async (req,res)=>{
try{
    await res.machine.remove()
}catch(err){
    res.status(500).json({message: "Deleted Subscriber"})
}
})

async function getMachine(req, res, next){
    try {
        machine = await Machine.findById(req.params.id)
        if(machine == null){
            return res.status(404).json({ message: 'Cannot find machine'})
        }
    }catch(err){
        res.status(500).json({message: err.message })
    }

    res.machine = machine
    next()

}
module.exports = router