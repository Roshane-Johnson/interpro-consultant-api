const mongoose = require('mongoose')
const Schema = mongoose.Schema

const REQUIRED_STRING = { type: String, required: true }

const UserSchema = new Schema({
	email: { ...REQUIRED_STRING },
	password: { ...REQUIRED_STRING },
	role: { type: Schema.Types.ObjectId, ref: 'roles' },
})

module.exports = mongoose.model('users', UserSchema)
