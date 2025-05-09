import mongoose from "mongoose";

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "Chatter" })
    .then((data) => {
      console.log(`DB connected:${data.connection.host}`);
    })
    .catch((err) => {
      throw err;
    });
};

export { connectDB };
