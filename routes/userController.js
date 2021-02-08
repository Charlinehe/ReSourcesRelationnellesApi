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

            sql = `SELECT u.id as userId, u.firstname as firstname, u.lastname as lastname, u.email as email, 
                u.password as password, u.active as active, d.label as department, d.number as departmentNumber, 
                u.role_id as roleId FROM user u 
                INNER JOIN department d ON u.department_id = d.id 
                WHERE username = ` + mysql.escape(username) 

            config.connexion.query(sql, (error, result) => {
                let dbUserId = -1
                let dbFirstName = ""
                let dbLastName = ""
                let dbEmail = ""
                let dbPassword = ""
                let dbActive = -1
                let dbDepartment = ""
                let dbDepartmentNumber = ""
                let dbRoleId = -1

                if(result[0] === undefined) {
                    return res.status(404).json({"error": "Le login <" + username + "> n'est pas attribué"})
                }

                dbUserId = result[0].userId
                dbFirstName = result[0].dbFirstName
                dbLastName = result[0].dbLastName
                dbEmail = result[0].email
                dbPassword = result[0].password
                dbActive = result[0].active
                dbDepartment = result[0].department
                dbDepartmentNumber = result[0].departmentNumber
                dbRoleId = result[0].roleId

                if (dbActive != 1) {
                    return res.status(403).json({"error": "Le compte <" + username + "> a été désactivé"})
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
                    "userId": dbUserId,
                    "firstName": dbFirstName,
                    "lastName": dbLastName,
                    "username": username,
                    "email": dbEmail,
                    "department": dbDepartment,
                    "departmentNumber": dbDepartmentNumber,
                    "roleId": dbRoleId,
                    "access_token": jwtUtils.generateTokenForUser(result[0])
                })

            })
        })
    }
}