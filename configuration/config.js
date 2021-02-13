const mysql = require('mysql')

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ressourcesrelationnelles",
    debug : false
})

const port = 3005

module.exports = {  
    connexion, port
}
