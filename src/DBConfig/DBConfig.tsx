import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("DB NOT CONNECTED", err);
      process.exit();
    });
  } catch (error) {
    console.log("SOmething went Wrong", error);
  }
}
