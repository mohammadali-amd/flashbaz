import asyncHandler from "../middleWare/asyncHandler.js"
import Product from "../models/productModel.js"

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

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
export const createProducts = asyncHandler(async (req, res) => {
   const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/image/sample.jpg',
      brand: 'Sample brand',
      category: 'Electronics',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
   })

   const createdProduct = await product.save()
   res.status(201).json(createdProduct)
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
   const { name, price, image, brand, category, countInStock, description } = req.body

   const product = await Product.findById(req.params.id)

   if (product) {
      product.name = name
      product.price = price
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
      product.description = description

      const updatedProduct = await product.save()
      res.json(updatedProduct)
   } else {
      res.status(404)
      throw new Error('Resourse not found.')
   }
})