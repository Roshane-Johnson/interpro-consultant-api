const { JSONResponse } = require('../lib/helper')

const Service = require('../models/services')
const Role = require('../models/roles')
const User = require('../models/user')

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
				email: 'roshane@mail.com',
				password: bcryptHashedPassword,
				// role: '6313870b4454b0bfd6027bdf', //production roleId
				role: '63102e20a8cb528820cff2be', //local roleId
			})

			return JSONResponse.success(res, 'admin created!', superUser)
		} catch (error) {
			const duplicateEntryCode = 11000

			if (error.code == duplicateEntryCode)
				return JSONResponse.error(res, 'duplicate entry found', null)

			return JSONResponse.error(res, 'failed to create admin', error)
		}
	}
}

module.exports = SetupController
