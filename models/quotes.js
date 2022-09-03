const mongoose = require('mongoose')
const Schema = mongoose.Schema

const REQUIRED_STRING = { type: String, required: true }
const REQUIRED_NUMBER = { type: Number, required: true }

const QuoteSchema = new Schema({
	fullName: { ...REQUIRED_STRING },
	email: { ...REQUIRED_STRING },
	phoneNumber: { ...REQUIRED_NUMBER },
	service: { type: Schema.Types.ObjectId, ref: 'services' },
	company: { ...REQUIRED_STRING },
	budget: { ...REQUIRED_NUMBER },
	message: { ...REQUIRED_STRING },
	status: { type: ['active', 'inactive'], default: 'active' },
})

module.exports = mongoose.model('quotes', QuoteSchema)
