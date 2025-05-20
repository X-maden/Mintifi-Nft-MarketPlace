import { useState, useCallback } from "react";
import Navbar from './NavBar'
import HeroSection from "./HeroSection"
import HotProductsSection  from './HotProduct'
import { CartProvider } from "./CartContext";
import Footer from "./Footer";

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-4 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-4">Please try refreshing the page</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  // Track bought NFT ids
  const [boughtIds, setBoughtIds] = useState([]);

  // Handler to add bought ids (called from NavBar)
  const handleBuy = useCallback((ids) => {
    setBoughtIds(prev => [...prev, ...ids]);
  }, []);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}

export default App
