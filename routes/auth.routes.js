require('dotenv/config')
const express = require('express')
const router = express.Router()

const { login, getAuthUser, decodeToken } = require('../controllers/auth.controller')
const { auth } = require('../middlewares/auth')

router.route('/login').post(login)
router.route('/user').get(auth, getAuthUser)
router.route('/token').get(decodeToken)

module.exports = router
