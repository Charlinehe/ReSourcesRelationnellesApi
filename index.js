const express = require('express')
const app = express()
const config = require('./configuration/config')

app.listen(config.port, () => {
    console.log('Serveur à l\'écoute')
})

  app.get('/users', (req, res) => {
    config.connexion.connect(function(error) {
        config.connexion.query("SELECT * FROM user LIMIT 10",
        function(error, result) {
            res.send(result)
        })
    });
})