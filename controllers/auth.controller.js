require('dotenv/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const { generateAccessToken, JSONResponse } = require('../helper')

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
		let authUser = new User()

		if (token == null) return res.sendStatus(401) //401 - unauthorized

		const { _id } = jwt.decode(token) //decode token

		try {
			authUser = await User.findById(_id).select('_id email role').populate('role') //populate auth user

			if (authUser && authUser.role == null) authUser.depopulate('role') //depopulate if populated field is null

			return JSONResponse.success(res, undefined, authUser)
		} catch (error) {
			return JSONResponse.error(res, 'error finding auth user', error, 404)
		}
	}
}

module.exports = AuthController
