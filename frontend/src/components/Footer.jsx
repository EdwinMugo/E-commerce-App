import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
        <div className='flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'> 
            <div>
                {/* Logo */}
            <Link to='/'> 
             {/* <img className="w-36" src={assets.logo} alt="Brand logo" /> */}
             <h1 className="text-2xl font-bold text-gray-700 tracking-wide font-robotoCondensed"> Liquor Mart <span className="inline-block rounded-full bg-[#C586A5] w-[10px] h-[10px] ml-0 align-middle"></span></h1>
            </Link>
            <p className='w-full md:w-2/3 text-gray-600'> Your go-to online store for premium spirits and fine wines. Discover top-quality beverages delivered right to your door step. Cheers to effortless shopping!</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5 font-prata text-gray-700'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600 font-outfit'>
                    <li> Home</li>
                    <li> About us</li>
                    <li> Delivery </li>
                    <li> Privacy Policy</li>
                </ul>
            </div>

            <div> 
            <p className='text-xl font-medium mb-5 font-prata text-gray-700'> GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600 font-outfit'>
                <li>+254-702-516-002 </li>
                <li>contact@liquormart.com</li>

            </ul>
            </div>
             
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'> Copyright 2024 @liquor-mart.com  -All rights Reserved. </p>
        </div>
    </div>
  )
}

export default Footer