const config = require('../configuration/config')
const mysql = require('mysql')
const log = require('../utils/log').log

module.exports = {
    getDepartments: (req, res) => {
        config.connexion.connect((error) => {
            log(req, error)

            sql = `SELECT id, label, number 
            FROM department`

            config.connexion.query(sql, 
                (error, result) => {
                    log(req, error)
                    return res.status(200).json(result)
                })
        })
    },

    getAgeCategories: (req, res) => {
        config.connexion.connect((error) => {
            log(req, error)

            sql = `SELECT id, label 
            FROM age_category`

            config.connexion.query(sql, 
                (error, result) => {
                    log(req, error)
                    return res.status(200).json(result)
                })
        })
    }
}