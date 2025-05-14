import { useState } from "react";
import Navbar from './NavBar'
import HeroSection from "./HeroSection"
import HotProductsSection  from './HotProduct'
import { CartProvider } from "./CartContext";
import Footer from "./Footer";

function App() {
  // Track bought NFT ids
  const [boughtIds, setBoughtIds] = useState([]);

  // Handler to add bought ids (called from NavBar)
  const handleBuy = (ids) => {
    setBoughtIds(prev => [...prev, ...ids]);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-4">
        <div className='h-16'>
          <Navbar onBuy={handleBuy} />
        </div>
        <div>
          <HeroSection/>
          <HotProductsSection boughtIds={boughtIds} />
        </div>
        <Footer/>
      </div>
    </CartProvider>
  )
}

export default App
