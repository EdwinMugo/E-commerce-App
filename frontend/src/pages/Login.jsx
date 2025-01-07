import React, { useState } from 'react'

function Login() {
  const [currentState, setCurrentState]= useState('Sign up');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col item-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl font-prata'>{currentState} </p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>

      </div>
      {currentState === 'Login' ? '' : <input type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Username' required/> }
      <input type='email' className='w-full px-3 py-2  border border-gray-800' placeholder='Email' required/>
      <input type='password' className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
       {
        currentState === 'Sign up' ? '' : <p className='cursor-pointer'> Forgot your Password</p>
       }
        
        {
        currentState === 'Login' ?
        <p onClick={()=> setCurrentState('Sign up')} className='cursor-pointer'> Create Account</p> :
        <p onClick={()=> setCurrentState('Login')} className='cursor-pointer'> Login Here</p> 
        }
      </div>

      <button className='bg-[#C586A5] text-white font-light px-8 py-2 mt-4'> { currentState === 'Login' ? "Sign in" : "Sign up" }</button>
        
    </form>
  )
}

export default Login