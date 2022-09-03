const Service = require('../models/services')
const { JSONResponse } = require('../helper')

class ServiceController {
	static createOne = async (req, res) => {
		const service = await Service.create(req.body)
	}

	static getAll = async (req, res) => {
		try {
			const services = await Service.find()
			return JSONResponse.success(res, 'sucess', services)
		} catch (err) {
			return JSONResponse.error(res, 'error getting services', err)
		}
	}

	static getOne = async (req, res) => {}

	static updateOne = async (req, res) => {}

	static deleteOne = async (req, res) => {}
}

module.exports = ServiceController
