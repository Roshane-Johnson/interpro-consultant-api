const express = require('express')
const router = express.Router()
const { auth } = require('../middlewares/auth')
const MessageController = require('../controllers/message.controller')

router.route('/').get(auth, MessageController.getAll).post(MessageController.createOne)

router
	.route('/:id')
	.get(auth, MessageController.getOne)
	.patch(auth, MessageController.updateOne)
	.delete(auth, MessageController.deleteOne)

module.exports = router
