const express = require('express')
const resourceController = require('./routes/resourceController')
const userController = require('./routes/userController')

exports.router = (() => {
    const router = express.Router()

    router.route('/resource/public').get(resourceController.getPublicResources)
    router.route('/resource/public/:resource_id').get(resourceController.getDetailPublicResource)

    router.route('/user/login').post(userController.login)

    return router
})()