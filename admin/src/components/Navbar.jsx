import React from 'react';
import {assets} from '../assets/assets';

function Navbar({setToken}) {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
        <img className='w-[max(10%, 80px] sm:w-20 md:w-24 lg:w-32' src={assets.logo} alt="" />
        <button onClick={()=> setToken('')} className='bg-gray-600 text-white px-2 sm:px-7 sm:py-2 rounded-full'> Logout</button>
    </div>
  )
}

export default Navbar
