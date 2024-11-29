import { createContext, useEffect, useState } from "react";
// importing products array from local storage
import { products } from "../assets/assets";
import {toast} from "react-toastify";

// create context for the shop for components to consume
export const ShopContext = createContext();

// provider component which provides values like currency, products, and delivery_fee
const ShopProvider = ({children}) => {
  const currency = "KES"; //default curreny in Kenyan Shilling
  const delivery_fee = 100;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);
  
  const addToCart = async (productId, size) =>{
    if(!size){
      toast.error("Select Product Size");
      return;
    }
        let updatedCartItems = structuredClone(cartItems);

        if(updatedCartItems[productId]){
          if(updatedCartItems[productId][size]){
            updatedCartItems[productId][size]++;
          }
          else{
            updatedCartItems[productId][size] = 1;
          }
        }
        else{
          updatedCartItems[productId] = {};
          updatedCartItems[productId][size] = 1;
        }
        setCartItems(updatedCartItems);
  }

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
  };
    
  

  return (
    // components wrapped by provider can access the context values
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
};

export default ShopProvider;
