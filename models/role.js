const mongoose = require('mongoose')
const Schema = mongoose.Schema

const REQUIRED_UNIQUE_STRING = { type: String, required: true, unique: true }

const RoleSchema = new Schema({
	type: { ...REQUIRED_UNIQUE_STRING },
})

module.exports = mongoose.model('roles', RoleSchema)
