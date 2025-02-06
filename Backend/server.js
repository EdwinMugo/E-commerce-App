import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";


// app configuration
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary(); // connect cloudinary


// middleware
app.use(express.json());   //Enables JSON parsing
app.use(cors());  // Enable CORS for all origins

// API endpoints
app.use('/api/user', userRouter)

app.use

app.get('/', (req, res) =>{
    res.send('API is working');
});

// start server
app.listen(port, ()=> console.log('server started on port ' + port));
