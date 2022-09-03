require('dotenv/config')
const bcrypt = require('bcrypt')

const User = require('../models/user')

const { generateAccessToken } = require('../helper')

class AuthController {
	static login = async (req, res, next) => {
		let { email, password } = req.body
		let existingUser
		let token

		try {
			existingUser = await User.findOne({ email: email })
		} catch {
			const error = new Error('Error! Something went wrong.')
			return next(error)
		}

		if (!existingUser || !bcrypt.compareSync(password, existingUser.password)) {
			const error = Error('Wrong details please check at once')
			return next(error)
		}

		try {
			token = generateAccessToken({
				_id: existingUser.id,
				email: existingUser.email,
				role: existingUser.role,
			})
		} catch (err) {
			console.log(err)
			const error = new Error('Error! Something went wrong.')
			return next(error)
		}

		existingUser = existingUser.toObject()
		delete existingUser.password

		res.status(200).json({
			success: true,
			data: {
				...existingUser,
				token: token,
			},
		})
	}

	static signUp = async (req, res) => {}

	static getAuthUser = async (req, res) => {
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(' ')[1]

		if (token == null) return res.sendStatus(401)

		jwt.verify(
			token,
			process.env.SECRET_JWT_TOKEN,
			{ expiresIn: '1d' },
			(err, user) => {
				if (err) return res.sendStatus(403)
				req.user = user
				next()
			}
		)
	}
}

module.exports = AuthController
