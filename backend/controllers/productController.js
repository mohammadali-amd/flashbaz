import asyncHandler from "../middleWare/asyncHandler"
import Product from "../models/productModel"

// @desc Fetch all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
   const products = await Product.find({})
   res.json(products)
})

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
export const getProduct = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id)

   if (product) {
      return res.json(product)
   } else {
      res.status(404)
      throw new Error('Recource not found')
   }
})