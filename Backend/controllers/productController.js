import {v2 as cloudinary} from 'cloudinary';
import ProductModel from '../models/productModels.js';



// function for add products 
const addProducts = async (req, res)=> {
    try{
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body;

        const priceNumber = Number(req.body.price);

        // check if price is a number
        if (isNaN(priceNumber)) {
            return res.status(400).json({ success: false, message: "Invalid price. Must be a number." });
                   }

        const image1 = req.files.image1 ? req.files.image1[0]: null;
        const image2 = req.files.image2 ? req.files.image2[0]: null;
        const image3 = req.files.image3 ? req.files.image3[0]: null;
        const image4 = req.files.image4 ? req.files.image4[0]: null;

        const images =[image1, image2, image3, image4].filter(Boolean); // filter the null or undefines images

        const imagesURL = await Promise.all(
            images.map(async (item) => {
                try {
                    const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                    return result.secure_url;
                } catch (error) {
                    throw new Error("Error uploading image: " + error.message);
                }
            })
        );
        

        const productData ={
            name,
            description,
            price: priceNumber,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller==="true" ? true : false,
            images: imagesURL,
            date: Date.now()
        }
        console.log(productData);
      
        const product = new ProductModel(productData);
        await product.save();
        res.status(201).json({success: true, message: 'Product added successfully'});

    }catch(err){
        console.log(err);
         res.json({success: false, message: err.message});
    }
};

// function for list products
const listProducts = async (req, res)=> {
    try{
        const products = await ProductModel.find({});
        res.json({success: true, products});

    }catch(err){
        console.log(err);
        res.json({success: false, message: err.message});
    }

};

// function for remove  products
const removeProducts = async (req, res)=> {
    try{
        const productId = req.params.id;
        console.log("Product ID to delete:", productId);
        const deleteProduct = await ProductModel.findByIdAndDelete(productId);

        if(!deleteProduct){
            return res.json.status(404).json({success: false, message:"Product not found"});
        }
        res.json({success: true, message: 'Product removed successfully'});
    }catch(err){
        console.log(err);
        res.json({success: false, message: err.message});
    }

};

// function for single products info
const singleProducts = async (req, res)=> {
    try{
        const {productId} = req.body;
        const product = await ProductModel.findById(productId);
        res.json({success: true, product});

    } catch(err){
        console.log(err);
        res.json({success: false, message: err.message});
    }

};

export {addProducts, removeProducts, listProducts, singleProducts};