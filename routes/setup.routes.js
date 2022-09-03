const express = require('express')
const router = express.Router()
const {
	setupServices,
	setupRoles,
	setupAdmin,
} = require('../controllers/setup.controller')

router.route('/roles').get(setupRoles)
router.route('/services').get(setupServices)
router.route('/admin').get(setupAdmin)

module.exports = router
