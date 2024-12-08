import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

function Cart() {
  const {products, currency, cartItems, updateQuantity, navigate}= useContext(ShopContext);
  const [cartData, setCartData]= useState([]);

  useEffect(() => {
    // create an empty array to store the cart items
    const tempData = [];

    // iterate over the cart items and add them to the tempData array if the quantity is greater than 0.  This will exclude items with a quantity of 0. 
    for (const productId in cartItems){
      for (const size in cartItems[productId]){
        //check if current size is greater than 0
        if(cartItems[productId][size] > 0){
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItems[productId][size]
          })
      }
    }
    
  }
  setCartData(tempData);
}, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>
      <div>
          {
            cartData.map((item, index)=>{
              const productData = products.find((product)=> product._id === item._id);
              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'> 
                    <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name}/> 
                    <div> 
                      <p onClick={()=> navigate(`/product/${productData._id}`)} className='text-xs sm:text-lg font-medium cursor-pointer'> {productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'> 
                          <p> {currency} {productData.price}</p>
                          <p className='px-2 sm:px-3 sm:py-1 bg-slate-50'> {item.size} </p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e)=>e.target.value === '' || e.target.value === '0'? null : updateQuantity(item._id, item.size, Number(e.target.value)) } className=' flex-row border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type='number' min={1} defaultValue={item.quantity} />
                  <img onClick={()=> updateQuantity(item._id, item.size,0 )} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt='' />
                 </div>)
            } )
          }
      </div>
        
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'> 
            <CartTotal/>
            <div className='w-full text-end'> 
              <button onClick={()=> navigate('/place-order')} className='bg-[#C586A5] text-white text-sm my-8 px-8 py-3'> PROCEED TO CHECKOUT </button>

            </div>

          </div>

        </div>
    </div>
  )
}

export default Cart