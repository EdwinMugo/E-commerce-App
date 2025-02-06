import mongoose, {model, Schema} from 'mongoose';

//define the schema which is the structure of the data 
const userSchema= new mongoose.Schema({
    name: {type:String, required:true, trim:true},
    email: {type:String, required:true, trim:true, unique:true},
    password:{type:String, required:true, trim:true},
    cartData: {type: Object, default:{}},
}, {minimize:false}); //Ensures that even empty objects ({}) are stored 

// create a model to enable CRUD operations
const userModel = mongoose.models.users || mongoose.model('users', userSchema); //ensure the mongoose model is created only once in the apps lifecycle

export default userModel;