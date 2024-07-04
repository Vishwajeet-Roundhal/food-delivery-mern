import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("myCart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart : Object.values(parsedCart);
    }
    return [];
  });

  const [cartSize, setCartSize] = useState(0); // State for cart size


  const addToCart = (dish) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(
        (item) => item._id === dish._id
      );
      if (existingItemIndex !== -1) {
        return currentCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentCart, { ...dish, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (dish) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(
        (item) => item._id === dish._id
      );
      if (existingItemIndex !== -1) {
        const existingItem = currentCart[existingItemIndex];
        if (existingItem.quantity > 1) {
          return currentCart.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return currentCart.filter((_, index) => index !== existingItemIndex);
        }
      }
      return currentCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("myCart");
    setCartSize(0);
  };

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
    // Update cart size
    const size = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartSize(size);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartSize , clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
