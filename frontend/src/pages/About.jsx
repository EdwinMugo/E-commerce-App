import React from 'react'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'
import { assets } from '../assets/assets'

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t '> 
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='flex flex-col md:flex-row my-10 gap-16'>
        <img className='w-[400px] md:max-w-[450px]' src={assets.about_img} alt="About us section image"/>
        <div className=' flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'> 
        <p> Liquor-Mart was born out of a passion for exceptional spirits and a desire to transform the way people shop for their favorite alcoholic beverages. Our journey began with a simple idea: to create a platform where customers can effortlessly discover, explore, and purchase a wide array of liquors from the comfort of their homes. </p>
        <p> Since our inception, we've been dedicated to curating a diverse selection of top-quality spirits that cater to every palate and preference. From fine wines and craft beers to premium whiskeys and exotic cocktails, we offer an extensive collection sourced from trusted brands and distilleries worldwide. </p>
        <b className='text-gray-800'> Our Mission</b>
        <p> At Liquor-Mart, we believe in providing an unparalleled shopping experience. Whether you're a connoisseur seeking rare finds or a casual enthusiast looking for your next favorite drink, our meticulously curated selection and commitment to quality ensure that you'll find exactly what you're looking for.</p>
        </div>
      </div>
      <div className='text-4xl py-4'> 
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'> 
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'> 
          <b> Quality Assurance:</b>
          <p className='text-gray-600'>At Liquor-Mart, we promise to deliver only the finest and original liquors, both imported and locally sourced directly from trusted manufacturers. </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'> 
          <b> Convinience:</b>
          <p className='text-gray-600'>Experience the ultimate convenience with Liquor-Mart, where our seamless online platform allows you to shop for your favorite spirits from anywhere, anytime.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'> 
          <b> Customer Support:</b>
          <p className='text-gray-600'>We pride ourselves on offering exceptional customer service, with 24/7 support to assist you at any time, ensuring a seamless and satisfying shopping experience. </p>
        </div>
      </div>

      <Newsletter/>
    </div>
  )
}

export default About