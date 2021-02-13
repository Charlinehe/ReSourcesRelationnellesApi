const config = require('../configuration/config')
const jwtUtils = require('../utils/jwt.utils')

module.exports = {

    getPublicResources: (req, res) => {
        let limit = req.headers['limit']
        let page = req.headers['page']

        if (limit === undefined) {
            limit = 100
        }

        if (page === undefined) {
            page = 1
        }
        let firstRecord = (page - 1) * limit

        config.connexion.connect((error) => {
            sql = `SELECT r.id, r.title, r.description, r.link, r.date_creation, r.image_name, r.content_name, 
            ac.label as age_category, u.username, rst.label as relationship_type, rt.label as resource_type, 
            c.label as category 
            FROM resource r 
            INNER JOIN age_category ac ON r.age_category_id = ac.id 
            INNER JOIN user u ON r.user_id = u.id 
            INNER JOIN relationship_type rst ON r.relation_ship_type_id = rst.id 
            INNER JOIN resource_type rt ON r.resource_type_id = rt.id 
            INNER JOIN category c ON r.category_id = c.id 
            WHERE r.public = 1 AND r.active = 1
            ORDER BY r.date_creation DESC
            LIMIT ` + firstRecord + `, ` + limit + `;`
            console.log(sql)
            config.connexion.query(
                sql,
                (error, result) => {
                    Log(req, error)
                    return res.status(200).json(result)
                }
            )
        })
    },

    getDetailPublicResource: (req, res) => {
        config.connexion.connect( (errorCon) => {
            sql = `SELECT r.id, r.title, r.description, r.link, r.date_creation, r.image_name, r.content_name,  
                ac.label as age_category, u.username, rst.label as relationship_type, rt.label as resource_type,  
                c.label as category, r.public as public 
                FROM resource r 
                INNER JOIN age_category ac ON r.age_category_id = ac.id 
                INNER JOIN user u ON r.user_id = u.id 
                INNER JOIN relationship_type rst ON r.relation_ship_type_id = rst.id 
                INNER JOIN resource_type rt ON r.resource_type_id = rt.id 
                INNER JOIN category c ON r.category_id = c.id 
                WHERE r.active = 1 AND r.id = ` + req.params.resource_id
            config.connexion.query(sql,
                (error, result) => {
                    Log(req, error)
                    if(error) throw error;
                    if (result[0] != undefined) {

                        if (result[0].public != 1) {
                            const token = req.headers.authorization
                            decodedToken = jwtUtils.checkToken(token)

                            if (decodedToken.error === undefined) {

                                sql = `SELECT role_id as roleId FROM user WHERE id = ` + decodedToken.userId

                                config.connexion.query(sql,
                                    (error2, result2) => {

                                        if (result2[0] != undefined) {

                                            if (result2[0].roleId != 1) {
                                                return res.status(200).json(result)
                                            } else {
                                                sql = `SELECT id FROM rel_user_action_resource 
                                                WHERE action_type_id = 1 
                                                AND user_id = ` + decodedToken.userId + ` 
                                                AND resource_id = ` + req.params.resource_id + ` 
                                                UNION 
                                                SELECT id FROM rel_shared_resource_user 
                                                WHERE shared_with_user_id = ` + decodedToken.userId + ` 
                                                AND resource_id = ` + req.params.resource_id
                                                config.connexion.query(sql,
                                                    (error3, result3) => {
                                                        if (result3[0] === undefined) {
                                                            return res.status(403).json({ "message": "Accès non autorisé - Ressource privée" })
                                                        } else {
                                                            //l'utilisateur est auteur de la ressource ou la ressource a été partagée avec lui
                                                            return res.status(200).json(result)
                                                        }
                                                    }
                                                )
                                            }

                                        } else {
                                            return res.status(500).json({ "message": "Erreur fatale" })
                                        }
                                    }

                                )

                            } else {
                                return res.status(403).json(decodedToken)
                            }
                        } else {
                            return res.status(200).json(result)
                        }

                    } else {
                        return res.status(404).json({ "message": "Ressource non trouvée - La ressource est inexistante ou inactive" })
                    }

                }
            )
        })
    },

}

function Log(request, error) {
    const { rawHeaders, httpVersion, method, socket, url } = request;
    const { remoteAddress, remoteFamily } = socket;
    let date = new Date;

    console.log(
        Date.now(),
        rawHeaders[1],
        httpVersion,
        method,
        remoteAddress,
        remoteFamily,
        url,
        (error) ? (error.errno, error.code, error.sqlMessage) : 200,
    );
};
