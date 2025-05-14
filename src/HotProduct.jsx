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
import { useCart } from './CartContext';

export default function HotProductsSection({ boughtIds = [] }) {
  // Sample hot NFT products data
  const hotProducts = [
    {
      id: 1,
      name: "Fears Lord Warrior",
      creator: "vikram01",
      price: "0.000001 ETH",
      image: Img1NFT
    },
    {
      id: 2,
      name: "Great Titans",
      creator: "ByteArtist",
      price: "0.000001 ETH",
      image: Img2NFT
    },
    {
      id: 3,
      name: "Ancient Archer",
      creator: "PixelPunk",
      price: "0.000002 ETH",
      image: Img3NFT
    },
    {
      id: 4,
      name: "Eternral",
      creator: "VoidCreator",
      price: "0.000002 ETH",
      image: Img4NFT
    },
    {
      id: 5,
      name: "Ancient warrior",
      creator: "DreamWeaver",
      price: "0.000001 ETH",
      image: Img5NFT
    },
    {
      id: 6,
      name: "Alex Rcihard",
      creator: "FutureForm",
      price: "0.000001 ETH",
      image: Img6NFT
    },
    {
      id: 7,
      name: "Prince Vikramaditya",
      creator: "WaveFunction",
      price: "0.000001 ETH",
      image: Img7NFT
    },
    {
      id: 8,
      name: "King Drona",
      creator: "ByteMaster",
      price: "0.000001 ETH",
      image: Img8NFT
    },
    {
      id: 9,
      name: "Mystic Queen",
      creator: "StarForger",
      price: "0.000001 ETH",
      image: Img9NFT
    },
    {
      id: 10,
      name: "Aurora Williams",
      creator: "8BitLegend",
      price: "0.000001 ETH",
      image: Img10NFT
    }
  ];

  // Filter out bought NFTs
  const visibleProducts = hotProducts.filter(
    (product) => !boughtIds.includes(product.id)
  );

  // State for scroll navigation
  const [scrollPosition, setScrollPosition] = useState(0);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const { cart, addToCart } = useCart();

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

  // Handle add to cart
  const handleAddToCart = (product) => {
    const isProductInCart = cart.some(item => item.id === product.id);
    if (isProductInCart) {
      setNotification({
        show: true,
        message: `${product.name} is already in your cart`
      });
    } else {
      addToCart({ ...product, quantity: 1 });
      setNotification({
        show: true,
        message: `${product.name} added to cart`
      });
    }
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 2000);
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
        {visibleProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-purple-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-2">More NFTs are coming soon!</h2>
            <p className="text-gray-400">All NFTs have been purchased. Please check back later for new drops.</p>
          </div>
        ) : (
          <div 
            id="hot-products-container"
            className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory py-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {visibleProducts.map((product) => (
              <div 
                key={product.id} 
                className="snap-start flex-none w-72 mr-4 group cursor-pointer"
              >
                <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lgrounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 flex flex-col">
                  {/* NFT Image - fixed height */}
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-72 object-cover"
                    />
                    {cart.some(item => item.id === product.id) && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        In Cart
                      </div>
                    )}
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
                        <p className="text-gray-400 text-xs text-left">Price:</p>
                        <p className="text-purple-400 font-bold">{product.price}</p>
                      </div>
                    </div>
                    
                    {/* Push button to bottom with margin-top auto */}
                    <div className="mt-auto">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={cart.some(item => item.id === product.id)}
                        className={`w-full py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                          cart.some(item => item.id === product.id)
                            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cart.some(item => item.id === product.id) ? 'In Cart' : 'Add to cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Notification */}
        {notification.show && (
          <div className="fixed bottom-4 right-4 bg-black/80 text-white pl-3 pr-4 py-2 rounded-lg shadow-lg z-50 flex items-center">
            <span className="flex items-center justify-center min-w-[24px] min-h-[24px] mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-green-400" fill="black"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </span>
            {notification.message}
          </div>
        )}

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