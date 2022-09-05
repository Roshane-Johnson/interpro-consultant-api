const jwt = require('jsonwebtoken')

class JSONResponse {
	static success(res, message = 'success', data, status) {
		res.status(status ?? res.statusCode).json({
			status: status ?? res.statusCode,
			success: true,
			message,
			data,
		})
	}

	static error(res, message = 'error', error, status) {
		res.status(status ?? res.statusCode).json({
			status: status ?? res.statusCode,
			success: false,
			message,
			error,
		})
	}
}

function generateAccessToken(id) {
	return jwt.sign(id, process.env.SECRET_JWT_TOKEN, { expiresIn: '1d' })
}

module.exports = { JSONResponse, generateAccessToken }
