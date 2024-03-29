const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { request, response } = require('express')
const JSONResponse = require('../helpers/response.helper')
const { generateAccessToken } = require('../helpers/misc.helper')
const nodemailer = require('nodemailer')

const User = require('../models/user')

class AuthController {
	/**
	 * Login User
	 * @param {request} req
	 * @param {response} res
	 */
	static login = async (req, res) => {
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
			return JSONResponse.error(res, "we couldn't find your account", null, 404)
		}

		const isValidLogin = bcrypt.compareSync(password, existingUser.password)

		if (isValidLogin === false) {
			return JSONResponse.error(res, 'invalid credentials', null, 401)
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

	/**
	 * Get Authenticated User
	 * @param {request} req
	 * @param {response} res
	 */
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

	/**
	 * Get Token Info
	 * @param {request} req
	 * @param {response} res
	 */
	static decodeToken = async (req, res) => {
		const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

		// token not found
		if (!token) return JSONResponse.error(res, 'token not found', null, 404)

		const decodedToken = jwt.decode(token, { complete: true, json: true })

		if (decodedToken == null)
			return JSONResponse.error(res, 'this token might be invalid', null, 500)

		return JSONResponse.success(res, 'token decoded', decodedToken.payload)
	}
}

module.exports = AuthController
