

function Newsletter() {
    const onSubmitHandler= (e)=> {
        e.preventDefault();
    }

  return (
    <div className="text-center">
       <h1 className="text-2xl font-medium text-gray-800"> Subscribe now & get 20% off</h1> 
       <p className="text-gray-400 mt-3"> Join our newsletter today and enjoy 20% off your first purchase! </p>
       <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">       
        <input className="w-full sm:flex-1 outline-none" type="email" placeholder='enter your email' required/>
        <button type="submit" className="bg-[#8F4465] text-white text-xs px-10 py-4"> SUBSCRIBE </button>
       </form>
       
    </div>
  )
}

export default Newsletter