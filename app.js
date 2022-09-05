require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const MONGODB_URI =
	process.env.PROD == true ? process.env.MONGODB_URI_PROD : process.env.MONGODB_URI

const FRONTEND_URL =
	process.env.PROD == true ? process.env.FRONTEND_URL_PROD : process.env.FRONTEND_URL

const indexRouter = require('./routes/index.routes')
const authRouter = require('./routes/auth.routes')
const setupRouter = require('./routes/setup.routes')
const serviceRouter = require('./routes/services.routes')
const quoteRouter = require('./routes/quotes.routes')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors([FRONTEND_URL]))

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/setup', setupRouter)
app.use('/services', serviceRouter)
app.use('/quotes', quoteRouter)

mongoose.connect(MONGODB_URI, (err) => {
	const PORT = process.env.PORT || 3000

	if (err) throw new Error(err.message)

	console.log('MongoDB Connected!')

	app.listen(PORT, () => {
		console.log(`Server listening on http://localhost:${PORT}`)
	})
})
