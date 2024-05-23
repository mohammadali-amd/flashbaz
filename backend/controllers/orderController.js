import asyncHandler from "../middleWare/asyncHandler.js"
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"

// @desc Create new order
// @route POST /api/orders
// @access Private
export const addOrderItems = asyncHandler(async (req, res) => {
   const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

   if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
   }

   const productIds = orderItems.map(item => item._id);

   const productsFromDB = await Product.find({ _id: { $in: productIds } });

   const dbOrderItems = orderItems.map((item) => {
      const product = productsFromDB.find(p => p._id.toString() === item._id);

      if (!product) throw new Error(`Product not found: ${item._id}`);

      return {
         name: product.name,
         qty: item.quantity,
         image: product.image,
         price: product.price,
         product: item._id
      };
   });

   const itemsPrice = dbOrderItems.reduce((acc, item) => acc + item.price * item.qty, 0);

   const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice: itemsPrice,
      taxPrice: 0, // Assuming taxPrice is calculated elsewhere or is 0
      shippingPrice: 0, // Assuming shippingPrice is calculated elsewhere or is 0
      totalPrice,
   });

   const createOrder = await order.save();

   res.status(201).json(createOrder);
});

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