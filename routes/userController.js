const config = require('../configuration/config')
const bcrypt = require('bcrypt')
/*
const crypto = require('crypto')
const algorithm = 'sha512'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)
*/
const jwtUtils = require('../utils/jwt.utils')
const mysql = require('mysql')
const log = require('../utils/log').log
const saltRounds = 10

function hashPassword(password) {
    bcrypt.genSalt(saltRounds, (error, salt) => {
        if (error) {
            return res.status(500).json({"error": "Un problème est survenu lors du hashage du mot de passe"})
        } else {
            bcrypt.hash(password, salt, (error, hash) => {
                if (error) {
                    return res.status(500).json({"error": "Un problème est survenu lors du hashage du mot de passe"})
                } else {
                    return hash
                }
            })
        }
    })
}

module.exports = {
    login: (req, res) => {
        let username = req.body.username
        let password = req.body.password

        if (username == null || password == null) {
            return res.status(400).json({"error": "paramètre(s) manquant(s)"})
        }

        config.connexion.connect((error) => {

            log(req, error)

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
    },

    inscription: (req, res) => {
        let username = req.body.username
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let email = req.body.email
        let password = req.body.password
        let departmentId = req.body.departmentId
        let ageCategoryId = req.body.ageCategoryId
        let roleId = req.body.roleId

        if (username == null || password == null || firstname == null || lastname == null
            || email == null || departmentId == null || ageCategoryId == null || roleId == null) {
            return res.status(400).json({"error": "paramètre(s) manquant(s)"})
        } else {

            let hashedPassword = hashPassword(password)
            let dayDate = new Date()

            config.connexion.connect((error) => {
                log(req, error)

                sql = `SELECT id FROM user WHERE username = '` + username + `'`

                config.connexion.query(sql, (error, result) => {
                    if(!(result[0] === undefined)) {
                        return res.status(403).json({"erreur": "Le login a déjà été attribué à un autre compte"})
                    } else {
                        sql = `SELECT id FROM user WHERE email = '` + email + `'`

                        config.connexion.query(sql, (error2, result2) => {
                            if (!(result2[0] === undefined)) {
                                return res.status(403).json({"erreur": "L\'email a déjà été utilisé pour un autre compte"})
                            } else {
                                const user = {
                                    'username': username,
                                    'firstname': firstname,
                                    'lastname': lastname,
                                    'email': email,
                                    'password': hashedPassword,
                                    'department_id': departmentId,
                                    'age_category_id': ageCategoryId,
                                    'role_id': roleId,
                                    'active': 1,
                                    'creation_date': dayDate.getDate()
                                }
                
                                config.connexion.query('INSERT INTO user SET?', user,
                                (error3, result3) => {
                                    if (error) {
                                        return res.status(500).json({"erreur": "erreur lors de l'exécution de la requête"})
                                    } else {
                                        return res.status(200).json({"userId": result3.insertId})
                                    }
                                })
                            }
                        })
                    }
                    
                })

                
            })

        }
    },

    getUserInformation: (req, res) => {
        const token = req.headers.authorization
        decodedToken = jwtUtils.checkToken(token)

        if (decodedToken.error === undefined) {
            config.connexion.connect((error) => {
                log(req, error)
    
                sql = `SELECT firstname, lastname, email, ac.label as age_category
                    FROM user u 
                    INNER JOIN age_category ac ON u.age_category_id = ac.ID
                    WHERE u.id = ` + decodedToken.userId
                
                config.connexion.query(sql,
                    (error, result) => {
                        if (error) {
                            return res.status(500).json({"erreur": "erreur lors de l'exécution de la requête"})
                        } else {
                            return res.status(200).json(result)
                        }
                    })
            })
        } else {
            return res.status(403).json(decodedToken)
        }

    }
}