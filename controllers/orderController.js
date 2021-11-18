const Order = require("../models/order");
const Product = require("../models/product");

const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

exports.createOrder = BigPromise(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getOneOrder = BigPromise(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new CustomError("please check order id", 401));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

exports.getLoggedInOrders = BigPromise(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  if (!order) {
    return next(new CustomError("please check order id", 401));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.admingetAllOrders = BigPromise(async (req, res, next) => {
  const order = await Order.find();
  res.status(200).json({
    success: true,
    order,
  });
});

exports.adminUpdateOrder = BigPromise(async (req, res, next) => {
  const order = await Order.findById(req.parama.id);

  if (order.orderStatus === "Delivered") {
    return next(new CustomError("order is already maked for deliverd", "401"));
  }
  order.orderStatus = req.body.orderStatus;

  order.orderItems.forEach(async (prod) => {
    await updateProductStock(prod.product, prod.quantiy);
  });

  await order.save();
  res.status(200).json({
    success: true,
    order,
  });
});

exports.adminDeleteOrder = BigPromise(async (req, res, next) => {
  const order = await Order.findById(req.parama.id);

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

async function updateProductStock(productId, quantiy) {
  const product = await Product.findById(productId);

  product.stock = product.stock - quantiy;

  await product.save({ validateBeforesave: false });
}
