const express = require('express')
const router = require('../src/routers/LoginRouter')
const app = express()

app.use(express.json())
app.use('/auth', router)

app.listen(3000)