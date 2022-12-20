import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(process.env.MONGODB_URI)
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

export default connectDatabase;