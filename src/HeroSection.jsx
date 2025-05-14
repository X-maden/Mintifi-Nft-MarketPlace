import { useState, useEffect } from 'react';
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


export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Using the imported NFT image and placeholders for others
  const nftImages = [
    Img1NFT,
    Img2NFT,
    Img3NFT,
    Img4NFT,
    Img5NFT,
    Img6NFT,
    Img7NFT,
    Img8NFT,
    Img9NFT,
    Img10NFT,
  ];

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === nftImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Website name and info div */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-200 mb-6">
              Mintifi
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Discover, collect, and trade extraordinary NFTs in the most innovative marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white font-semibold hover:opacity-90 transition">
                Explore Collection
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-purple-400 rounded-lg text-white font-semibold hover:bg-purple-800/30 transition">
                Create NFT
              </button>
            </div>
          </div>
          
          {/* Image carousel div */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Images */}
              {nftImages.map((src, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-1000 ${
                    index === currentImageIndex 
                      ? 'opacity-100 scale-100 rotate-0' 
                      : 'opacity-0 scale-95 rotate-3'
                  }`}
                >
                  <img 
                    src={src} 
                    alt={`Featured NFT ${index + 1}`}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm font-semibold text-purple-300">
                        {index === 0 ? "Premium NFT" : `Featured NFT`}
                      </p>
                      <h3 className="text-xl font-bold">
                        {index === 0 ? "Exclusive Art Collection" : "Digital Masterpiece"}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Indicator dots */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {nftImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-purple-400 w-6' : 'bg-gray-400 bg-opacity-50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}