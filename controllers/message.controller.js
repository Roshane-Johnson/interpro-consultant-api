const Message = require('../models/message')
const JSONResponse = require('../helpers/response.helper')

class MessageController {
	static createOne = async (req, res) => {
		try {
			const quote = await Message.create(req.body)
			return JSONResponse.success(res, undefined, quote)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static getAll = async (req, res) => {
		try {
			const messages = await Message.find()
			return JSONResponse.success(res, undefined, messages)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static getOne = async (req, res) => {
		try {
			const message = await Message.findById(req.params.id)
			return JSONResponse.success(res, 'success', message)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static updateOne = async (req, res) => {
		const id = req.params.id

		try {
			const updatedDoc = await Message.findByIdAndUpdate(id, req.body, {
				new: true,
			})
			return JSONResponse.success(res, undefined, updatedDoc)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static deleteOne = async (req, res) => {
		const id = req.params.id

		const document = await Message.findById(id).catch((error) => {
			return JSONResponse.error(res, 'error finding resource', error)
		})

		if (document == null) {
			return JSONResponse.error(res, "can't find document with id " + id, null)
		} else {
			await document.delete().catch((error) => {
				return JSONResponse.error(res, 'error deleting resource' + id, error)
			})

			return JSONResponse.success(res, 'resource deleted', document)
		}
	}
}

module.exports = MessageController
