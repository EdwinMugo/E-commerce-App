import express from "express";
import {
  addProducts,
  singleProducts,
  removeProducts,
  listProducts,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// add new product route
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]), 
  addProducts
);

// get single product route
productRouter.post("/single", singleProducts);

// remove product route
productRouter.delete("/remove/:id", adminAuth, removeProducts);

// get all products route
productRouter.get("/list", listProducts);

export default productRouter;
