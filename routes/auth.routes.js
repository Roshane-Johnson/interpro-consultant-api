const express = require('express')
const router = express.Router()

const { login, getAuthUser } = require('../controllers/auth.controller')
const { auth } = require('../middlewares/auth')

router.route('/login').post(login)
router.route('/user').get(auth, getAuthUser)

module.exports = router
