class IndexController {
	static index = (req, res) => {
		res.json({
			message: 'InterPro Consultant 👋',
			data: {
				version: 'v0.2.0',
				question: 'What brought you to this page?',
				hint: 'POSTmalone',
			},
			error: null,
		})
	}

	static answer = (req, res) => {
		res.json({
			message:
				'I love a good easter egg, check out my github @ https://github.com/roshane-johnson',
			data: null,
			error: null,
		})
	}
}

module.exports = IndexController
