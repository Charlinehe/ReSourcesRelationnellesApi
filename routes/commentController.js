const config = require('../configuration/config')
const jwtUtils = require('../utils/jwt.utils')
const log = require('../utils/log').log

module.exports = {
    getResourceComments: (req, res) => {
        config.connexion.connect((errorCon) => {
            sql = `SELECT c.id, c.content, c.comment_date, u.username
                FROM commentary c
                INNER JOIN user u ON c.user_id = u.id
                WHERE resource_id = ` + req.params.resource_id + ` 
                ORDER BY comment_date DESC`
                console.log(sql)
            config.connexion.query(sql, (error, result) => {
                log(req, error)

                if(error) {
                    return res.status(500).json({"erreur": "Erreur de l'exécution de la requête - " + error})
                } else {
                    return res.status(200).json(result)
                }
            })
        })
    },

    getCommentAnswer: (req, res) => {
        config.connexion.connect((errorCon) => {
            sql = `SELECT a.id, a.content, a.answer_date, u.username
                FROM answer a
                INNER JOIN user u ON a.usert_id = u.id
                WHERE commentary_id = ` + req.params.comment_id + ` 
                ORDER BY answer_date DESC`
            config.connexion.query(sql, (error, result) => {
                log(req, error)

                if(error) {
                    return res.status(500).json({"erreur": "Erreur de l'exécution de la requête - " + error})
                } else {
                    return res.status(200).json(result)
                }
            })
        })
    }, 

    insertResourceComment: (req, res) => {
        const token = req.headers.authorization
        let decodedToken = jwtUtils.checkToken(token)
        let date = new Date()

        if (decodedToken.error === undefined) {
            config.connexion.connect((errorCon) => {
                const comment = {
                    'user_id': decodedToken.userId,
                    'resource_id': req.params.resource_id,
                    'content': req.body.content,
                    'comment_date': date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds()
                }
                config.connexion.query('INSERT INTO commentary SET?', comment,
                    (error, result) => {
                        log(req, error)
                        if (error) {
                            return res.status(500).json({"erreur": error})
                        } else {
                            return res.status(200).json({"id": result.insertId})
                        }
                    }
                )
            })
        } else {
            return res.status(403).json(decodedToken)
        }
    },

    insertCommentAnswer: (req, res) => {
        const token = req.headers.authorization
        let decodedToken = jwtUtils.checkToken(token)
        let date = new Date()

        if (decodedToken.error === undefined) {
            config.connexion.connect((errorCon) => {
                const answer = {
                    'usert_id': decodedToken.userId,
                    'commentary_id': req.params.comment_id,
                    'content': req.body.content,
                    'answer_date': date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds()
                }
                config.connexion.query('INSERT INTO answer SET?', answer, 
                (error, result) => {
                    log(req, error)
                    if (error) {
                        return res.status(500).json({"erreur": error})
                    } else {
                        return res.status(200).json({"id": result.insertId})
                    }
                }
                )
            })
        } else {
            return res.status(403).json(decodedToken)
        }
    }
}