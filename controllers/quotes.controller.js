const Quotes = require('../models/quotes')
const { JSONResponse } = require('../helper')

class QuoteController {
	static createOne = async (req, res) => {
		try {
			const quote = await Quotes.create(req.body)
			return JSONResponse.success(res, undefined, quote)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static getAll = async (req, res) => {
		try {
			const quotes = await Quotes.find().populate('service')
			return JSONResponse.success(res, undefined, quotes)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static getOne = async (req, res) => {
		try {
			const quote = await Quotes.findById(req.params.id).populate('service')
			return JSONResponse.success(res, 'success', quote)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static updateOne = async (req, res) => {
		const id = req.params.id

		try {
			const updatedDoc = await Quotes.findByIdAndUpdate(id, req.body, {
				new: true,
			})
			return JSONResponse.success(res, undefined, updatedDoc)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static deleteOne = async (req, res) => {
		const id = req.params.id
		try {
			const deletedDoc = await Quotes.findByIdAndDelete(id)
			return JSONResponse.success(res, undefined, deletedDoc)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}
}

module.exports = QuoteController
