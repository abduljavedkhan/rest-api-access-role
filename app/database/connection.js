const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongodb connection
    const con = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/localDB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log(`MongoDB connected : ${con.connection.host}`);
  } catch (err) {
    console.log(`Database Error : ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
