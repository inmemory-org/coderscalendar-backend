import mongoose from "mongoose";
import "dotenv/config";

const mongoURI = process.env.MONGODB_URL;

export default function connectToMongo() {
  mongoose.connect(mongoURI, () => {
    console.log("DB CONNECTED");
  });
}