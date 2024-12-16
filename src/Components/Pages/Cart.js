/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../Pages/CartContext";

// const Cart = () => {
//   const { cart, updateCartItem, removeFromCart } = useCart();
//   const navigate = useNavigate();

//   const [cartItems, setCartItems] = useState(cart);
//   const [discount, setDiscount] = useState(0);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponMessage, setCouponMessage] = useState("");

//   // Sync cartItems with global cart state
//   useEffect(() => {
//     setCartItems(cart);
//   }, [cart]);

//   // Calculate totals
//   const calculateSubtotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const calculateGST = () => {
//     return calculateSubtotal() * 0.18;
//   };

//   const calculateDiscountedTotal = () => {
//     return calculateSubtotal() + calculateGST() - discount;
//   };

//   // Handle coupon code
//   const handleCouponApply = () => {
//     const subtotal = calculateSubtotal();
//     if (subtotal >= 100 && couponCode === "SAVE40") {
//       setDiscount(40);
//       setCouponMessage("Coupon applied successfully!");
//     } else {
//       setCouponMessage(
//         subtotal < 100
//           ? "Total must be greater than $100 to apply the coupon."
//           : "Invalid coupon code."
//       );
//     }
//     setTimeout(() => setCouponMessage(""), 3000);
//   };

//   // Handle quantity changes
//   const handleQuantityChange = (id, quantity) => {
//     if (quantity <= 0 || isNaN(quantity)) return;
//     updateCartItem(id, quantity);
//   };

//   const handleIncrement = (id, currentQuantity) => {
//     updateCartItem(id, currentQuantity + 1);
//   };

//   const handleDecrement = (id, currentQuantity) => {
//     if (currentQuantity > 1) {
//       updateCartItem(id, currentQuantity - 1);
//     }
//   };

//   return (
//     <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
//       <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//         <button
//           onClick={() => navigate("/categories")}
//           className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-black focus:outline-none"
//         >
//           &larr; Back to Categories
//         </button>

//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
//           Cart
//         </h2>

//         <div className="mt-6 flex flex-col lg:flex-row lg:gap-8">
//           <div className="flex-1 space-y-6">
//             {cartItems.length > 0 ? (
//               cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
//                 >
//                   <div className="flex items-center justify-between">
//                     <img
//                       className="h-20 w-20"
//                       src={item.image}
//                       alt={item.name}
//                     />
//                     <div className="flex-1 px-4">
//                       <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                         {item.name}
//                       </h3>
//                       <p className="text-gray-500 dark:text-gray-400">
//                         {item.description}
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <button
//                         onClick={() => handleDecrement(item.id, item.quantity)}
//                         className="px-2 py-1 text-white bg-gray-600 rounded-l-md hover:bg-gray-700"
//                       >
//                         −
//                       </button>
//                       <input
//                         type="number"
//                         min="1"
//                         value={item.quantity}
//                         onChange={(e) =>
//                           handleQuantityChange(item.id, +e.target.value)
//                         }
//                         className="w-16 text-center border px-2 py-1"
//                       />
//                       <button
//                         onClick={() => handleIncrement(item.id, item.quantity)}
//                         className="px-2 py-1 text-white bg-gray-600 rounded-r-md hover:bg-gray-700"
//                       >
//                         +
//                       </button>
//                       <p className="ml-4 text-base font-bold text-gray-900 dark:text-white">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </p>
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="ml-4 text-red-600 hover:underline"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">Your cart is empty.</p>
//             )}
//           </div>

//           <div className="lg:w-1/3 space-y-6">
//             <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Order Summary
//               </h3>

//               <div className="mt-4 space-y-2">
//                 <p className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>${calculateSubtotal().toFixed(2)}</span>
//                 </p>
//                 <p className="flex justify-between">
//                   <span>GST (18%)</span>
//                   <span>${calculateGST().toFixed(2)}</span>
//                 </p>
//                 <p className="flex justify-between text-green-600">
//                   <span>Discount</span>
//                   <span>- ${discount.toFixed(2)}</span>
//                 </p>
//                 <p className="flex justify-between font-bold">
//                   <span>Total</span>
//                   <span>${calculateDiscountedTotal().toFixed(2)}</span>
//                 </p>
//               </div>

//               <button
//                 onClick={() => navigate("/checkout")}
//                 className="mt-4 w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>

//             <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Apply Coupon
//               </h3>
//               <div className="mt-2 flex">
//                 <input
//                   type="text"
//                   placeholder="Enter coupon code"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   className="flex-1 rounded border px-2 py-1"
//                 />
//                 <button
//                   onClick={handleCouponApply}
//                   className="ml-2 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
//                 >
//                   Apply
//                 </button>
//               </div>
//               {couponMessage && (
//                 <p className="mt-2 text-sm text-red-500">{couponMessage}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../Pages/CartContext";

// const Cart = () => {
//   const { cart, incrementCartItem, decrementCartItem, removeFromCart } = useCart();
//   const navigate = useNavigate();

//   const [discount, setDiscount] = useState(0);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponMessage, setCouponMessage] = useState("");

//   // Calculate totals
//   const calculateSubtotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const calculateGST = () => {
//     return calculateSubtotal() * 0.18;
//   };

//   const calculateTotalBeforeDiscount = () => {
//     return calculateSubtotal() + calculateGST();
//   };

//   const calculateDiscountedTotal = () => {
//     const totalBeforeDiscount = calculateTotalBeforeDiscount();
//     return totalBeforeDiscount - discount;
//   };

//   // Handle coupon code
//   const handleCouponApply = () => {
//     const totalBeforeDiscount = calculateTotalBeforeDiscount();
//     if (totalBeforeDiscount >= 100 && couponCode === "SAVE40" ) {
//       setDiscount(40);
//       setCouponMessage("Coupon applied successfully!");
//     } else {
//       setCouponMessage(
//         totalBeforeDiscount < 100
//           ? "Total must be greater than $100 to apply the coupon."
//           : "Invalid coupon code."
//       );
//     }
//     setTimeout(() => setCouponMessage(""), 3000);
//   };

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../Pages/CartContext";

// const Cart = () => {
//   const { cart, incrementCartItem, decrementCartItem, removeFromCart } = useCart();
//   const navigate = useNavigate();

//   const [discount, setDiscount] = useState(0);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponMessage, setCouponMessage] = useState("");

//   // List of available coupons
//   const coupons = [
//     { code: "SAVE40", type: "fixed", value: 40, minAmount: 100 },
//     { code: "DISCOUNT10", type: "percentage", value: 10, minAmount: 50 },
//     { code: "FREESHIP", type: "fixed", value: 20, minAmount: 150 }, 
//   { code: "SAVE80%", type: "percentage", value: 80, minAmount: 2000 },
//   ];

//   // Calculate totals
//   const calculateSubtotal = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   const calculateGST = () => {
//     return calculateSubtotal() * 0.18;
//   };

//   const calculateTotalBeforeDiscount = () => {
//     return calculateSubtotal() + calculateGST();
//   };

//   const calculateDiscountedTotal = () => {
//     const totalBeforeDiscount = calculateTotalBeforeDiscount();
//     return totalBeforeDiscount - discount;
//   };

//   // Handle coupon code
//   const handleCouponApply = () => {
//     const totalBeforeDiscount = calculateTotalBeforeDiscount();

//     const coupon = coupons.find((c) => c.code === couponCode.trim().toUpperCase());

//     if (coupon) {
//       if (totalBeforeDiscount >= coupon.minAmount) {
//         if (coupon.type === "fixed") {
//           setDiscount(coupon.value);
//         } else if (coupon.type === "percentage") {
//           setDiscount((totalBeforeDiscount * coupon.value) / 100);
//         }
//         setCouponMessage("Coupon applied successfully!");
//       } else {
//         setCouponMessage(`Minimum Total amount must be greater than  $${coupon.minAmount}.`);
//       }
//     } else {
//       setCouponMessage("Invalid coupon code.");
//     }

//     setTimeout(() => setCouponMessage(""), 3000);
//   };


//   return (
//     <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
//       <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//         <button
//           onClick={() => navigate("/categories")}
//           className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-black focus:outline-none"
//         >
//           &larr; Back to Categories
//         </button>

//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
//           Cart
//         </h2>

//         <div className="mt-6 flex flex-col lg:flex-row lg:gap-8">
//           <div className="flex-1 space-y-6">
//             {cart.length > 0 ? (
//               cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
//                 >
//                   <div className="flex items-center justify-between">
//                     <img
//                       className="h-20 w-20"
//                       src={item.image}
//                       alt={item.name}
//                     />
//                     <div className="flex-1 px-4">
//                       <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                         {item.name}
//                       </h3>
//                       <p className="text-gray-500 dark:text-gray-400">
//                         {item.description}
//                       </p>
//                     </div>
//                     <div className="flex items-center">
//                       <button
//                         onClick={() => decrementCartItem(item.id)}
//                         className="px-2 py-1 text-white bg-gray-600 rounded-l-md hover:bg-gray-700"
//                       >
//                         −
//                       </button>
//                       <p className="mx-2 w-8 text-center">{item.quantity}</p>
//                       <button
//                         onClick={() => incrementCartItem(item.id)}
//                         className="px-2 py-1 text-white bg-gray-600 rounded-r-md hover:bg-gray-700"
//                       >
//                         +
//                       </button>
//                       <p className="ml-4 text-base font-bold text-gray-900 dark:text-white">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </p>
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="ml-4 text-red-600 hover:underline"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500">Your cart is empty.</p>
//             )}
//           </div>

//           <div className="lg:w-1/3 space-y-6">
//             <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Order Summary
//               </h3>

//               <div className="mt-4 space-y-2">
//                 <p className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>${calculateSubtotal().toFixed(2)}</span>
//                 </p>
//                 <p className="flex justify-between">
//                   <span>GST (18%)</span>
//                   <span>${calculateGST().toFixed(2)}</span>
//                 </p>
//                 <p className="flex justify-between text-green-600">
//                   <span>Discount</span>
//                   <span>- ${discount.toFixed(2)}</span>
//                 </p>
//                 <p className="flex justify-between font-bold">
//                   <span>Total</span>
//                   <span>${calculateDiscountedTotal().toFixed(2)}</span>
//                 </p>
//               </div>

//               <button
//                 onClick={() => navigate("/checkout")}
//                 className="mt-4 w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>

//             <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Apply Coupon
//               </h3>
//               <div className="mt-2 flex">
//                 <input
//                   type="text"
//                   placeholder="Enter coupon code"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   className="flex-1 rounded border px-2 py-1"
//                 />
//                 <button
//                   onClick={handleCouponApply}
//                   className="ml-2 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
//                 >
//                   Apply
//                 </button>
//               </div>
//               {couponMessage && (
//                 <p className="mt-2 text-sm text-red-500">{couponMessage}</p>
//               )}
//               <div className="mt-4 space-y-2">
//                 <p>
//                   <strong>Note:</strong> This store offers a 20% discount when using the
//                   coupon code "SAVE20".
//                 </p>
//                 <p>
//                   <strong>Note:</strong> The store only offers a 40% discount when using the
//                   coupon code "SAVE40".
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Pages/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart, incrementCartItem, decrementCartItem, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  // List of available coupons
  const coupons = [
    { code: "SAVE40", type: "fixed", value: 40, minAmount: 100 },
    { code: "DISCOUNT10", type: "percentage", value: 10, minAmount: 50 },
    { code: "FREESHIP", type: "fixed", value: 20, minAmount: 150 },
    { code: "SAVE80%", type: "percentage", value: 80, minAmount: 2000 },
  ];

  // Calculate totals
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotalBeforeDiscount = () => {
    return calculateSubtotal() + calculateGST();
  };

  const calculateDiscountedTotal = () => {
    const totalBeforeDiscount = calculateTotalBeforeDiscount();
    return totalBeforeDiscount - discount;
  };

  // Handle coupon code
  const handleCouponApply = () => {
    const totalBeforeDiscount = calculateTotalBeforeDiscount();

    const coupon = coupons.find((c) => c.code === couponCode.trim().toUpperCase());

    if (coupon) {
      if (totalBeforeDiscount >= coupon.minAmount) {
        if (coupon.type === "fixed") {
          setDiscount(coupon.value);
        } else if (coupon.type === "percentage") {
          setDiscount((totalBeforeDiscount * coupon.value) / 100);
        }
        toast.success("Coupon applied successfully!");
      } else {
        toast.error(`Minimum Total amount must be greater than $${coupon.minAmount}.`);
      }
    } else {
      toast.error("Invalid coupon code.");
    }

    setTimeout(() => setCouponMessage(""), 3000);
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <button
          onClick={() => navigate("/categories")}
          className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-black focus:outline-none"
        >
          &larr; Back to Categories
        </button>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Cart
        </h2>

        <div className="mt-6 flex flex-col lg:flex-row lg:gap-8">
          <div className="flex-1 space-y-6">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <img
                      className="h-20 w-20"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="flex-1 px-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => decrementCartItem(item.id)}
                        className="px-2 py-1 text-white bg-gray-600 rounded-l-md hover:bg-gray-700"
                      >
                        −
                      </button>
                      <p className="mx-2 w-8 text-center">{item.quantity}</p>
                      <button
                        onClick={() => incrementCartItem(item.id)}
                        className="px-2 py-1 text-white bg-gray-600 rounded-r-md hover:bg-gray-700"
                      >
                        +
                      </button>
                      <p className="ml-4 text-base font-bold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
          </div>

          <div className="lg:w-1/3 space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order Summary
              </h3>

              <div className="mt-4 space-y-2">
                <p className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </p>
                <p className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>${calculateGST().toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- ${discount.toFixed(2)}</span>
                </p>
                <p className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateDiscountedTotal().toFixed(2)}</span>
                </p>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="mt-4 w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Apply Coupon
              </h3>
              <div className="mt-2 flex">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 rounded border px-2 py-1"
                />
                <button
                  onClick={handleCouponApply}
                  className="ml-2 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className="mt-2 text-sm text-red-500">{couponMessage}</p>
              )}
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Note:</strong> This store offers a 20% discount when using the
                  coupon code "SAVE20".
                </p>
                <p>
                  <strong>Note:</strong> The store only offers a 40% discount when using the
                  coupon code "SAVE40".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Cart;



// import React, { useState, useEffect } from "react";
// import { useCart } from "../Pages/CartContext";

// const CartPage = () => {
//   const { cart, removeFromCart, updateCartItem } = useCart();
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [couponMessage, setCouponMessage] = useState("");

//   // Calculate totals
//   const calculateSubtotal = () =>
//     cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   const calculateGST = () => calculateSubtotal() * 0.18;

//   const calculateTotal = () =>
//     calculateSubtotal() + calculateGST() - discount;

//   // Apply coupon code
//   const handleApplyCoupon = (e) => {
//     e.preventDefault();
//     if (couponCode === "SAVE20" && calculateSubtotal() >= 100) {
//       setDiscount(20);
//       setCouponMessage("Coupon applied successfully!");
//     } else {
//       setCouponMessage(
//         "Invalid coupon code or minimum subtotal not met (min $100)."
//       );
//     }
//     setTimeout(() => setCouponMessage(""), 3000);
//   };

//   // Handle quantity changes
//   const handleQuantityChange = (id, newQuantity) => {
//     if (newQuantity <= 0) return;
//     updateCartItem(id, newQuantity);
//   };

//   // Handle item removal
//   const handleRemoveItem = (id) => {
//     removeFromCart(id);
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
//       {cart.length > 0 ? (
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Cart Items */}
//           <div className="flex-1">
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.image || "https://via.placeholder.com/150"}
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                   <div>
//                     <h2 className="text-lg font-semibold">{item.name}</h2>
//                     <p className="text-gray-600">${item.price}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() =>
//                       handleQuantityChange(item.id, item.quantity - 1)
//                     }
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     -
//                   </button>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) =>
//                       handleQuantityChange(
//                         item.id,
//                         parseInt(e.target.value, 10)
//                       )
//                     }
//                     className="w-12 text-center border rounded"
//                   />
//                   <button
//                     onClick={() =>
//                       handleQuantityChange(item.id, item.quantity + 1)
//                     }
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={() => handleRemoveItem(item.id)}
//                     className="text-red-600 hover:underline"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//             <div className="flex justify-between mb-2">
//               <span>Subtotal</span>
//               <span>${calculateSubtotal().toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span>GST (18%)</span>
//               <span>${calculateGST().toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-4 text-green-600">
//               <span>Discount</span>
//               <span>- ${discount.toFixed(2)}</span>
//             </div>
//             <hr className="my-4" />
//             <div className="flex justify-between text-lg font-bold">
//               <span>Total</span>
//               <span>${calculateTotal().toFixed(2)}</span>
//             </div>
//             <button
//               className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               onClick={() => alert("Proceeding to checkout...")}
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
//           <p>Add some products to see them here!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;

// import React, { useContext } from "react";
// import { CartContext } from "../Pages/CartContext";

// const Cart = () => {
//     const { cart, removeFromCart, clearCart } = useContext(CartContext);

//     return (
//         <div>
//             <h2>Your Cart</h2>
//             {cart.length === 0 ? (
//                 <p>The cart is empty.</p>
//             ) : (
//                 <ul>
//                     {cart.map((item) => (
//                         <li key={item.id}>
//                             {item.name} - {item.quantity} x {item.price}
//                             <button onClick={() => removeFromCart(item.id)}>Remove</button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//             {cart.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
//         </div>
//     );
// };

// export default Cart;

// import React from "react";
// import { useCart } from "../Pages/CartContext";

// const Cart = () => {
//     const { cart, removeFromCart, clearCart } = useCart();

//     // Calculate the total price of the cart
//     const getTotalPrice = () => {
//         return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//     };

//     // Confirm before clearing the cart
//     const handleClearCart = () => {
//         if (window.confirm("Are you sure you want to clear the cart?")) {
//             clearCart();
//         }
//     };

//     return (
//         <div className="cart-container">
//             <h2>Your Cart</h2>
//             {cart.length === 0 ? (
//                 <p>The cart is empty.</p>
//             ) : (
//                 <div>
//                     <ul className="cart-list">
//                         {cart.map((item) => (
//                             <li key={item.id} className="cart-item">
//                                 <div>
//                                     <h3>{item.name}</h3>
//                                     <p>Price: ${item.price.toFixed(2)}</p>
//                                     <p>Quantity: {item.quantity}</p>
//                                     <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
//                                 </div>
//                                 <button
//                                     className="remove-btn"
//                                     onClick={() => removeFromCart(item.id)}
//                                 >
//                                     Remove
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="cart-total">
//                         <h3>Grand Total: ${getTotalPrice()}</h3>
//                     </div>
//                     <button className="clear-cart-btn" onClick={handleClearCart}>
//                         Clear Cart
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;

// import React from "react";
// import { useCart } from "../Pages/CartContext";

// const Cart = () => {
//     const { cart, removeFromCart, clearCart } = useCart();

//     // Calculate the total price of the cart
//     const getTotalPrice = () => {
//         return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//     };

//     // Confirm before clearing the cart
//     const handleClearCart = () => {
//         if (window.confirm("Are you sure you want to clear the cart?")) {
//             clearCart();
//         }
//     };

//     return (
//         <div className="cart-container">
//             <h2>Your Cart</h2>
//             {cart.length === 0 ? (
//                 <p>The cart is empty.</p>
//             ) : (
//                 <div>
//                     <ul className="cart-list">
//                         {cart.map((item) => (
//                             <li key={item.id} className="cart-item">
//                                 <div>
//                                     <h3>{item.name}</h3>
//                                     <p>Price: ${item.price.toFixed(2)}</p>
//                                     <p>Quantity: {item.quantity}</p>
//                                     <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
//                                 </div>
//                                 <button
//                                     className="remove-btn"
//                                     onClick={() => removeFromCart(item.id)}
//                                 >
//                                     Remove
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="cart-total">
//                         <h3>Grand Total: ${getTotalPrice()}</h3>
//                     </div>
//                     <button className="clear-cart-btn" onClick={handleClearCart}>
//                         Clear Cart
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;


// import { useState, useEffect } from "react";
// import { 
//   // useLocation,
//    useNavigate } from "react-router-dom";
// import { useCart } from "../Pages/CartContext";
// import {Product} from "../Pages/Product";
// const Cart = () => {
//   const { cart, updateCartItem, removeFromCart } = useCart();
//   // const location = useLocation();
//   const navigate = useNavigate();

//   const [cartItems, setCartItems] = useState(cart);
//   const [discount, setDiscount] = useState(0);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponMessage, setCouponMessage] = useState("");

//   // Sync cartItems with global cart state
//   useEffect(() => {
//     setCartItems(cart);
//   }, [cart]);

//   // Calculate totals
//   const calculateSubtotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const calculateGST = () => calculateSubtotal() * 0.18;

//   const calculateDiscountedTotal = () => {
//     const subtotal = calculateSubtotal();
//     const GST = calculateGST();
//     return subtotal + GST - discount;
//   };

//   // Apply coupon
//   const handleCouponApply = (e) => {
//     e.preventDefault();
//     if (calculateSubtotal() >= 100 && couponCode === "SAVE40") {
//       setDiscount(40);
//       setCouponMessage("Coupon applied successfully!");
//     } else {
//       setCouponMessage(
//         calculateSubtotal() < 100
//           ? "Total must be greater than $100 to apply the coupon."
//           : "Invalid coupon code."
//       );
//     }
//     setTimeout(() => setCouponMessage(""), 3000);
//   };

//   // Handle quantity changes
//   const handleQuantityChange = (id, newQty) => {
//     if (newQty <= 0) return;
//     updateCartItem(id, newQty);
//   };

//   // Increment and decrement quantity
//   const handleIncrement = (id, currentQty) => {
//     handleQuantityChange(id, currentQty + 1);
//   };

//   const handleDecrement = (id, currentQty) => {
//     if (currentQty > 1) {
//       handleQuantityChange(id, currentQty - 1);
//     }
//   };

//   // Remove item from cart
//   const handleRemoveItem = (id) => {
//     removeFromCart(id);
//   };

//   // Navigation
//   const handleCheckout = () => {
//     navigate("/checkout");
//   };

//   const handleGoToCategories = () => {
//     navigate("/categories");
//   };

//   return (
//     <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
//       <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//         <button
//           onClick={handleGoToCategories}
//           className="bg-blue-700 text-white flex float-left font-semibold py-2 px-4 rounded-md -mt-4 -ml-28 hover:bg-black focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//         >
//           &larr; Back to Categories
//         </button>
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mr-14">
//           CART
//         </h2>

//         <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
//           <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
//             {cartItems.length > 0 ? (
//               <div className="space-y-6">
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
//                   >
//                     <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
//                       <img
//                         className="h-20 w-20"
//                         src={item.image || "https://via.placeholder.com/150"}
//                         alt={item.name}
//                       />
//                       <div className="flex items-center">
//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleDecrement(item.id, item.quantity)
//                           }
//                           className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
//                         >
//                           -
//                         </button>
//                         <input
//                           type="text"
//                           className="w-10 border-0 bg-transparent text-center text-sm font-medium"
//                           value={item.quantity}
//                           readOnly
//                         />
//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleIncrement(item.id, item.quantity)
//                           }
//                           className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
//                         >
//                           +
//                         </button>
//                       </div>
//                       <div className="text-end">
//                         <p className="text-base font-bold text-gray-900 dark:text-white">
//                           ${item.price}
//                         </p>
//                       </div>
//                       <div className="w-full">
//                         <p className="text-base font-medium">{item.name}</p>
//                         <p className="text-sm text-gray-500">
//                           {item.description}
//                         </p>
//                         <button
//                           onClick={() => handleRemoveItem(item.id)}
//                           className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center space-y-4 p-6">
//                 <img
//                   src="https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg?semt=ais_hybrid"
//                   alt="No products in cart"
//                   className="w-48 h-48"
//                 />
//                 <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
//                   No product in the cart. Add your desired product to proceed
//                   further.
//                 </p>
//                 <button
//                   onClick={handleGoToCategories}
//                   className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   Browse Products
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
//             <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
//               <p className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Order summary
//               </p>
//               <div className="space-y-4">
//                 <dl className="flex items-center justify-between">
//                   <dt className="text-base text-gray-500">Subtotal</dt>
//                   <dd className="text-base text-gray-900">
//                     ${calculateSubtotal().toFixed(2)}
//                   </dd>
//                 </dl>
//                 <dl className="flex items-center justify-between">
//                   <dt className="text-base text-gray-500">GST (18%)</dt>
//                   <dd className="text-base text-gray-900">
//                     ${calculateGST().toFixed(2)}
//                   </dd>
//                 </dl>
//                 <dl className="flex items-center justify-between">
//                   <dt className="text-base text-gray-500">Discount</dt>
//                   <dd className="text-base text-green-600">
//                     -${discount.toFixed(2)}
//                   </dd>
//                 </dl>
//                 <dl className="flex items-center justify-between">
//                   <dt className="text-base font-bold text-gray-900">Total</dt>
//                   <dd className="text-base font-bold text-gray-900">
//                     ${calculateDiscountedTotal().toFixed(2)}
//                   </dd>
//                 </dl>
//               </div>
//               <button
//                 onClick={handleCheckout}
//                 className="w-full bg-blue-700 text-white py-2 rounded-lg"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>

//             <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
//               <form onSubmit={handleCouponApply}>
//                 <label className="block mb-2 text-sm">Coupon Code</label>
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   className="w-full p-2 border rounded-lg"
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-700 text-white py-2 mt-2 rounded-lg"
//                 >
//                   Apply Code
//                 </button>
//                 {couponMessage && (
//                   <p className="mt-2 text-sm text-red-600">{couponMessage}</p>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;


