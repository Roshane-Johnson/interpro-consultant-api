const jwt = require('jsonwebtoken')

function generateAccessToken(id) {
	let signedToken

	try {
		signedToken = jwt.sign(id, process.env.SECRET_JWT_TOKEN, { expiresIn: '1d' })
	} catch (error) {
		console.log(error)
	}

	return signedToken
}

module.exports = { generateAccessToken }
