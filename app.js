require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const { auth } = require('./middlewares/auth')

const indexRouter = require('./routes/index.routes')
const authRouter = require('./routes/auth.routes')
const setupRouter = require('./routes/setup.routes')
const serviceRouter = require('./routes/services.routes')
const quoteRouter = require('./routes/quotes.routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(['*', 'http://localhost:4200/']))

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/setup', setupRouter) /* the endpoints here should only be used once */
app.use('/services', serviceRouter)
app.use('/quotes', quoteRouter)

mongoose.connect(process.env.MONGODB_URI, (err) => {
	const PORT = process.env.PORT || 3000

	if (err) throw new Error(err.message)

	console.log('MongoDB Connected!')

	app.listen(PORT, () => {
		console.log(`Server listening on http://localhost:${PORT}`)
	})
})