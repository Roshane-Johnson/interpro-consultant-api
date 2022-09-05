const express = require('express')
const { index, answer } = require('../controllers/index.controller')

const router = express.Router()

router.route('/').get(index).post(answer)

module.exports = router
