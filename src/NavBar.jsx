import { useState, useEffect } from "react";
import { BrowserProvider, parseEther } from "ethers"; // Ethers v6+ import
import Logo from "../src/assets/mintifi.png";
import { useCart } from "./CartContext";

export default function Navbar({ onBuy }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [buying, setBuying] = useState(false);
  const { cart, clearCart, getCartTotal, removeFromCart } = useCart();

  // Specify the website owner's address here
  const OWNER_ADDRESS = "0xf7F8Ef8411da7821E4E4c9f03E9CaBa86006c687"; // Replace with actual address

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

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        // Use Ethers.js v6+ to request accounts
        const provider = new BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setWalletConnected(true);
        setWalletAddress(address);
      } catch (err) {
        setWalletConnected(false);
        setWalletAddress(null);
        alert("Wallet connection failed: " + err.message);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
  };

  // Helper to get total ETH value in cart (parse price correctly)
  const getTotalEth = () => {
    // Use parseFloat and sum as floats, not integers
    return cart.reduce((sum, item) => {
      let price = 0;
      if (typeof item.price === "string") {
        // Support scientific notation and very small numbers
        const match = item.price.match(/[\d.eE-]+/);
        price = match ? parseFloat(match[0]) : 0;
      } else {
        price = Number(item.price) || 0;
      }
      return sum + price * (item.quantity || 1);
    }, 0);
  };

  // Send ETH from connected wallet to owner on Buy
  const handleBuy = async () => {
    if (!walletConnected || !walletAddress) {
      alert("Please connect your MetaMask wallet before buying.");
      return;
    }

    const hasEth = cart.some(item => typeof item.price === "string" && item.price.includes("ETH"));
    if (!hasEth) {
      alert("Only ETH payments are supported for this demo.");
      return;
    }

    const totalEth = getTotalEth();
    if (totalEth <= 0) {
      alert("Cart total is zero.");
      return;
    }

    setBuying(true);
    try {
      // Create a BrowserProvider instance (Ethers v6+)
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Prepare transaction parameters
      const tx = {
        to: OWNER_ADDRESS,
        value: parseEther(totalEth.toFixed(18)) // Fix: round to 18 decimals
      };

      // Send transaction
      const transaction = await signer.sendTransaction(tx);

      // Wait for transaction confirmation
      const receipt = await transaction.wait(1);

      // Detailed success handling
      if (receipt.status === 1) {
        alert(`Payment successful! Transaction Hash: ${transaction.hash}`);
        
        if (typeof onBuy === "function") {
          onBuy(cart.map(item => item.id));
        }
        clearCart();
        setCartModalOpen(false);
      } else {
        alert("Transaction failed.");
      }
    } catch (err) {
      console.error("Transaction error:", err);
      alert(`Transaction failed: ${err.message}`);
    } finally {
      setBuying(false);
    }
  };

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
    { name: "Cart", icon: icons.cart, isCart: true, badge: cart.length > 0 ? cart.length : null },
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
                    className="flex items-center text-gray-100 hover:text-white transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white/10 relative"
                    onClick={item.isCart ? (e) => { e.preventDefault(); setCartModalOpen(true); } : undefined}
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.name}</span>
                    {/* Badge for cart count */}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
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
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" 
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                }`}
              >
                <span className="mr-1">{icons.wallet}</span>
                <span>
                  {walletConnected && walletAddress
                    ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                    : "Connect Wallet"}
                </span>
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
                    className="flex items-center text-gray-100 hover:text-white block px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 relative"
                    onClick={item.isCart ? (e) => { e.preventDefault(); setCartModalOpen(true); setMobileMenuOpen(false); } : undefined}
                  >
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.name}</span>
                    {/* Badge for cart count in mobile */}
                    {item.badge && (
                      <span className="absolute top-1/2 transform -translate-y-1/2 ml-2 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </a>
                ))}
                
                {/* Mobile Connect Wallet Button */}
                <button
                  onClick={handleConnectWallet}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                    walletConnected 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" 
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  }`}
                >
                  <span className="mr-2">{icons.wallet}</span>
                  <span>
                    {walletConnected && walletAddress
                      ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                      : "Connect Wallet"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Cart Modal */}
      {cartModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setCartModalOpen(false)}
        >
          <div
            className="backdrop-blur-md bg-violet-400/5 border border-white/20 shadow-lg rounded-lg  max-w-md w-full p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setCartModalOpen(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4 text-white">Your Cart</h2>
            {cart.length === 0 ? (
              <div className="text-gray-200 text-center py-8">
                Your cart is empty.
              </div>
            ) : (
              <>
                <ul
                  className="divide-y divide-gray-200 max-h-64 overflow-y-auto custom-scrollbar"
                >
                  {cart.map(item => (
                    <li key={item.id} className="py-3 pr-6 flex items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-400">{item.name}</div>
                        <div className="text-sm text-gray-400">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-bold text-purple-600 mr-2">{item.price}</div>
                      <button
                        className="ml-2 p-1 rounded hover:bg-red-100"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
                {/* Total and Buy button */}
                <div className="mt-6 flex flex-col items-end">
                  <div className="text-lg font-bold mb-4 text-white">
                    Total: <span className="text-purple-700">
                      {(() => {
                        // Show ETH if any price is string with ETH, else show as number
                        const hasEth = cart.some(item => typeof item.price === "string" && item.price.includes("ETH"));
                        if (hasEth) {
                          // Use getTotalEth for correct calculation
                          const total = getTotalEth();
                          // Show up to 6 decimals for small values
                          return `${total < 0.0001 ? total.toFixed(6) : total.toFixed(4)} ETH`;
                        } else {
                          return `$${getCartTotal().toFixed(2)}`;
                        }
                      })()}
                    </span>
                  </div>
                  <button
                    className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 font-semibold flex items-center justify-center"
                    onClick={handleBuy}
                    disabled={buying}
                  >
                    {buying && (
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                    )}
                    {buying ? "Processing..." : "Buy"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar {
  /* For Firefox */
  scrollbar-width: thin; /* 'thin' is the thinnest official value */
  scrollbar-color: #a78bfa #18181b;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 2px; /* 1px is too thin to be usable, 2px is minimum recommended */
  background: #18181b;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #a78bfa;
  border-radius: 999px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #18181b;
  border-radius: 999px;
}
      `}</style>
    </div>
  );
}