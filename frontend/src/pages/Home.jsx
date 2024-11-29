import BestSeller from "../components/BestSeller"
import Hero from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import Newsletter from "../components/Newsletter"
import Policy from "../components/Policy"

function Home() {
  return (
    <div>
     <Hero/>
     <LatestCollection/>
     <BestSeller/>
     <Policy/>
     <Newsletter/>
    </div>
  )
}

export default Home