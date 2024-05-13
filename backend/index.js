import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleWare/errorMiddleWare.js'

dotenv.config()

connectDB() // Connect to MongoDB

const app = express()
app.use(cors());

app.get('/', (req, res) => {
   res.send('API is running...')
})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);