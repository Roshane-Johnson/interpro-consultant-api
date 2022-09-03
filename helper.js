const jwt = require('jsonwebtoken')

class JSONResponse {
	static success(res, message = 'success', data, status) {
		res.status(status ?? res.statusCode).json({
			status: status ?? res.statusCode,
			message,
			data,
		})
	}

	static error(res, message = 'error', error, status) {
		res.status(status ?? res.statusCode).json({
			message,
			error,
			status: status ?? res.statusCode,
		})
	}
}

function generateAccessToken(id) {
	return jwt.sign(id, process.env.SECRET_JWT_TOKEN, { expiresIn: '1d' })
}

module.exports = { JSONResponse, generateAccessToken }
