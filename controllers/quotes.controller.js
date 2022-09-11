const Quote = require('../models/quote')
const JSONResponse = require('../helpers/response.helper')

class QuoteController {
	static createOne = async (req, res) => {
		try {
			const quote = await Quote.create(req.body)
			return JSONResponse.success(res, undefined, quote, 201)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static getAll = async (req, res) => {
		try {
			const quotes = await Quote.find().populate('service')
			return JSONResponse.success(res, undefined, quotes)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static getOne = async (req, res) => {
		const quote = await Quote.findOne({ id: req.params.id })
			.populate('service')
			.catch((error) => {
				console.log(error)
				return JSONResponse.error(res, undefined, error)
			})

		return JSONResponse.success(res, 'quote found', quote)
	}

	static updateOne = async (req, res) => {
		const id = req.params.id

		const updatedDoc = await Quote.findByIdAndUpdate(id, req.body, {
			new: true,
		}).catch((error) => {
			return JSONResponse.error(res, 'error finding and updating document', error)
		})

		return JSONResponse.success(res, undefined, updatedDoc)
	}

	static deleteOne = async (req, res) => {
		const id = req.params.id

		const document = await Quote.findById(id).catch((error) => {
			return JSONResponse.error(res, 'error finding quote', error)
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

module.exports = QuoteController
