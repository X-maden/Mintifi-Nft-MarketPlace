import { createContext, useContext, useState, useMemo, useEffect, useCallback } from "react";

// Create context with default value to avoid undefined errors
const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
});

const STORAGE_KEY = "mintifi_cart";

export function CartProvider({ children }) {
  // Load cart from localStorage on mount with error handling
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Persist cart to localStorage on change with error handling
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Add item to cart with validation
  const addToCart = useCallback((product) => {
    if (!product?.id) {
      console.error("Invalid product: missing id");
      return;
    }

    setCart((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Update quantity with validation
  const updateQuantity = useCallback((id, quantity) => {
    const newQuantity = Number(quantity);
    if (isNaN(newQuantity) || newQuantity < 1) {
      console.error("Invalid quantity:", quantity);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  // Clear cart
  const clearCart = useCallback(() => setCart([]), []);

  // Get cart total with improved price parsing
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const priceNum = typeof item.price === "string"
        ? parseFloat(item.price.match(/[\d.eE-]+/)?.[0] || 0)
        : Number(item.price) || 0;
      return total + priceNum * (item.quantity || 1);
    }, 0);
  }, [cart]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
