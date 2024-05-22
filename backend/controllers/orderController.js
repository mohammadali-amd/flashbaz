import asyncHandler from "../middleWare/asyncHandler.js"
import Order from "../models/orderModel.js"

// @desc Create new order
// @route POST /api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
   const {
      orderItems,
      shippingAddress,
      paymentMethod,
      // itemsPrice,
      // taxPrice,
      // shippingPrice,
      totalPrice,
   } = req.body

   if (orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('No order item')
   } else {
      const order = new Order({
         orderItems: orderItems.map((item) => ({
            ...item,
            product: item._id,
            _id: undefined
         })),
         user: req.user._id,
         shippingAddress,
         paymentMethod,
         // itemsPrice,
         // taxPrice,
         // shippingPrice,
         totalPrice,
      })
      const createOrder = await order.save()

      res.status(201).json(createOrder)
   }
})

// @desc Get logged in users orders
// @route GET /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
   const orders = await Order.find({ user: req.user._id })
   res.status(200).json(orders)
})

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id).populate('user', 'name email')

   if (order) {
      res.status(200).json(order)
   } else {
      res.status(404)
      throw new Error('Order not found')
   }

})

// @desc Update order by paid
// @route GET /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
   res.send("update order to paid")
})

// @desc Update order by deliveres
// @route GET /api/orders/:id/deliver
// @access Private/Admin
export const updateOrderToDeliveres = asyncHandler(async (req, res) => {
   res.send("update order to deliveres")
})

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
   res.send("get all order")
})