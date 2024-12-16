// // // import React, { createContext, useContext, useState } from "react";

// // // // Create the context
// // // export const CartContext = createContext();

// // // // Create a provider component
// // // export const CartProvider = ({ children }) => {
// // //   const [cart, setCart] = useState([]);

// // //   const addToCart = (item) => {
// // //     setCart((prevCart) => [...prevCart, item]);
// // //   };

// // //   return (
// // //     <CartContext.Provider value={{ cart, setCart, addToCart }}>
// // //       {children}
// // //     </CartContext.Provider>
// // //   );
// // // };

// // // // Create a custom hook for accessing the context
// // // export const useCart = () => {
// // //   const context = useContext(CartContext);
// // //   if (!context) {
// // //     throw new Error("useCart must be used within a CartProvider");
// // //   }
// // //   return context;
// // // };


// // import { createContext, useContext, useState } from "react";

// // const CartContext = createContext();

// // export const CartProvider = ({ children }) => {
// //   const [cart, setCart] = useState([]);

// //   const addToCart = (product) => {
// //     const existingProduct = cart.find((item) => item.id === product.id);
// //     if (existingProduct) {
// //       setCart(
// //         cart.map((item) =>
// //           item.id === product.id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         )
// //       );
// //     } else {
// //       setCart([...cart, { ...product, quantity: 1 }]);
// //     }
// //   };

// //   const removeFromCart = (id) => {
// //     setCart(cart.filter((item) => item.id !== id));
// //   };

// //   return (
// //     <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // export const useCart = () => useContext(CartContext);


// // import React, { createContext, useContext, useState } from "react";

// // const CartContext = createContext();

// // export const useCart = () => useContext(CartContext);

// // export const CartProvider = ({ children }) => {
// //   const [cart, setCart] = useState([]);

// //   const addToCart = (product) => {
// //     const existingItem = cart.find((item) => item.id === product.id);
// //     if (existingItem) {
// //       setCart((prev) =>
// //         prev.map((item) =>
// //           item.id === product.id
// //             ? { ...item, quantity: item.quantity + product.quantity }
// //             : item
// //         )
// //       );
// //     } else {
// //       setCart((prev) => [...prev, product]);
// //     }
// //   };

// //   const updateCartItem = (id, quantity) => {
// //     setCart((prev) =>
// //       prev.map((item) =>
// //         item.id === id ? { ...item, quantity } : item
// //       )
// //     );
// //   };

// //   const removeFromCart = (id) => {
// //     setCart((prev) => prev.filter((item) => item.id !== id));
// //   };

// //   return (
// //     <CartContext.Provider
// //       value={{ cart, addToCart, updateCartItem, removeFromCart }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// import { createContext, useContext, useState } from "react";

// // Create the CartContext
// const CartContext = createContext();

// // Create a provider component
// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]); // State to hold the cart items

//   // Add product to the cart
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existingProduct = prevCart.find((item) => item.id === product.id);
//       if (existingProduct) {
//         // If the product exists, update the quantity
//         return prevCart.map((item) =>
//           product.id
//             ? { ...product, quantity: product.quantity + product.quantity }
//             : item
//         );
//       } else {
//         // Add the new product
//         return [...prevCart, { ...product, quantity: product.quantity }];
//       }
//     });
//   };

//   // Remove product
//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   // Update quantity
//   const updateCartItem = (id, quantity) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to use the CartContext
// export const useCart = () => useContext(CartContext);

// import React, { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState(() => {
//         const savedCart = localStorage.getItem("cart");
//         return savedCart ? JSON.parse(savedCart) : [];
//     });

//     useEffect(() => {
//         localStorage.setItem("cart", JSON.stringify(cart));
//     }, [cart]);

//     const addToCart = (product) => {
//         setCart((prevCart) => {
//             const existingProduct = prevCart.find((item) => item.id === product.id);

//             if (existingProduct) {
//                 // Increment quantity for existing product
//                 return prevCart.map((item) =>
//                     item.id === product.id
//                         ? { ...item, quantity: item.quantity + product.quantity }
//                         : item
//                 );
//             }
//             // Add new product to the cart
//             return [...prevCart, product];
//         });
//     };

//     const removeFromCart = (id) => {
//         setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//     };

//     const clearCart = () => setCart([]);

//     return (
//         <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);


// import React, { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState(() => {
//         const savedCart = localStorage.getItem("cart");
//         return savedCart ? JSON.parse(savedCart) : [];
//     });

//     useEffect(() => {
//         localStorage.setItem("cart", JSON.stringify(cart));
//     }, [cart]);

//     const addToCart = (product) => {
//         setCart((prevCart) => {
//             const existingProduct = prevCart.find((item) => item.id === product.id);

//             if (existingProduct) {
//                 // Increment quantity for existing product
//                 return prevCart.map((item) =>
//                     item.id === product.id
//                         ? { ...item, quantity: item.quantity + 0.5 * product.quantity }
//                         : item
//                 );
//             }
//             // Add new product to the cart
//             return [...prevCart, product];
//         });
//     };

//     const updateCartItem = (id, quantity) => {
//         setCart((prevCart) => {
//             return prevCart.map((item) =>
//                 item.id === id ? { ...item, quantity } : item
//             );
//         });
//     };

//     const incrementCartItem = (id) => {
//         setCart((prevCart) => {
//             return prevCart.map((item) =>
//                 item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//             );
//         });
//     };

//     const decrementCartItem = (id) => {
//         setCart((prevCart) => {
//             return prevCart.map((item) =>
//                 item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
//             );
//         });
//     };

//     const removeFromCart = (id) => {
//         setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//     };

//     const clearCart = () => setCart([]);

//     return (
//         <CartContext.Provider value={{ cart, addToCart, updateCartItem, incrementCartItem, decrementCartItem, removeFromCart, clearCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => useContext(CartContext);


import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add an item to the cart
  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);
      if (existingItem) {
        // If item exists, increment its quantity by the new item's quantity
        return prevCart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      // If item doesn't exist, add it with the provided quantity
      return [...prevCart, { ...newItem, quantity: newItem.quantity }];
    });
  };

  // Increment the quantity of an item in the cart
  const incrementCartItem = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement the quantity of an item in the cart
  const decrementCartItem = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  // Update the quantity of an item in the cart
  const updateCartItem = (id, quantity) => {
    if (quantity > 0) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  // Remove an item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        incrementCartItem,
        decrementCartItem,
        updateCartItem,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
