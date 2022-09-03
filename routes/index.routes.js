const express = require('express')
const router = express.Router()
const IndexController = require('../controllers/index.controller')

router.route('/').get(IndexController.index).post(IndexController.indexAnswer)

module.exports = router
