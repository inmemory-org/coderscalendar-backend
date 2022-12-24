import mongoose from "mongoose";

const connectDatabase = async () => {
  mongoose.set('strictQuery', false);
 await mongoose.connect(process.env.LOCAL_URI)
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

export default connectDatabase;