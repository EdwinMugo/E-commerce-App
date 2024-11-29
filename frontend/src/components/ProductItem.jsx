import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

function ProductItem({ id, image, name, price }) {
  // Access currency from the context object
  const { currency } = useContext(ShopContext);

//   format the price by adding commas as thousands separators, useMomo to avoid recalculating on every render
const formattedPrice = useMemo(() => new Intl.NumberFormat('en-US').format(price), [price]);


  return (
    // product container
    <div className="flex flex-col justify-between h-full p-4 border rounded-lg shadow ">
      <div className="cursor-pointer text-gray-700 flex-grow">

        {/* product details */}
        <Link to={`/product/${id}`}>
          <div className="overflow-hidden">
            <img
              className="hover:scale-110 transition ease-in-out w-full object-cover"
              src={image[0]}
              alt="product image"
            />
          </div>
          <p className="pt-3 pb-1 text-sm line-clamp-2"> {name}</p>
          <p className="text-sm font-medium">
            {currency} {formattedPrice}
          </p>
        </Link>
      </div>

      {/* add to cart button */}
      {/* {<Link to={`/product/${id}`}>
      <div className="mt-4">
          <button className="font-semibold whitespace-nowrap text-sm md:text-base border rounded-full bg-[#8F4465] text-white h-10 w-full max-w-36 flex items-center justify-center cursor-pointer hover:bg-[#B36A8D] transition duration-300">
            VIEW PRODUCT
          </button>

      </div>
      </Link> } */}
    </div>
  );
}

export default ProductItem;
