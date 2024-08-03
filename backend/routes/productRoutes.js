import express from 'express'
import { admin, protect } from '../middleWare/authMiddleware.js'
import { createProducts, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProducts)
router.route('/:id').get(getProduct).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)

export default router