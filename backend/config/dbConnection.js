import mongoose from "mongoose";
const connectDb = async () => {
  try {
    const constantConnect = await mongoose.connect(process.env.DB_URI);
    console.log("process.env.DB_URI", process.env.DB_URI);
    console.log(
      "Database connected successfully",
      constantConnect.connection.host,
      constantConnect.connection.name
    );
    return constantConnect;
  } catch (err) {
    console.log("Error while connecting to database", err);
    process.exit(1);
  }
};

export { connectDb };
