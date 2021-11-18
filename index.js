const app = require("./app");
require("dotenv").config();
const connectWithDB = require("./config/db");

const cloudinary = require("cloudinary");

// cloudinary config goes here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//CONNECTED WITH DATABASES
connectWithDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port: ${process.env.PORT}...`);
});
