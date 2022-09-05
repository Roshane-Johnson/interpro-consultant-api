const express = require('express')
const router = express.Router()

const { login, getAuthUser } = require('../controllers/auth.controller')

router.route('/login').post(login)
router.route('/user').get(getAuthUser)

module.exports = router
