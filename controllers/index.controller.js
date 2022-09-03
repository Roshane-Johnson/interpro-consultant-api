class IndexController {
	static index = (req, res) => {
		res.json({
			message: 'InterPro Consultant 👋',
			version: 'v0.2.0',
			question: 'What brought you to this page?',
			proTip: 'Send a POST request for a suprise',
		})
	}

	static indexAnswer = (req, res) => {
		res.json({
			message:
				'It seems like you have a lot of free time, would you like to work for InterPro Consultant?',
		})
	}
}

module.exports = IndexController
