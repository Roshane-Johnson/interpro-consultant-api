const mongoose = require('mongoose')
const Schema = mongoose.Schema

const REQUIRED_STRING = { type: String, required: true }

const AdminNoteSchema = new Schema(
	{ note: REQUIRED_STRING },
	{ collection: 'admin_notes', timestamps: true }
)

AdminNoteSchema.methods.logNote = function () {
	console.log(this)
}

module.exports = mongoose.model('admin_notes', AdminNoteSchema)
