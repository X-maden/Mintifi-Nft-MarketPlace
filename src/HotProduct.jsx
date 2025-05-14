import { useState } from 'react';
import Img1NFT from "../src/assets/img1nft.avif";
import Img2NFT from "../src/assets/img2nft.avif";
import Img3NFT from "../src/assets/img3nft.avif";
import Img4NFT from "../src/assets/img4nft.avif";
import Img5NFT from "../src/assets/img5nft.jpg";
import Img6NFT from "../src/assets/img6nft.jpg";
import Img7NFT from "../src/assets/img7nft.jpg";
import Img8NFT from "../src/assets/img8nft.jpg";
import Img9NFT from "../src/assets/img9nft.jpg";
import Img10NFT from "../src/assets/img10nft.jpg";

export default function HotProductsSection() {
  // Sample hot NFT products data
  const hotProducts = [
    {
      id: 1,
      name: "Fears Lord Warrior",
      creator: "vikram01",
      price: "4.7 ETH",
      image: Img1NFT
    },
    {
      id: 2,
      name: "Great Titans",
      creator: "ByteArtist",
      price: "1.5 ETH",
      image: Img2NFT
    },
    {
      id: 3,
      name: "Ancient Archer",
      creator: "PixelPunk",
      price: "2.2 ETH",
      image: Img3NFT
    },
    {
      id: 4,
      name: "Eternral",
      creator: "VoidCreator",
      price: "4.0 ETH",
      image: Img4NFT
    },
    {
      id: 5,
      name: "Ancient warrior",
      creator: "DreamWeaver",
      price: "3.35 ETH",
      image: Img5NFT
    },
    {
      id: 6,
      name: "Alex Rcihard",
      creator: "FutureForm",
      price: "2.75 ETH",
      image: Img6NFT
    },
    {
      id: 7,
      name: "Prince Vikramaditya",
      creator: "WaveFunction",
      price: "3.1 ETH",
      image: Img7NFT
    },
    {
      id: 8,
      name: "King Drona",
      creator: "ByteMaster",
      price: "2.2 ETH",
      image: Img8NFT
    },
    {
      id: 9,
      name: "Mystic Queen",
      creator: "StarForger",
      price: "3.8 ETH",
      image: Img9NFT
    },
    {
      id: 10,
      name: "Aurora Williams",
      creator: "8BitLegend",
      price: "1.95 ETH",
      image: Img10NFT
    }
  ];

  // State for scroll navigation
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll left
  const scrollLeft = () => {
    const container = document.getElementById('hot-products-container');
    if (container) {
      const newPosition = Math.max(scrollPosition - 800, 0);
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  // Handle scroll right
  const scrollRight = () => {
    const container = document.getElementById('hot-products-container');
    if (container) {
      const newPosition = scrollPosition + 800;
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className='my-10'>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Hot</span> NFTs
            </h2>
            <p className="text-gray-400 mt-2">The most trending digital assets right now</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={scrollLeft} 
              className="p-3 rounded-full bg-gray-800 text-white hover:bg-purple-800 transition"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight} 
              className="p-3 rounded-full bg-gray-800 text-white hover:bg-purple-800 transition"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Products container with horizontal scroll */}
        <div 
          id="hot-products-container"
          className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory py-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {hotProducts.map((product) => (
            <div 
              key={product.id} 
              className="snap-start flex-none w-64 mr-4 group cursor-pointer h-96"
            >
              <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lgrounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 h-full flex flex-col">
                {/* NFT Image - fixed height */}
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                  
                </div>
                
                {/* NFT Details - using flex-grow to fill available space */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg truncate w-32" title={product.name}>
                        {product.name.length > 10 ? product.name.substring(0, 10) + '...' : product.name}
                      </h3>
                      <p className="text-gray-400 text-sm">by @{product.creator}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-xs">Price</p>
                      <p className="text-purple-400 font-bold">{product.price}</p>
                    </div>
                  </div>
                  
                  {/* Push button to bottom with margin-top auto */}
                  <div className="mt-auto">
                    <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all duration-300 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Custom style for hiding scrollbar */}
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
}