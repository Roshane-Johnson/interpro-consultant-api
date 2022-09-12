require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressRoutes = require('express-list-routes')
const cors = require('cors')
const app = express()

const PRODUCTION = process.env.NODE_ENV == 'development'

const MONGODB_URI = PRODUCTION ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI
const FRONTEND_URL = PRODUCTION ? process.env.FRONTEND_URL_PROD : process.env.FRONTEND_URL

const indexRouter = require('./routes/index.routes')
const authRouter = require('./routes/auth.routes')
const setupRouter = require('./routes/setup.routes')
const serviceRouter = require('./routes/services.routes')
const quoteRouter = require('./routes/quotes.routes')
const adminNoteRouter = require('./routes/admin-notes.routes')
const messageRouter = require('./routes/messages.routes')
const messageLogRouter = require('./routes/message-logs.routes')

if (!PRODUCTION) app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors([FRONTEND_URL]))

const API_VERSION = '/api/v1'

app.use(API_VERSION + '/', indexRouter)
app.use(API_VERSION + '/auth', authRouter)
app.use(API_VERSION + '/setup', setupRouter)
app.use(API_VERSION + '/services', serviceRouter)
app.use(API_VERSION + '/quotes', quoteRouter)
app.use(API_VERSION + '/messages', messageRouter)
app.use(API_VERSION + '/message-logs', messageLogRouter)
app.use(API_VERSION + '/admin/note', adminNoteRouter)

mongoose.connect(MONGODB_URI, (err) => {
	const PORT = process.env.PORT || 3000

	if (err) throw new Error(err.message)

	console.log('MongoDB Connected!')

	app.listen(PORT, function () {
		console.log(`Server listening on http://localhost:${PORT}`)
	})
})
