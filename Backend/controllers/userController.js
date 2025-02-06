import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET_KEY);

}

// route for user login
const loginUser = async (req, res) => {

}


// route for user registration
const registerUser = async (req, res) => {
 try{
    const {name, email, password} = req.body;
    // check if user already exists
    const userExits = await userModel.findOne({email});

    if(userExits){
        return res.json({success:false, message: "User already exists"});
    } 
    // validating email format and strong password
    if (!validator.isEmail(email)){
        return res.json({success:false, message: "Invalid email format"});
    }
    if(password.length < 8){
        return res.json({success:false, message: "Password must be at least 8 characters long"});
    }

    //hashing the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the user
    const newUser = new userModel({
        name,
        email,
        password: hashedPassword
    });

    const user = await newUser.save();

    const token = createToken(user._id); 

    res.json({success: true, token});

 }catch(err){
    console.log(err);
    res.json({success: false, message: err.message});

 }
}

//route for admin login
const adminLogin = async(req, res) => {

}


export {loginUser, registerUser, adminLogin} 