import { useState, useEffect } from "react";
import Logo from "../src/assets/mintifi.png"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleConnectWallet = () => {
    // This would be replaced with actual wallet connection logic
    setWalletConnected(!walletConnected);
  };

  // Custom SVG icons
  const icons = {
    home: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    search: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    about: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    cart: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    wallet: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    menu: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    close: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  };

  const navItems = [
    { name: "Home", icon: icons.home },
    { name: "Explore", icon: icons.search },
    { name: "Contact US", icon: icons.about },
    { name: "Cart", icon: icons.cart },
  ];

  return (
    <div>
      {/* Glassmorphism Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg transition-all duration-300 ${
          scrolled ? "bg-white/15" : "bg-white/10"
        }`}>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img src={Logo} alt="logo" className="w-32 h-32"></img>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className="flex items-center text-gray-100 hover:text-white transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white/10"
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Connect Wallet Button */}
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={handleConnectWallet}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  walletConnected 
                    ? "bg-green-500/30 hover:bg-green-500/40 text-white" 
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                }`}
              >
                <span className="mr-1">{icons.wallet}</span>
                <span>{walletConnected ? "Wallet Connected" : "Connect Wallet"}</span>
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                {mobileMenuOpen ? icons.close : icons.menu}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="rounded-xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className="flex items-center text-gray-100 hover:text-white block px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                ))}
                
                {/* Mobile Connect Wallet Button */}
                <button
                  onClick={handleConnectWallet}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                    walletConnected 
                      ? "bg-green-500/30 hover:bg-green-500/40 text-white" 
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  }`}
                >
                  <span className="mr-2">{icons.wallet}</span>
                  <span>{walletConnected ? "Wallet Connected" : "Connect Wallet"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}