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

	static setupAdmin = async (req, res) => {
		const bcryptHashedPassword =
			'$2a$10$oCmBZWMkWH2/vl2FImr8h.A2qn05YGQRvFkpfZR8boclO6OnzNPL2' //password

		try {
			const superUser = await User.create({
				username: 'roshane',
				password: bcryptHashedPassword,
				role: '6313870b4454b0bfd6027bdf',
			})

			return JSONResponse.success(res, 'admin created!', superUser)
		} catch (error) {
			JSONResponse.error(res, undefined, error)
		}
	}
}

module.exports = SetupController
