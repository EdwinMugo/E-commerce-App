import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { OrbitProgress } from "react-loading-indicators";

function Add({ token }) {
  //use state to store the images
  const [image, setImage] = useState([null, null, null, null]);

  //useState to store product name
  const [name, setName] = useState("");

  //preview url state
  const [previewUrl, setPreviewUrl] = useState([null, null, null, null]);

  //useState to store product description
  const [description, setDescription] = useState("");

  //useState to store product price
  const [price, setPrice] = useState("");

  //useState to store product sizes
  const [sizes, setSizes] = useState([]); // holds an array of sizes

  //useState to store product bestseller status
  const [bestseller, setBestseller] = useState(false);

  //useState to store product category
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]); // holds an array of subcategories

  const [loading, setLoading] = useState(false); // Loading state

  //define the category options
  const categoryOptions = {
    Wines: ["White Wine", "Red Wine"],
    Beers: ["Beers", "Ciders"],
    Spirits: ["Rum", "Gin", "Whiskey", "Tequila", "Cognac"],
    Mixers: ["Non-Alcoholic", "Infusions"],
  };
  // handle category Change
  const handleCategoryChange = (e) => {
    const selectCategory = e.target.value; //retrieve the value user selected from dropdown
    setCategory(selectCategory);
    setSubcategories(categoryOptions[selectCategory] || []); // lookup select category, if found update subcategories, if not assign empty array
  };

  // function to manage image upload
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0]; // Get the first selected file

    // Create copies of the state arrays
    if (file) {
      const updatedImages = [...image]; //copy current images array
      const updatedPreviewUrls = [...previewUrl]; // Copy current previewUrl array

      // Update the corresponding index with the new file and preview URL
      updatedImages[index] = file;
      updatedPreviewUrls[index] = URL.createObjectURL(file); //create a preview URL

      // Update the states to trigger re-render
      setImage(updatedImages); // update the state with the updated images array
      setPreviewUrl(updatedPreviewUrls); // Update state properly
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subcategories[0]);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes)); // convert sizes array to string

      image.forEach((img, index) => {
        if (img) {
          formData.append(`image${index + 1}`, img);
        }
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data", token } }
      );

      if(response.data.success) {
        toast.success("Product added successfully");
      }
      
    } catch (e) {
      toast.error("Error Adding Product ");
      console.error(e);
    } finally {
      setLoading(false); // Stop loading

      // Reset form fields
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setSubcategories([]);
      setBestseller(false);
      setSizes([]);
      setImage([null, null, null, null]);
      setPreviewUrl([null, null, null, null]);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {loading && (
        <div className="flex justify-center items-center w-full">
          <OrbitProgress
            color="#cae9ca"
            size="small"
            text=""
            textColor="#320c0c"
          />
        </div>
      )}

      <div>
        <p className="mb-2"> Upload Image</p>
        <div className="flex gap-2">
          {[...Array(4)].map((_, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20"
                src={previewUrl[index] || assets.upload_area}
                alt="uploader Preview"
              />
              <input
                onChange={(e) => handleImageUpload(e, index)}
                type="file"
                id={`image${index + 1}`}
                name={`image${index + 1}`}
                accept="image/jpeg, image/png"
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2"> Product Name </p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Name of Product"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2"> Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Product description details"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2"> Product Category</p>
          <select
            className="w-full px-3 py-2"
            onChange={handleCategoryChange}
            value={category}
            required
          >
            <option value="" disabled>
              {" "}
              Select a Category
            </option>
            {Object.keys(categoryOptions).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2"> Sub Category</p>
          <select
            onChange={(e) => setSubcategories([e.target.value])}
            value={subcategories[0] || ""}
            className="w-full px-3 py-2"
            required
          >
            <option value="" disabled>
              {" "}
              Select a Subcategory{" "}
            </option>
            {subcategories.map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2"> Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2"> Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("1l Bottle")
                  ? prev.filter((item) => item !== "1l Bottle")
                  : [...prev, "1l Bottle"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("1l Bottle") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              {" "}
              1l Bottle
            </p>
          </div>
          <div
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("750ml Bottle")
                  ? prev.filter((item) => item !== "750ml Bottle")
                  : [...prev, "750ml Bottle"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("750ml Bottle") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              {" "}
              750ml Bottle
            </p>
          </div>
          <div
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("350ml Bottle")
                  ? prev.filter((item) => item !== "350ml Bottle")
                  : [...prev, "350ml Bottle"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("350ml Bottle") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              {" "}
              350ml Bottle
            </p>
          </div>
          <div
            onClick={(e) =>
              setSizes((prev) =>
                prev.includes("250ml Bottle")
                  ? prev.filter((item) => item !== "250ml Bottle")
                  : [...prev, "250ml Bottle"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("250ml Bottle") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              {" "}
              250ml Bottle
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          {" "}
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white"
        disabled={loading}
      >
        {loading ? "Submitting" : "Add Product"}
      </button>
    </form>
  );
}

export default Add;
