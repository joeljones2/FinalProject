import 'express-async-errors'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import connectDB from './db/connect.js'
import authRouter from './routes/authRoutes.js'
import bookingRouter from './routes/bookingRoutes.js'
import morgan from 'morgan'
import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
// app.use to ensure express shows us json data
app.use(express.json())

app.get('/', (req, res) => {
    res.json({msg : 'Welcome!'})
  })
app.get('/api/v1', (req, res) => {
    res.json({msg : 'Welcome!'})
  })
  
// use imported authRouter
app.use('/api/v1/auth', authRouter)
// use imported bookingRouter
app.use('/api/v1/bookings', authenticateUser, bookingRouter)
// use imported middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
// set port 
const port = process.env.PORT || 5000

// connect to databse and start server - else error
const start = async () =>{
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}
// start server 
start()