const express = require('express')
const router = express.Router()
const AdminNoteController = require('../controllers/admin-note.controller')

router.route('/').get(AdminNoteController.getAll).patch(AdminNoteController.update)

module.exports = router
