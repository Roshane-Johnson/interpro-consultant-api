const Service = require('../models/service')
const JSONResponse = require('../helpers/response.helper')

class ServiceController {
	static createOne = async (req, res) => {
		try {
			const service = await Service.create(req.body)
			return JSONResponse.success(res, 'service created!', service, 201)
		} catch (err) {
			return JSONResponse.error(res, 'error creating services', err)
		}
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
