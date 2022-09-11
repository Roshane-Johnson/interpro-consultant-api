const AdminNote = require('../models/admin-note')
const JSONResponse = require('../helpers/response.helper')

class MessageLogController {
	static getAll = (req, res) => {
		AdminNote.find()
			.then((notes) => {
				if (notes) {
					const successMessage =
						notes.length <= 0 ? 'notes are empty right now' : 'notes found'
					return JSONResponse.success(res, successMessage, notes)
				}
			})
			.catch((error) => JSONResponse.error(res, 'error finding notes', error))
	}

	static update = (req, res) => {
		const { note } = req.body

		AdminNote.find()
			.then((notes) => {
				// default note DOES NOT EXIST
				if (notes.length <= 0) {
					console.log('Genesis note not found\n Creating one now...')

					AdminNote.create({ note })
						.then((note) => {
							return JSONResponse.success(res, 'noted updated', note)
						})
						.catch((error) =>
							JSONResponse.error(res, 'error creating resource', error)
						)
				} else {
					// default note EXISTS
					const noteID = notes[0].id

					if (note) {
						AdminNote.findByIdAndUpdate(noteID, { note }, { new: true })
							.then((resp) => {
								return JSONResponse.success(res, 'noted updated', resp)
							})
							.catch((error) =>
								JSONResponse.error(res, 'error updating resource', error)
							)
					} else {
						return JSONResponse.error(res, 'note is required', null)
					}
				}
			})
			.catch((error) => JSONResponse.error(res, 'error finding resource', error))
	}
}

module.exports = MessageLogController
