const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
	name: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('services', ServiceSchema)
