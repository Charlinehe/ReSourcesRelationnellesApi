const express = require('express')
const app = express()
const mysql = require('mysql');
const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ressourcesrelationnelles"
});

app.listen(3005, () => {
    console.log('Serveur à l\'écoute')
})

  app.get('/users', (req, res) => {
    connexion.connect(function(error) {
        connexion.query("SELECT * FROM user LIMIT 10",
        function(error, result) {
            res.send(result)
        })
    });
})