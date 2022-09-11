const JSONResponse = require('../helpers/response.helper')

const Service = require('../models/service')
const Role = require('../models/role')
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
		const roles = [{ type: 'admin' }, { type: 'user' }]

		try {
			const insertedDocs = await Role.insertMany(roles)
			return JSONResponse.success(res, undefined, insertedDocs)
		} catch (err) {
			return JSONResponse.error(res, undefined, err)
		}
	}

	static setupAdmin = async (req, res) => {
		let adminRoleID

		const roles = await Role.find().catch((error) =>
			JSONResponse.error(res, 'unable to find roles', error)
		)

		// no roles are in the database
		if (roles.length <= 0) {
			console.log('No roles found creating one now...')

			const createdRole = await Role.create({ type: 'admin' }).catch(
				JSONResponse.error(res, 'unable to create admin role', error)
			)

			adminRoleID = createdRole.id
		} else {
			const adminRole = roles.filter((role) => role.type == 'admin')[0]
			if (adminRole) adminRoleID = adminRole.id
		}

		const superUser = await User.create({
			email: 'xyz@mail.com',
			password: 'p@$$w0rd',
			role: '63102e20a8cb528820cff2be',
		}).catch((error) => console.log(error))

		// JSONResponse.success(res, 'admin created!', superUser)

		// const duplicateEntryCode = 11000

		// if (error.code == duplicateEntryCode)
		// 	return JSONResponse.error(res, 'duplicate entry found', null)
	}
}

module.exports = SetupController
