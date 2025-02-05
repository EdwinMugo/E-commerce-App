import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
    // Mongoose connection options
    mongoose.connection.on('connected', ()=> {
        console.log("MongoDB connected successfully");
    })
    await mongoose.connect (`${process.env.MONGODB_URI}/e-commerce`);

};

export default connectDB;