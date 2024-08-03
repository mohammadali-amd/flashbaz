import express from 'express'
import { admin, protect } from '../middleWare/authMiddleware.js'
import { createProducts, getProduct, getProducts } from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProducts)
router.route('/:id').get(getProduct)

export default router