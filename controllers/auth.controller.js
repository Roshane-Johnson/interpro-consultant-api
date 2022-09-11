const bcrypt = require('bcrypt')
const JSONResponse = require('../helpers/response.helper')
const { generateAccessToken } = require('../helpers/misc.helper')

const User = require('../models/user')

class AuthController {
	static login = async (req, res, next) => {
		let { email, password } = req.body
		let existingUser
		let token

		const unknownError = 'error! something went wrong on our end.'

		existingUser = await User.findOne({ email: email })
			.populate('role')
			.catch((error) => {
				return JSONResponse.error(res, unknownError, error)
			})

		if (!existingUser) {
			return JSONResponse.error(res, "we couldn't find your account", null)
		}

		const isValidLogin = bcrypt.compareSync(password, existingUser.password)

		if (isValidLogin === false) {
			return JSONResponse.error(res, 'invalid credentials', null)
		} else {
			token = generateAccessToken({
				_id: existingUser.id,
			})

			//remove password before returning the response
			const _existingUser = existingUser.toObject()
			delete _existingUser.password

			return JSONResponse.success(res, 'login successful', {
				token,
				user: _existingUser,
			})
		}
	}

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
