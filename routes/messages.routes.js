const express = require('express')
const router = express.Router()
const MessageController = require('../controllers/message.controller')

router.route('/').get(MessageController.getAll).post(MessageController.createOne)

router
	.route('/:id')
	.get(MessageController.getOne)
	.patch(MessageController.updateOne)
	.delete(MessageController.deleteOne)

module.exports = router
