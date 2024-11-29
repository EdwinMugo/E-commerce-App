import { assets } from "../assets/assets"

function Policy() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-sm md:text-base text-gray-700">
        <div> 
            <img src={assets.exchange_icon} alt="exchange icon" className="w-12 m-auto mb-5" />
            <p className="font-semibold text-xl"> Express Delivery</p>
            <p className="text-gray-400"> We deliver any time, any day, in less than 1 hour - average: 23 min. We also offer next-day countrywide alcohol delivery in Kenya.</p>
        </div>
        <div> 
            <img src={assets.quality_icon} alt="exchange icon" className="w-12 m-auto mb-5" />
            <p className="font-semibold text-xl"> Wide Selection</p>
            <p className="text-gray-400"> We have a wide selection of wines, gins, vodkas, rums, tequila, liqueurs and other drinks to choose from.</p>
        </div>
        <div> 
            <img src={assets.support_img} alt="exchange icon" className="w-12 m-auto mb-5" />
            <p className="font-semibold text-xl"> 24/7 Customer Support</p>
            <p className="text-gray-400"> We offer expert support from our dedicated team, ready with answers whenever you need them. Your satisfaction is our priority, 24/7.</p>
        </div>
    </div>
  )
}

export default Policy