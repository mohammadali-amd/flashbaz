import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleWare/errorMiddleware.js'

dotenv.config()

connectDB() // Connect to MongoDB

const app = express()
app.use(cors());

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie Parser middleware
app.use(cookieParser())

app.get('/', (req, res) => {
   res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);