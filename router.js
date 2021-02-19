const express = require('express')
const resourceController = require('./routes/resourceController')
const userController = require('./routes/userController')
const labelTableController = require('./routes/labelTableController')

exports.router = (() => {
    const router = express.Router()

    router.route('/resource/public').get(resourceController.getPublicResources)
    router.route('/resource/:resource_id').get(resourceController.getDetailResource)
    router.route('/resource/valuation/:resource_id').get(resourceController.getResourceValuation)

    router.route('/user/login').post(userController.login)
    router.route('/user/inscription').post(userController.inscription)

    router.route('/departments').get(labelTableController.getDepartments)
    router.route('/age_categories').get(labelTableController.getAgeCategories)

    return router
})()