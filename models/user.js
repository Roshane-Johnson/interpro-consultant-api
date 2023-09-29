const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const UserSchema = new Schema(
	{
		email: { type: String, required: [true, 'email is a required field'], unique: true },
		password: { type: String, required: [true, 'password is a required field'] },
		role: { type: Schema.Types.ObjectId, ref: 'roles', required: [true, 'role id is a required field'] },
	},
	{ timestamps: true, collection: 'users' }
)

UserSchema.pre('save', async function (next) {
	if (this.password && this.isModified('password')) {
		const salt = await bcrypt.genSalt(10).catch((error) => console.log(error))

		const hashedPassword = await bcrypt
			.hash(this.password, salt)
			.catch((error) => console.log(error))

		this.password = hashedPassword

		next()
	} else {
		throw new Error('fatal error while running `users` pre save model middleware')
	}
})

module.exports = mongoose.model('users', UserSchema)
