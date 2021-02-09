const mysql = require('mysql')

const connexion = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "resourcesrelationnelles",
    debug : false
})

const port = 3005

module.exports = {  
    connexion, port
}
