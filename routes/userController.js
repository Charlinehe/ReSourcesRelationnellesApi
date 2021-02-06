const config = require('../configuration/config')
/*
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const algorithm = 'sha512'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)
*/
const jwtUtils = require('../utils/jwt.utils')
const mysql = require('mysql')

module.exports = {
    login: function(req, res) {
        let username = req.body.username
        let password = req.body.password

        if (username == null || password == null) {
            return res.status(400).json({"error": "paramètre(s) manquant(s)"})
        }

        config.connexion.connect((error) => {
            config.connexion.query("SELECT password FROM user WHERE username = " + mysql.escape(username),
            function(error, result) {
                let dbPassword = ""

                Object.keys(result).forEach((key) => {
                    dbPassword = result[key].password
                })

                if (dbPassword == "") {
                    return res.status(404).json({"error": "Le login " + username + " n'est pas attribué"})
                }

                /* TEST VERIF MOT DE PASSE
                bcrypt.compare(password, dbPassword, (errBycrypt, resBycrypt) => {
                    if (resBycrypt) {
                        return res.status(200).json({
                            "username": username,
                            "token": "token"
                        })
                    } else {
                        return res.status(403).json({"error": "Mot de passe invalide"})
                    }
                })

                let iv = Buffer.from(dbPassword, 'hex')
                let encryptedText = Buffer.from(dbPassword, 'hex')
                let decipher = crypto.createDecipheriv("sha512", Buffer.from(key), iv)
                let decrypted = decipher.update(encryptedText)
                decrypted = Buffer.concat([decrypted, decipher.final()])

                if (password == decrypted) {
                    return res.status(200).json({
                        "username": username,
                        "token": "token"
                    })
                } else {
                    return res.status(403).json({
                        "error": "Mot de passe invalide"
                    })
                }*/

                return res.status(200).json({
                    "username": username,
                    "token": jwtUtils.generateTokenForUser(username)
                })

            })
        })
    }
}