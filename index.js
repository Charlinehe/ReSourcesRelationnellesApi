const express = require('express')
const config = require('./configuration/config')
const router = require('./router').router
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.listen(config.port, () => {
    console.log('Serveur à l\'écoute')
})

app.use('/api/', router)
