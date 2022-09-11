//	You will need to create a password to use with applications, your normal gmail password will not work
//	https://myaccount.google.com/security >> Signing Into Google >> Setup App Passwords
require('dotenv/config')
const nodemailer = require('nodemailer')

class Emailer {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MAIL_USERNAME,
				pass: process.env.MAIL_PASSWORD,
			},
		})
	}
	/**
	 * Sends an email to the intended recipient.
	 * @param {*} to - The recipient or recipient array for the email
	 * @param {*} subject - The subject of the email
	 * @param {*} body - The body of the email
	 */
	static sendMail(to, subject, body) {
		let mailOptions = {
			to,
			subject,
			from: this.owner,
			text: body,
		}

		console.log(mailOptions)
		this.transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.error(error)
			} else {
				console.log('Email sent: ' + info.response)
			}
		})
	}
}

module.exports = Emailer
