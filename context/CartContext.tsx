import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../types';

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    // In a real app, you would handle quantity. For this demo, we just add the product.
    setCartItems(prevItems => [...prevItems, product]);
    // Optional: Add a confirmation toast/notification here.
  };

  const value = { cartItems, addToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
