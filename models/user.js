const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const UserSchema = new Schema(
	{
		email: { type: String, required: [true, 'error'], unique: true },
		password: { type: String, required: [true, 'error'] },
		role: { type: Schema.Types.ObjectId, ref: 'roles' },
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
		throw new Error('Fatal error while running pre -> save model middleware')
	}
})

module.exports = mongoose.model('users', UserSchema)
