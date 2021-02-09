const express = require('express')
const app = express()
const config = require('./configuration/config')
const router = require('./router').router

app.listen(config.port, () => {
    console.log('Server running on port ' + config.port)
})

app.use('/api/', router)
