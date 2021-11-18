const mongoose = require("mongoose");

const connetWithDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB GOT CONNECTED SUCCESSFULLY"))
    .catch((error) => {
      console.log("DB Not connected");
      console.log(error);
      process.exit(1);
    });
};

module.exports = connetWithDb;
