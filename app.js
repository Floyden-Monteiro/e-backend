const express = require("express");
require("dotenv").config();
const app = express();
const morgon = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

//for swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//regular middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//cookies and file middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//tempcheck
app.set("view engine", "ejs")

//morgan middleware
app.use(morgon("tiny"));

//import all routes here
const home = require("./routes/home");
const signup = require("./routes/user");
const product = require("./routes/product");
const payment = require("./routes/payment");
const order = require("./routes/order");

//router middleware
app.use("/api/v1", home);
app.use("/api/v1", signup);
app.use("/api/v1", product);
app.use("/api/v1", payment);
app.use("/api/v1", payment);
app.use("/api/v1", order);

app.get("/signuptest", (req , res)=>{
  res.render("signup")
})

// export app js
module.exports = app;
