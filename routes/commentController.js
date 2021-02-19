const config = require('../configuration/config')
const log = require('../utils/log').log

module.exports = {
    getResourceComments: (req, res) => {
        config.connexion.connect((errorCon) => {
            sql = `SELECT c.id, c.content, c.comment_date, u.username
                FROM commentary c
                INNER JOIN user u ON c.user_id = u.id
                WHERE resource_id = ` + req.params.resource_id
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
    }
}