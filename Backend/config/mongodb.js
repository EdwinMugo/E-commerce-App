import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {

    try{
        const options = {
            serverSelectionTimeoutMs: 5000, //timeout after 5s to prevent hanging indefinately
        };

    // Mongoose connection options
    mongoose.connection.on('connected', ()=> { //event fired when connection is established
        console.log("MongoDB connected successfully");
    });

    await mongoose.connect (`${process.env.MONGODB_URI}/e-commerce`, options);

    }catch(err){
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); //exit with failure 
    }
};
//handle the connection events for better debugging
mongoose.connection.on('disconnected', ()=> {
    console.log("MongoDB disconnected");
    connectDB(); //attempt to reconnect
});

mongoose.connection.on('error', ()=> {
    console.error(`MongoDB error: ${err.message}`);
});

//gracefully close the MongoDB connection when app stops
process.on('SIGINT', async ()=> {// signal interrupted 
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to app termination");
    process.exit(0); //normal completion
});

export default connectDB;