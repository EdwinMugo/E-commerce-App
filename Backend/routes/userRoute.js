import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

// user registration route
userRouter.post('/register', registerUser);

// user login route
userRouter.post('/login', loginUser);

//admin login route
userRouter.post('/admin', adminLogin);

export default userRouter;