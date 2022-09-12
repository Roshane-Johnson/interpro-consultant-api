require('dotenv/config')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const REQUIRED_STRING = { type: String, required: true }

const MessageSchema = new Schema(
	{
		email: { ...REQUIRED_STRING },
		message: { ...REQUIRED_STRING, unique: true },
	},
	{ timestamps: true, collection: 'messages' }
)

MessageSchema.post('save', async (document) => {
	const enabled = true
	const html = `<style>*{margin:0;padding:0;box-sizing:border-box}.body{display:grid;place-items:center;height:50vh;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif}.card{padding:30px 50px;color:#292d34;background-color:#fff;border:solid 1px #0000001f;border-radius:.475rem;width:50%}#main{display:flex;justify-content:space-between;align-items:center;margin:0 auto}h2{font-weight:700}</style><div class="body"><div class="card" id="main"><div><h2>InterPro Consultant</h2><p>We received your message, we will respond as soon as possible.</p></div></div></div>`

	if (enabled) {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: process.env.EMAIL_USERAME, //'gp2000101@gmail.com'
				pass: process.env.EMAIL_PASSWORD, //'agbxpkteoapwajed'
			},
		})

		const info = await transporter
			.sendMail({
				from: '"InterPro Consultant 🔷" <no-reply.interpro-consultant.web.app>',
				to: document.email,
				subject: 'We got your message',
				text: 'We got your message, we will response as soon as possible.',
				html,
			})
			.catch((error) => {
				console.log(error)
			})
	}
})

module.exports = mongoose.model('messages', MessageSchema)
