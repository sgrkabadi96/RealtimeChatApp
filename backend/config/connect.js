const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log("DB Connected");
  } catch (err) {
    throw err;
  }
};

module.exports = connectDB;
