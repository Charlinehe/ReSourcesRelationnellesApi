const express = require('express')
const resourceController = require('./routes/resourceController')
const userController = require('./routes/userController')
const labelTableController = require('./routes/labelTableController')
const commentController = require('./routes/commentController')

exports.router = (() => {
    const router = express.Router()

    router.route('/resource/public').get(resourceController.getPublicResources)
    router.route('/resource/:resource_id').get(resourceController.getDetailResource)
    router.route('/resource/valuation/:resource_id').get(resourceController.getResourceValuation)
    router.route('/resource/action/:resource_id').post(resourceController.insertActionResource)

    router.route('/comment/:resource_id').get(commentController.getResourceComments)
    router.route('/comment/answer/:comment_id').get(commentController.getCommentAnswer)
    router.route('/resource/:resource_id/comment').post(commentController.insertResourceComment)

    router.route('/user/login').post(userController.login)
    router.route('/user/inscription').post(userController.inscription)

    router.route('/departments').get(labelTableController.getDepartments)
    router.route('/age_categories').get(labelTableController.getAgeCategories)

    return router
})()