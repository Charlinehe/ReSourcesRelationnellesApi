const express = require('express')
const config = require('./configuration/config')
const router = require('./router').router
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.listen(process.env.PORT || config.port, () => {
    console.log('Server running on port ' + config.port)
})

app.use('/api/', router)
