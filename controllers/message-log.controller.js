const MessageLog = require('../models/message-log')
const JSONResponse = require('../helpers/response.helper')

class MessageLogController {
	static getAll = async (req, res) => {
		let messageLogs
		try {
			messageLogs = await MessageLog.find()
			return JSONResponse.success(res, 'fetched message logs', messageLogs)
		} catch (error) {
			return JSONResponse.error(res, 'error fetching message logs', error)
		}
	}

	static total = async (req, res) => {
		let total
		try {
			total = (await MessageLog.find()).length
			return JSONResponse.success(res, 'fetched message logs total', { total })
		} catch (error) {
			return JSONResponse.error(res, 'error fetching message logs total', error)
		}
	}
}

module.exports = MessageLogController
