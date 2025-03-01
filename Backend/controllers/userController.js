import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET_KEY);

}

// route for user login
const loginUser = async (req, res) => {

    try{
    //extract passwaord and email from the req body
    const {email, password} = req.body;

    // check if user exists in the DB
    const user = await userModel.findOne({email});
    
    // if user does not exist return an error message
    if (!user){
        return res.json({success:false, message: "User not found in DB"});
    }
    
    // compare the hashed password with the entered password
    const isMatch = await bcrypt.compare(password, user.password);
    
    // if password match or not to return an error message
    if (isMatch){

        const token = createToken(user._id);
        return res.json({success:true, token});
    } else {
        return res.json({success:false, message: "Incorrect password"});
    }
} catch (e) {
    console.log(e);
    res.json({success: false, message: e.message});
}

}


// route for user registration
const registerUser = async (req, res) => {
 try{
    const {name, email, password} = req.body;
    // check if user already exists in the DB
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

//route for admin login with jwt token authentication
const adminLogin = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign( email+password, process.env.JWT_SECRET_KEY);
            res.json({success: true, token});
        }else {
            res.json({success: false, message: "Invalid admin credentials"});
        }

    }catch(err){
        console.log(err);
         res.json({success: false, message: err.message});
    }

}


export {loginUser, registerUser, adminLogin} 