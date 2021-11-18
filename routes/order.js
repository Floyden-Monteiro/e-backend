const express = require("express");
const {
  createOrder,
  getOneOrder,
  getLoggedInOrders,
  admingetAllOrders,
  adminDeleteOrder,
  adminUpdateOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/order/create").post(isLoggedIn, createOrder);
router.route("/myorder").get(isLoggedIn, getLoggedInOrders);
router.route("/order/:id").get(isLoggedIn, getOneOrder);

//admin routes
router
  .route("/admin/orders")
  .get(isLoggedIn, customRole("admin"), admingetAllOrders);
router
  .route("/admin/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOrder)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOrder);
router;

module.exports = router;
