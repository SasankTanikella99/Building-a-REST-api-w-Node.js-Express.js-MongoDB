require('dotenv').config()

const express = require('express');
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to the Database'))

app.use(express.json())

const machinesRouters = require('./routes/machines')
app.use('/machines', machinesRouters)

app.listen(3000, () => console.log("Server Start"))