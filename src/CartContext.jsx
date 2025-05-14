import { createContext, useContext, useState, useMemo, useEffect } from "react";

// Create context with default value to avoid undefined errors
const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

export function CartProvider({ children }) {
  // Load cart from localStorage on mount
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart updated:", cart); // Debug: see cart state
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      // Ensure quantity is always set
      const itemToAdd = { ...product, quantity: product.quantity || 1 };
      return [...prev, itemToAdd];
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Number(quantity) || 1 } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Get cart total (assumes price is a string like "4.7 ETH" or a number)
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const priceNum = typeof item.price === "string"
        ? parseFloat(item.price)
        : Number(item.price) || 0;
      return total + priceNum * (item.quantity || 1);
    }, 0);
  };

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  }), [cart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
