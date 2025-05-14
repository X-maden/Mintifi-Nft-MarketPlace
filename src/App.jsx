import Navbar from './NavBar'
import HeroSection from "./HeroSection"
import HotProductsSection  from './HotProduct'

function App() {


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-4">
        <div className='h-16'><Navbar/></div>
        
        <div>
          <HeroSection/>
          <HotProductsSection/>
        </div>
      </div>
      

    </>
  )
}

export default App
