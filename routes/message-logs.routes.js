const express = require('express')
const router = express.Router()
const MessageLogController = require('../controllers/message-log.controller')

router.route('/').get(MessageLogController.getAll)
router.route('/total').get(MessageLogController.total)

module.exports = router
