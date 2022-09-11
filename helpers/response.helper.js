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
		res.status(status ?? 500).json({
			status: status ?? 500,
			success: false,
			message,
			error,
		})
	}
}

module.exports = JSONResponse
