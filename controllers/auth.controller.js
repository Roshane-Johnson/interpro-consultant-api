const bcrypt = require('bcrypt')
const { generateAccessToken, JSONResponse } = require('../lib/helper')

const User = require('../models/user')

class AuthController {
	static login = async (req, res, next) => {
		let { email, password } = req.body
		let existingUser
		let token

		const unknownError = 'error! something went wrong.'

		try {
			existingUser = await User.findOne({ email: email }).populate('role')
		} catch (error) {
			return JSONResponse.error(res, unknownError, error)
		}

		if (!existingUser || !bcrypt.compareSync(password, existingUser.password)) {
			return JSONResponse.error(res, 'invalid credentials', error)
		}

		try {
			token = generateAccessToken({
				_id: existingUser.id,
			})
		} catch (error) {
			return JSONResponse.error(res, unknownError, error)
		}

		return JSONResponse.success(res, 'login successful', { token, user: existingUser })
	}

	static signUp = async (req, res) => {}

	static getAuthUser = async (req, res) => {
		const { _id } = req.user //deconstruct authenticated user's id

		try {
			const authUser = await User.findById(_id)
				.select('_id email role')
				.populate('role') //populate auth user

			if (authUser && authUser.role == null) authUser.depopulate('role') //depopulate if populated field is null

			return JSONResponse.success(res, undefined, authUser)
		} catch (error) {
			return JSONResponse.error(res, 'error finding auth user', error, 404)
		}
	}
}

module.exports = AuthController
