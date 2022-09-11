require('dotenv/config')
const axios = require('axios').default
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageLog = require('./message-log')

const QuoteSchema = new Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true },
		phoneNumber: { type: Number },
		service: {
			type: Schema.Types.ObjectId,
			ref: 'services',
			required: [true, 'a service id is required'],
		},
		company: { type: String },
		budget: { type: Number },
		message: { type: String, required: true },
		status: { type: String, enum: ['active', 'inactive'], default: 'active' },
	},
	{ timestamps: true, collection: 'quotes' }
)

QuoteSchema.post('save', async (savedDocument, next) => {
	const body = JSON.stringify({
		recipient_type: 'individual',
		messaging_product: 'whatsapp',
		to: '18762320468',
		type: 'template',
		template: {
			name: 'new_quote',
			language: {
				code: 'en_US',
			},
			components: [
				{
					type: 'body',
					parameters: [
						{
							type: 'text',
							text: savedDocument.fullName,
						},
						{
							type: 'text',
							text: savedDocument.email,
						},
						{
							type: 'text',
							text:
								'$' +
								Intl.NumberFormat('en-US', { currency: 'USD' }).format(
									parseInt(savedDocument.budget, 10)
								),
						},
						{
							type: 'text',
							text: savedDocument.message
								.replaceAll('\n', ' ')
								.replaceAll('\t', ''),
						},
					],
				},
			],
		},
	})

	const resp = await axios({
		method: 'POST',
		url: 'https://graph.facebook.com/v13.0/106126032237833/messages',
		headers: {
			Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
			'Content-Type': 'application/json',
			'Content-Length': body.length,
		},
		data: body,
	}).catch(({ response: resp }) => {
		console.log('Error has value', resp.data.error || resp.data || resp) //works from left to right, then prints the first value that's not UN-DEFINED
		console.log('error! sending message to WhatsApp!')
		next()
	})

	const sentMessageData = resp.data

	await MessageLog.create(sentMessageData).catch((error) => {
		console.log(error)
		next()
	})
})

module.exports = mongoose.model('quotes', QuoteSchema)
