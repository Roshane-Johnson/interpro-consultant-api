require('dotenv/config')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const REQUIRED_STRING = { type: String, required: true }

const MessageLogSchema = new Schema({
	messaging_product: REQUIRED_STRING,
	contacts: [{ input: REQUIRED_STRING, wa_id: REQUIRED_STRING }],
	messages: [
		{
			id: REQUIRED_STRING,
		},
	],
})

module.exports = mongoose.model('message_logs', MessageLogSchema)
