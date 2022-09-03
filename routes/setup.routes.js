const express = require('express')
const router = express.Router()
const { setupServices, setupRoles } = require('../controllers/setup.controller')

router.route('/roles').get(setupRoles)
router.route('/services').get(setupServices)

module.exports = router
