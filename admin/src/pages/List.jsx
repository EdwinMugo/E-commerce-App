import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

function List({token}) {

  const currency = 'KSH';
  // get data from the API

  const [list, setList]= useState([]);

  const fetchListData = async() => {
     try{
      const response = await axios.get(`${backendUrl}/api/product/list`);
      // console.log("API Response:", response.data); // Debugging line 


      if(response.data.success){
        setList(response.data.products);
      } else{
        toast.error(response.data.message);
      }
      
     }catch(e){
      console.error(e);
      toast.error("Error fetching data from the API");
     }
  }

  const removeProduct = async(id) => {
    try{
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {headers: {token}});

      if(response.data.success){
        toast.success("Product removed successfully");
        await fetchListData();
      } else{
        toast.error(response.data.message);
      }


    }catch(e){
      console.error(e); 
      toast.error(e.message);
    }

  }

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <>
    <p className='mb-2'> All Products List</p>

    <div className='flex flex-col gap-2'>

      {/* {table list} */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>price</b>
        <b className='text-center'>Action</b>
      </div>
      {/* {Product lists} */}

      {
        list.map((item, index)=> (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 border text-sm' key={index}>
            {item.images?.length > 0 && < img className='w-14' src={item.images[0]} alt="product image" />}
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price} {currency}</p>
            <p onClick={()=> removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg '>x</p>
          </div>
        ))

      }
    </div>
      
    </>
  )
}

export default List
