// // import React, { createContext, useContext, useState } from "react";

// // // Create the context
// // export const CartContext = createContext();

// // // Create a provider component
// // export const CartProvider = ({ children }) => {
// //   const [cart, setCart] = useState([]);

// //   const addToCart = (item) => {
// //     setCart((prevCart) => [...prevCart, item]);
// //   };

// //   return (
// //     <CartContext.Provider value={{ cart, setCart, addToCart }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // // Create a custom hook for accessing the context
// // export const useCart = () => {
// //   const context = useContext(CartContext);
// //   if (!context) {
// //     throw new Error("useCart must be used within a CartProvider");
// //   }
// //   return context;
// // };


// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     const existingProduct = cart.find((item) => item.id === product.id);
//     if (existingProduct) {
//       setCart(
//         cart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//   };

//   const removeFromCart = (id) => {
//     setCart(cart.filter((item) => item.id !== id));
//   };

//   return (
//     <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, product]);
    }
  };

  const updateCartItem = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartItem, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
