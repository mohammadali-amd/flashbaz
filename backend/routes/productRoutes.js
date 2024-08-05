import express from 'express'
import { admin, protect } from '../middleWare/authMiddleware.js'
import { createProductReview, createProducts, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProducts)
router.route('/:id').get(getProduct).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)
router.route('/:id/reviews').post(protect, createProductReview)

export default router