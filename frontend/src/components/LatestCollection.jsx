import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';


function LatestCollection() {
    // extract products from ShopContext using useContext hook
const {products} = useContext(ShopContext);

// create a state variable to hold the latest 10 products, and update it whenever products change.  
const [latestProducts, setLatestProducts] = useState([]);

// useEffect hook to update this state whenever products change.  This will cause the component to re-render with the latest 10 products.  We also add a dependency array to the useEffect hook, so it only runs when products change.  This will prevent unnecessary re-renders
useEffect(() => {
    if(products && products.length > 0){ 
    // Using slice(0, 10) to get the first 10 products
    setLatestProducts(products.slice(0, 10));
}
}, [products])

  return (
    <div className='my-10 '>
        <div className='text-center py-8 text-2xl'>
        <Title text1={'NEW'} text2={'ARRIVALS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Discover our curated selection of premium spirits and wines, handpicked to elevate every occasion. Cheers to new tastes and timeless classics!
         </p>
        </div>

        {/* rendering products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '> 
            {
                latestProducts.map((item, index) =>{
                    return( 
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                )})
            }

        </div>

    </div>
  )
}

export default LatestCollection