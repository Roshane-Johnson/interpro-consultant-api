const Service = require('../models/services')
const Role = require('../models/roles')
const { JSONResponse } = require('../helper')

class SetupController {
	static setupServices = async (req, res) => {
		const services = [
			{ name: 'Web Development' },
			{ name: 'Mobile App Development' },
			{ name: 'Website Hosting' },
			{ name: 'API Development' },
		]

		try {
			const insertedDocs = await Service.insertMany(services)
			return JSONResponse.success(res, undefined, insertedDocs)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static setupRoles = async (req, res) => {
		const roles = [{ type: 'user' }, { type: 'admin' }]

		try {
			const insertedDocs = await Role.insertMany(roles)
			return JSONResponse.success(res, undefined, insertedDocs)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}
}

module.exports = SetupController
