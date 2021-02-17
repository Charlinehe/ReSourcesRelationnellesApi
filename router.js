const express = require('express')
const resourceController = require('./routes/resourceController')
const userController = require('./routes/userController')

exports.router = (() => {
    const router = express.Router()

    router.route('/resource/public').get(resourceController.getPublicResources)
    router.route('/resource/:resource_id').get(resourceController.getDetailResource)
    router.route('/resource/valuation/:resource_id').get(resourceController.getResourceValuation)

    router.route('/user/login').post(userController.login)

    return router
})()