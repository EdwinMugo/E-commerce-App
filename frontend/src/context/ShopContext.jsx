import { createContext, useEffect, useState } from "react";
// importing products array from local storage
import { products } from "../assets/assets";
import {toast} from "react-toastify";
import {useNavigate} from 'react-router-dom';

// create context for the shop for components to consume
export const ShopContext = createContext();


// provider component which provides values like currency, products, and delivery_fee
const ShopProvider = ({children}) => {
  const currency = "KES"; //default curreny in Kenyan Shilling
  const delivery_fee = 350;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
  const savedCartItems =localStorage.getItem('cartItems');
 
    return savedCartItems ? JSON.parse(savedCartItems) : {};
  });

  const saveCartToLocalStorage = (cart) => {
    try{
      localStorage.setItem("cartItems", JSON.stringify(cart));
    } catch(e){
      console.error("Error saving cart to local storage", e);
    }
  };
  
  const addToCart = async (productId, size) => {
  if (!size) {
    toast.error("Select Product Size");
    return;
  }

  const updatedCartItems = structuredClone(cartItems);

  // Initialize the product in cart if it doesn't exist
  updatedCartItems[productId] = updatedCartItems[productId] || {};

  // Initialize the size count if it doesn't exist and increment it
  updatedCartItems[productId][size] = (updatedCartItems[productId][size] || 0) + 1;

  setCartItems(updatedCartItems);
  saveCartToLocalStorage(updatedCartItems);
  
};


    const getCartCount= ()=>{
      try{
      let totalCount = 0;
      for(const items in cartItems){
        for(const item in cartItems[items]){
              if(cartItems[items][item] > 0){
                totalCount += cartItems[items][item];
              }
            }
          }
          return totalCount;
        } catch(e){
          return 0;
        }
      };

// function to update the quantity of a specific product and size in the cart
      const updateQuantity= async (productId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        if(quantity === 0){
          // remove item if the quantity is 0
          delete cartData[productId][size];
        if(Object.keys(cartData[productId]).length === 0){
          // remove product if no sizes left in the cart
          delete cartData[productId];
        }
      } else {
        cartData[productId][size] = quantity;
      }
        setCartItems(cartData);
        saveCartToLocalStorage(cartData);
      };
      
      // calculate the total value of items inside the cart
      const getCartAmount = () => {
        let totalAmount = 0;
        for(const productId in cartItems){
          let itemInfo = products.find((product)=> product._id === productId);
          for(const size in cartItems[productId]){
            try{
              if( cartItems[productId][size] > 0){
                totalAmount += cartItems[productId][size] * itemInfo.price;
              }

            }catch(e){
              console.error(`Error calculating total amount for productId: ${productId}, size: ${size}`, e);
          }
        }

      }
      return totalAmount;
    }
          
  // useEffect(() =>{
  //   console.log(cartItems);
  // }, [cartItems]);

  // value object which includes global data
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate, 
  };
    
  

  return (
    // components wrapped by provider can access the context values
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
};

export default ShopProvider;
