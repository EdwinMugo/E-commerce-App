import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";


// app configuration
const app = express();
const port = process.env.PORT || 4000;
connectDB()


// middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.get('/', (req, res) =>{
    res.send('API is working');
});

// start server
app.listen(port, ()=> console.log('server started on port ' + port));
