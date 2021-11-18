const express = require("express");
const {
  sendStripeKey,
  sendRazorpayKey,
  captureStripePayment,
  captureRazorpayPayment,
} = require("../controllers/paymentController");
const router = express.Router();
const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/stripkey").get(isLoggedIn, sendStripeKey);
router.route("/razorapykey").get(isLoggedIn, sendRazorpayKey);

router.route("/capturestripe").post(isLoggedIn, captureStripePayment);
router.route("/capturerazorpay").post(isLoggedIn, captureRazorpayPayment);

module.exports = router;
