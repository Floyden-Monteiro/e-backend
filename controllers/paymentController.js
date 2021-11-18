const BigPromise = require("../middlewares/bigPromise");
const stripe = require("stripe")(process.env.SRIPE_SECRET_KAY);

exports.sendStripeKey = BigPromise((req, res, next) => {
  res.status(200).json({
    stripekey: process.env.SRIPE_API_KAY,
  });
});

exports.captureStripePayment = BigPromise(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",

    //optional
    metadata: { integration_check: "accept_a_payment" },
  });

  //optional
  metadata: {
    integration_check: "accept_a_payment";
  }

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

exports.sendRazorpayKey = BigPromise(async (req, res, next) => {
  res.status(200).json({
    razorpaykey: process.env.RAZORPAY_API_KEY,
  });
});

exports.captureRazorpayPayment = BigPromise(async (req, res, next) => {
  var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  var option = {
    amount: req.body.amount,
    currency: "INR",
  };

  const myOrder = await instance.orders.create(option);

  res.status(200).json({
    success: true,
    amount: req.body.amount,
    order: myOrder,
  });
});
