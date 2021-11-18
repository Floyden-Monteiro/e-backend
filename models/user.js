const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [30, "Name should be under 30 characters"],
    minlength: [3, "Name should b e atleast 3 char"],
  },

  email: {
    type: String,
    required: [true, "Please provide an Email"],
    validate: [validator.isEmail, "Please enter email in correct format"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a Password"],
    minlength: [6, "Password should be atleast 6 char"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  photo: {
    id: {
      type: String,
      require:true,
    },
    secure_id: {
      type: String,
      require:true,
    },
  },
  forgotPasswordToken: String,
  forgotPassworExpiry: Date,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

//encrypt password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// validate the password  with passed on user password
userSchema.methods.isValidatedPassword = async function (ueserSendPassword) {
  return await bcrypt.compare(ueserSendPassword, this.password);
};

//create ane retrun jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//generate forgot password token
userSchema.methods.getForgotPasswordToken = function () {
  //generate a long and  random string
  const forgotToken = crypto.randomBytes(20).toString("hex");

  //   this.forgotPasswordToken = forgotToken;

  //getting a hash - make sure to get a hash on backend
  this.forgotPasswordToke = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex");

  //time of token
  this.forgotPassworExpiry = Date.now() + 20 * 60 * 1000;

  return forgotToken;
};

module.exports = mongoose.model("User", userSchema);
