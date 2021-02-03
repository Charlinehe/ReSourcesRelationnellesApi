const express = require('express')
const resourceController = require('./routes/resourceController')

exports.router = (() => {
    const router = express.Router()

    router.route('/resource/public').get(resourceController.getPublicResources)
    router.route('/resource/public/:resource_id').get(resourceController.getDetailPublicResource)

    return router
})()