const express = require('express')
const router = express.Router()
const {
	getAll,
	createOne,
	getOne,
	updateOne,
	deleteOne,
} = require('../controllers/quotes.controller')
const { auth } = require('../middlewares/auth')

router.route('/').get(auth, getAll).post(createOne)
router.route('/:id').get(getOne).patch(auth, updateOne).delete(auth, deleteOne)

module.exports = router
