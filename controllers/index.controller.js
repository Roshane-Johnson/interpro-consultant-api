class IndexController {
	static index = (req, res) => {
		res.json({
			message: 'InterPro Consultant 👋',
			version: 'v0.2.0',
			question: 'What brought you to this page?',
			hint: 'POSTmalone',
		})
	}

	static answer = (req, res) => {
		res.json({
			message:
				'It seems like you have a lot of free time, would you like to work for InterPro Consultant?',
		})
	}
}

module.exports = IndexController
