const config = require('../configuration/config')

module.exports = {

    getPublicResources: function(req, res) {
        config.connexion.connect(function(error) {
            config.connexion.query(
                "SELECT * FROM resource WHERE public = 1", 
                function(error, result) {
                    res.send(result)
                }
            )
        })
    },

    getDetailPublicResource: function(req, res) {
        config.connexion.connect(function(error) {
            config.connexion.query(
                "SELECT * FROM resource WHERE public = 1 AND id = " + req.params.resource_id, 
                function(error, result) {
                    res.send(result)
                }
            )
        })
    }
}