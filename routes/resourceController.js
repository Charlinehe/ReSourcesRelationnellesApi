const config = require('../configuration/config')

module.exports = {

    getPublicResources: function (req, res) {
        config.connexion.connect(function (error) {
            config.connexion.query(
                "SELECT r.id, r.title, r.description, r.link, r.date_creation, r.image_name, r.content_name, ac.label as age_category, u.username, rst.label as relationship_type, rt.label as resource_type, c.label as category FROM resource r INNER JOIN age_category ac ON r.age_category_id = ac.id INNER JOIN user u ON r.user_id = u.id INNER JOIN relationship_type rst ON r.relation_ship_type_id = rst.id INNER JOIN resource_type rt ON r.resource_type_id = rt.id INNER JOIN category c ON r.category_id = c.id WHERE r.public = 1 AND r.active = 1 ORDER BY r.date_creation DESC;",
                function (error, result) {
                    res.send(result)
                }
            )
        })
    },

    getDetailPublicResource: function (req, res) {
        config.connexion.connect(function (error) {
            config.connexion.query(
                "SELECT r.id, r.title, r.description, r.link, r.date_creation, r.image_name, r.content_name, ac.label as age_category, u.username, rst.label as relationship_type, rt.label as resource_type, c.label as category FROM resource r INNER JOIN age_category ac ON r.age_category_id = ac.id INNER JOIN user u ON r.user_id = u.id INNER JOIN relationship_type rst ON r.relation_ship_type_id = rst.id INNER JOIN resource_type rt ON r.resource_type_id = rt.id INNER JOIN category c ON r.category_id = c.id WHERE r.public = 1 AND r.active = 1 AND r.id = " + req.params.resource_id,
                function (error, result) {
                    res.send(result)
                }
            )
        })
    }
}