import mongoose, {model, Schema} from 'mongoose';

//define the schema which is the structure of the data 

const prodSchema= new mongoose.Schema({
    name: {type:String, required:true, trim:true},
    description: {type:String, required:true, trim:true},
    price: {type:Number, required:true, min: 0},
    images: {type:[String], required:true},
    category: {type:String, required:true, trim:true},
    subCategory: {type:String, required:true, trim:true},
    sizes: {type:[String], required:true},
    bestseller: {type:Boolean, default:false},
    date: {type:Date, default: Date.now}
}, {timestamps:true});

// create a model to enable CRUD operations

const ProductModel = mongoose.models.products || mongoose.model('products', prodSchema); //ensure the mongoose model is created only once in the apps lifecycle

export default ProductModel;