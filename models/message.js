const mongoose = require('mongoose')
const Schema = mongoose.Schema

const REQUIRED_STRING = { type: String, required: true }

const MessageSchema = new Schema(
	{
		email: { ...REQUIRED_STRING },
		message: { ...REQUIRED_STRING, unique: true },
	},
	{ timestamps: true, collection: 'messages' }
)

module.exports = mongoose.model('messages', MessageSchema)
