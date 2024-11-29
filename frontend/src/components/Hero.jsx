import { assets } from "../assets/assets"


function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 ">
        
        {/* Hero left side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0"> 
            <div className="text-[#414141]">
                <div className="flex items-center gap-2">
                    <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                    <p className="font-medium text-sm md:text-base"> OUR BESTSELLING LIQUOR</p>
                </div>
                <h1 className="text-3xl font-prata sm:py-3 lg:text-5xl leading-relaxed"> November Festival </h1>
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm md:text-base border rounded-full bg-[#C586A5] h-10 w-32 flex items-center justify-center cursor-pointer"> SHOP NOW</p>
                    <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                </div>
            </div>
        </div>

        {/* Hero Right side */}
        <div className="w-full sm:w-1/2 flex items-center jusify-center"> 
        <img className="w-full object-cover" src={assets.hero_img} alt="hero image" aria-label="hero image"/>
        </div>
        

    </div>
  )
}

export default Hero