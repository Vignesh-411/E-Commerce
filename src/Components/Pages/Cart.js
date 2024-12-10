/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../Pages/CartContext";

// const Cart = () => {
//   const { cart, removeFromCart } = useCart(); // Hook to manage cart state
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [cartItems, setCartItems] = useState(
//     cart.length ? cart : location.state?.product ? [location.state.product] : []
//   );
//   const [discount, setDiscount] = useState(0);
//   const [couponCode, setCouponCode] = useState("");
//   const [validCoupon, setValidCoupon] = useState(false);
//   const [couponMessage, setCouponMessage] = useState("");

//   useEffect(() => {
//     if (!cart.length && location.state?.product) {
//       setCartItems([location.state.product]);
//     }
//   }, [cart, location.state]);

//   const handleQuantityChange = (id, e) => {
//     const updatedQty = parseInt(e.target.value, 10);
//     if (isNaN(updatedQty) || updatedQty <= 0) return;

//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity: updatedQty } : item
//       )
//     );
//   };

//   const calculateSubtotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const calculateGST = () => calculateSubtotal() * 0.18;

//   const calculateDiscountedTotal = () => {
//     const subtotal = calculateSubtotal();
//     const GST = calculateGST();
//     return subtotal + GST - discount;
//   };

//   const handleCouponApply = () => {
//     if (calculateSubtotal() >= 100 && couponCode === "SAVE40") {
//       setDiscount(40);
//       setValidCoupon(true);
//       setCouponMessage("Coupon applied successfully!");
//     } else {
//       setValidCoupon(false);
//       setCouponMessage(
//         calculateSubtotal() < 100
//           ? "Total must be greater than $100 to apply the coupon."
//           : "Invalid coupon code."
//       );
//     }
//     setTimeout(() => setCouponMessage(""), 3000);
//   };

//   const handleRemoveItem = (id) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//     removeFromCart(id);
//   };

//   const handleCheckout = () => {
//     navigate("/checkout");
//   };

//   const handleGoToCategories = () => {
//     navigate("/categories");
//   };

//   return (
//     <section>
//       <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//         <button
//           onClick={handleGoToCategories}
//           className="bg-gray-700 text-white flex float-left font-semibold py-2 px-4 rounded-md mb-4 -ml-32"
//         >
//           &larr; Back to Categories
//         </button>

//         <div className="mx-auto max-w-3xl">
//           <header className="text-center">
//             <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
//               Your Cart
//             </h1>
//           </header>

//           <div className="mt-8">
//             <ul className="space-y-4">
//               {cartItems.map((item) => (
//                 <li key={item.id} className="flex items-center gap-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="size-16 rounded object-cover"
//                   />
//                   <div>
//                     <h3 className="text-sm text-gray-900">{item.name}</h3>
//                     <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
//                       <div>
//                         <dt className="inline">Size:</dt>
//                         <dd className="inline">{item.size}</dd>
//                       </div>
//                       <div>
//                         <dt className="inline">Color:</dt>
//                         <dd className="inline">{item.color}</dd>
//                       </div>
//                     </dl>
//                   </div>

//                   <div className="flex flex-1 items-center justify-end gap-2">
//                     <form>
//                       <label htmlFor={`Line${item.id}Qty`} className="sr-only">
//                         Quantity
//                       </label>
//                       <input
//                         type="number"
//                         min="1"
//                         id={`Line${item.id}Qty`}
//                         name="quantity"
//                         value={item.quantity}
//                         className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
//                         onChange={(e) => handleQuantityChange(item.id, e)}
//                       />
//                     </form>
//                     <button
//                       onClick={() => handleRemoveItem(item.id)}
//                       className="text-gray-600 transition hover:text-red-600"
//                     >
//                       <span className="sr-only">Remove item</span>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
//             <div className="w-screen max-w-lg space-y-4">
//               <dl className="space-y-0.5 text-sm text-gray-700">
//                 <div className="flex justify-between">
//                   <dt>Subtotal</dt>
//                   <dd>${calculateSubtotal().toFixed(2)}</dd>
//                 </div>
//                 <div className="flex justify-between">
//                   <dt>GST (18%)</dt>
//                   <dd>${calculateGST().toFixed(2)}</dd>
//                 </div>
//                 <div className="flex justify-between">
//                   <dt>Discount</dt>
//                   <dd>-${discount.toFixed(2)}</dd>
//                 </div>
//                 <div className="flex justify-between !text-base font-medium">
//                   <dt>Total</dt>
//                   <dd>${calculateDiscountedTotal().toFixed(2)}</dd>
//                 </div>
//               </dl>

//               <div className="mt-4">
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   placeholder="Enter Coupon Code"
//                   className="w-full p-2 border rounded-md text-gray-700"
//                 />
//                 <h1 className="text-sm text-green-600">
//                   Apply: "SAVE40" to get $40 discount
//                 </h1>
//                 <button
//                   onClick={handleCouponApply}
//                   className="w-full mt-2 p-2 bg-indigo-600 text-white rounded-md"
//                 >
//                   Apply Coupon
//                 </button>
//                 {couponMessage && (
//                   <p
//                     className={`mt-2 text-sm ${
//                       validCoupon ? "text-green-500" : "text-red-500"
//                     }`}
//                   >
//                     {couponMessage}
//                   </p>
//                 )}
//               </div>

//               <div className="flex justify-end mt-4">
//                 <button
//                   onClick={handleCheckout}
//                   className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg"
//                 >
//                   Proceed to Checkout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../Pages/CartContext";

// const Cart = () => {
//   const { cart, updateCartItem, removeFromCart } = useCart(); // Include an `updateCartItem` function in `useCart`
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [cartItems, setCartItems] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponMessage, setCouponMessage] = useState("");

//   // Sync cartItems with global cart state
//   useEffect(() => {
//     const initialCartItems = location.state?.product
//       ? [...cart, { ...location.state.product, quantity: 1 }]
//       : cart;
//     setCartItems(initialCartItems);
//   }, [cart, location.state]);

//   const handleQuantityChange = (id, e) => {
//     const updatedQty = parseInt(e.target.value, 10);
//     if (isNaN(updatedQty) || updatedQty <= 0) return;

//     const updatedCartItems = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: updatedQty } : item
//     );
//     setCartItems(updatedCartItems);
//     updateCartItem(id, updatedQty); // Update quantity in global cart state
//   };

//   const calculateSubtotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const calculateGST = () => calculateSubtotal() * 0.18;

//   const calculateDiscountedTotal = () => {
//     const subtotal = calculateSubtotal();
//     const GST = calculateGST();
//     return subtotal + GST - discount;
//   };

//   const handleCouponApply = () => {
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

//   const handleRemoveItem = (id) => {
//     const updatedCartItems = cartItems.filter((item) => item.id !== id);
//     setCartItems(updatedCartItems);
//     removeFromCart(id); // Remove from global cart state
//   };

//   const handleCheckout = () => {
//     navigate("/checkout");
//   };

//   const handleGoToCategories = () => {
//     navigate("/categories");
//   };

//   return (
//     <section>
//       <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//         <button
//           onClick={handleGoToCategories}
//           className="bg-gray-700 text-white flex float-left font-semibold py-2 px-4 rounded-md mb-4 -ml-32"
//         >
//           &larr; Back to Categories
//         </button>

//         <div className="mx-auto max-w-3xl">
//           <header className="text-center">
//             <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
//               Your Cart
//             </h1>
//           </header>

//           <div className="mt-8">
//             <ul className="space-y-4">
//               {cartItems.map((item) => (
//                 <li key={item.id} className="flex items-center gap-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="size-16 rounded object-cover"
//                   />
//                   <div>
//                     <h3 className="text-sm text-gray-900">{item.name}</h3>
//                     <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
//                       <div>
//                         <dt className="inline">Size:</dt>
//                         <dd className="inline">{item.size}</dd>
//                       </div>
//                       <div>
//                         <dt className="inline">Color:</dt>
//                         <dd className="inline">{item.color}</dd>
//                       </div>
//                     </dl>
//                   </div>

//                   <div className="flex flex-1 items-center justify-end gap-2">
//                     <form>
//                       <label htmlFor={`Line${item.id}Qty`} className="sr-only">
//                         Quantity
//                       </label>
//                       <input
//                         type="number"
//                         min="1"
//                         id={`Line${item.id}Qty`}
//                         name="quantity"
//                         value={item.quantity}
//                         className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
//                         onChange={(e) => handleQuantityChange(item.id, e)}
//                       />
//                     </form>
//                     <button
//                       onClick={() => handleRemoveItem(item.id)}
//                       className="text-gray-600 transition hover:text-red-600"
//                     >
//                       <span className="sr-only">Remove item</span>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
//             <div className="w-screen max-w-lg space-y-4">
//               <dl className="space-y-0.5 text-sm text-gray-700">
//                 <div className="flex justify-between">
//                   <dt>Subtotal</dt>
//                   <dd>${calculateSubtotal().toFixed(2)}</dd>
//                 </div>
//                 <div className="flex justify-between">
//                   <dt>GST (18%)</dt>
//                   <dd>${calculateGST().toFixed(2)}</dd>
//                 </div>
//                 <div className="flex justify-between">
//                   <dt>Discount</dt>
//                   <dd>-${discount.toFixed(2)}</dd>
//                 </div>
//                 <div className="flex justify-between !text-base font-medium">
//                   <dt>Total</dt>
//                   <dd>${calculateDiscountedTotal().toFixed(2)}</dd>
//                 </div>
//               </dl>

//               <div className="mt-4">
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   placeholder="Enter Coupon Code"
//                   className="w-full p-2 border rounded-md text-gray-700"
//                 />
//                 <h1 className="text-sm text-green-600">
//                   Apply: "SAVE40" to get $40 discount
//                 </h1>
//                 <button
//                   onClick={handleCouponApply}
//                   className="w-full mt-2 p-2 bg-indigo-600 text-white rounded-md"
//                 >
//                   Apply Coupon
//                 </button>
//                 {couponMessage && (
//                   <p
//                     className={`mt-2 text-sm ${
//                       discount ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {couponMessage}
//                   </p>
//                 )}
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 className="block w-full rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
//               >
//                 Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../Pages/CartContext";

// const Cart = () => {
//   const { cart, updateCartItem, removeFromCart } = useCart();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [cartItems, setCartItems] = useState(cart);
//   const [discount, setDiscount] = useState(0);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponMessage, setCouponMessage] = useState("");

//   // Update cart items on changes to the global cart state or location state
//   useEffect(() => {
//     if (location.state?.product) {
//       const existingItem = cart.find((item) => item.id === location.state.product.id);
//       if (existingItem) {
//         updateCartItem(location.state.product.id, existingItem.quantity + 1);
//       } else {
//         setCartItems((prev) => [...prev, { ...location.state.product, quantity: 1 }]);
//       }
//     }
//   }, [location.state, cart, updateCartItem]);

//   const handleQuantityChange = (id, e) => {
//     const updatedQty = parseInt(e.target.value, 10);
//     if (isNaN(updatedQty) || updatedQty <= 0) return;

//     const updatedCartItems = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: updatedQty } : item
//     );
//     setCartItems(updatedCartItems);
//     updateCartItem(id, updatedQty);
//   };

//   const calculateSubtotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const calculateGST = () => calculateSubtotal() * 0.18;

//   const calculateDiscountedTotal = () => {
//     const subtotal = calculateSubtotal();
//     const GST = calculateGST();
//     return subtotal + GST - discount;
//   };

//   const handleCouponApply = () => {
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

//   const handleRemoveItem = (id) => {
//     const updatedCartItems = cartItems.filter((item) => item.id !== id);
//     setCartItems(updatedCartItems);
//     removeFromCart(id);
//   };

//   const handleCheckout = () => {
//     navigate("/checkout");
//   };

//   const handleGoToCategories = () => {
//     navigate("/categories");
//   };

//   return (
//     <section>
//       <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
//         <button
//           onClick={handleGoToCategories}
//           className="bg-gray-700 text-white flex float-left font-semibold py-2 px-4 rounded-md mb-4 -ml-32"
//         >
//           &larr; Back to Categories
//         </button>

//         <div className="mx-auto max-w-3xl">
//           <header className="text-center">
//             <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
//               Your Cart
//             </h1>
//           </header>

//           <div className="mt-8">
//             <ul className="space-y-4">
//               {cartItems.map((item) => (
//                 <li key={item.id} className="flex items-center gap-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="size-16 rounded object-cover"
//                   />
//                   <div>
//                     <h3 className="text-sm text-gray-900">{item.name}</h3>
//                     <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
//                       <div>
//                         <dt className="inline">Size:</dt>
//                         <dd className="inline">{item.size}</dd>
//                       </div>
//                       <div>
//                         <dt className="inline">Color:</dt>
//                         <dd className="inline">{item.color}</dd>
//                       </div>
//                     </dl>
//                   </div>

//                   <div className="flex flex-1 items-center justify-end gap-2">
//                     <form>
//                       <label htmlFor={`Line${item.id}Qty`} className="sr-only">
//                         Quantity
//                       </label>
//                       <input
//                         type="number"
//                         min="1"
//                         id={`Line${item.id}Qty`}
//                         name="quantity"
//                         value={item.quantity}
//                         className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
//                         onChange={(e) => handleQuantityChange(item.id, e)}
//                       />
//                     </form>
//                     <button
//                       onClick={() => handleRemoveItem(item.id)}
//                       className="text-gray-600 transition hover:text-red-600"
//                     >
//                       <span className="sr-only">Remove item</span>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
//             <div className="w-screen max-w-lg space-y-4">
//               <dl className="space-y-0.5 text-sm text-gray-700">
//                 <div className="flex justify-between">
//                   <dt>Subtotal</dt>
//                   <dd>${calculateSubtotal().toFixed(2)}</dd>
//                 </div>
//                 <div className="flex justify-between">
//                   <dt>GST (18%)</dt>
//                   <dd>${calculateGST().toFixed(2)}</dd>
//                 </div>
//                 <div className="flex justify-between">
//                   <dt>Discount</dt>
//                   <dd>-${discount.toFixed(2)}</dd>
//                 </div>
//                 <div className="flex justify-between !text-base font-medium">
//                   <dt>Total</dt>
//                   <dd>${calculateDiscountedTotal().toFixed(2)}</dd>
//                 </div>
//               </dl>

//               <div className="mt-4">
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   placeholder="Enter Coupon Code"
//                   className="w-full p-2 border rounded-md text-gray-700"
//                 />
//                 <h1 className="text-sm text-green-600">
//                   Apply: "SAVE40" to get $40 discount
//                 </h1>
//                 <button
//                   onClick={handleCouponApply}
//                   className="w-full mt-2 p-2 bg-indigo-600 text-white rounded-md"
//                 >
//                   Apply Coupon
//                 </button>
//                 {couponMessage && (
//                   <p
//                     className={`mt-2 text-sm ${
//                       discount ? "text-green-600" : "text-red-600"
//                     }`}
//                   >
//                     {couponMessage}
//                   </p>
//                 )}
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 className="block w-full rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
//               >
//                 Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;


// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../Pages/CartContext";
// import {Product} from "../Pages/Product";

// const Cart = () => {
//   const { cart, updateCartItem, removeFromCart } = useCart();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [cartItems, setCartItems] = useState(cart);
//   const [discount, setDiscount] = useState(0);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponMessage, setCouponMessage] = useState("");

//   // Sync cartItems with global cart state
//   useEffect(() => {
//     setCartItems(cart);
//   }, [cart]);

//   // Handle quantity changes
//   const handleQuantityChange = (id, e) => {
//     const updatedQty = parseInt(e.target.value, 10);
//     if (isNaN(updatedQty) || updatedQty <= 0) return;

//     updateCartItem(id, updatedQty);
//   };

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
//   const handleCouponApply = () => {
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
//     <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
//       <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
//       <button
//           onClick={handleGoToCategories}
//           className="bg-blue-700 text-white flex float-left font-semibold py-2 px-4 rounded-md -mt-4 -ml-28 hover:bg-black focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//         >
//           &larr; Back to Categories
//         </button>
//         <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mr-14">
//           {" "}
//           CART
//         </h2>

//         <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
//           <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
//             <div class="space-y-6">
//               <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
//                 <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
//                   <a href="#" class="shrink-0 md:order-1">
//                     <img
//                       class="h-20 w-20 dark:hidden"
//                       src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
//                       alt="imac image"
//                     />
//                     <img
//                       class="hidden h-20 w-20 dark:block"
//                       src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
//                       alt="imac image"
//                     />
//                   </a>

//                   <label for="counter-input" class="sr-only">
//                     Choose quantity:
//                   </label>
//                   <div class="flex items-center justify-between md:order-3 md:justify-end">
//                     <div class="flex items-center">
//                       <button
//                         type="button"
//                         id="decrement-button"
//                         data-input-counter-decrement="counter-input"
//                         class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
//                       >
//                         <svg
//                           class="h-2.5 w-2.5 text-gray-900 dark:text-white"
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 18 2"
//                         >
//                           <path
//                             stroke="currentColor"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="M1 1h16"
//                           />
//                         </svg>
//                       </button>
//                       <input
//                         type="text"
//                         id="counter-input"
//                         data-input-counter
//                         class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
//                         placeholder=""
//                         value="2"
//                         required
//                       />
//                       <button
//                         type="button"
//                         id="increment-button"
//                         data-input-counter-increment="counter-input"
//                         class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
//                       >
//                         <svg
//                           class="h-2.5 w-2.5 text-gray-900 dark:text-white"
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 18 18"
//                         >
//                           <path
//                             stroke="currentColor"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="M9 1v16M1 9h16"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                     <div class="text-end md:order-4 md:w-32">
//                       <p class="text-base font-bold text-gray-900 dark:text-white">
//                         $1,499
//                       </p>
//                     </div>
//                   </div>

//                   <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
//                     <a
//                       href="#"
//                       class="text-base font-medium text-gray-900 hover:underline dark:text-white"
//                     >
//                     {Product.name}
//                     <br/>
//                     {Product.description}
//                     </a>

//                     <div class="flex items-center gap-4">
//                       <button
//                         type="button"
//                         class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
//                       >
//                         <svg
//                           class="me-1.5 h-5 w-5"
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             stroke="currentColor"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
//                           />
//                         </svg>
//                         Add to Favorites
//                       </button>

//                       <button
//                         type="button"
//                         class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
//                       >
//                         <svg
//                           class="me-1.5 h-5 w-5"
//                           aria-hidden="true"
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="24"
//                           height="24"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             stroke="currentColor"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="2"
//                             d="M6 18 17.94 6M18 18 6.06 6"
//                           />
//                         </svg>
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div> 
//             <div class="hidden xl:mt-8 xl:block">
//               <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
//                 People also bought
//               </h3>
//               <div class="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
               
//                 <div class="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
//                   <a href="#" class="overflow-hidden rounded">
//                     <img
//                       class="mx-auto h-44 w-44 dark:hidden"
//                       src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
//                       alt="imac image"
//                     />
//                     <img
//                       class="mx-auto hidden h-44 w-44 dark:block"
//                       src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg"
//                       alt="imac image"
//                     />
//                   </a>
//                   <div>
//                     <a
//                       href="#"
//                       class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
//                     >
//                       Playstation 5
//                     </a>
//                     <p class="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
//                       This generation has some improvements, including a longer
//                       continuous battery life.
//                     </p>
//                   </div>
//                   <div>
//                     <p class="text-lg font-bold text-gray-900 dark:text-white">
//                       <span class="line-through"> $799,99 </span>
//                     </p>
//                     <p class="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
//                       $499
//                     </p>
//                   </div>
//                   <div class="mt-6 flex items-center gap-2.5">
//                     <button
//                       data-tooltip-target="favourites-tooltip-2"
//                       type="button"
//                       class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
//                     >
//                       <svg
//                         class="h-5 w-5"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           stroke="currentColor"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           stroke-width="2"
//                           d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
//                         ></path>
//                       </svg>
//                     </button>
//                     <div
//                       id="favourites-tooltip-2"
//                       role="tooltip"
//                       class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
//                     >
//                       Add to favourites
//                       <div class="tooltip-arrow" data-popper-arrow></div>
//                     </div>
//                     <button
//                       type="button"
//                       class="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                     >
//                       <svg
//                         class="-ms-2 me-2 h-5 w-5"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           stroke="currentColor"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                           stroke-width="2"
//                           d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4"
//                         />
//                       </svg>
//                       Add to cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
//             <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
//               <p class="text-xl font-semibold text-gray-900 dark:text-white">
//                 Order summary
//               </p>

//               <div class="space-y-4">
//                 <div class="space-y-2">
//                   <dl class="flex items-center justify-between gap-4">
//                     <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
//                       Original price
//                     </dt>
//                     <dd class="text-base font-medium text-gray-900 dark:text-white">
//                       $7,592.00
//                     </dd>
//                   </dl>

//                   <dl class="flex items-center justify-between gap-4">
//                     <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
//                       Savings
//                     </dt>
//                     <dd class="text-base font-medium text-green-600">
//                       -$299.00
//                     </dd>
//                   </dl>

//                   <dl class="flex items-center justify-between gap-4">
//                     <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
//                       Store Pickup
//                     </dt>
//                     <dd class="text-base font-medium text-gray-900 dark:text-white">
//                       $99
//                     </dd>
//                   </dl>

//                   <dl class="flex items-center justify-between gap-4">
//                     <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
//                       Tax
//                     </dt>
//                     <dd class="text-base font-medium text-gray-900 dark:text-white">
//                       $799
//                     </dd>
//                   </dl>
//                 </div>

//                 <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
//                   <dt class="text-base font-bold text-gray-900 dark:text-white">
//                     Total
//                   </dt>
//                   <dd class="text-base font-bold text-gray-900 dark:text-white">
//                     $8,191.00
//                   </dd>
//                 </dl>
//               </div>

//               <a
//                 href="#"
//                 class="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//               >
//                 Proceed to Checkout
//               </a>

//               <div class="flex items-center justify-center gap-2">
//                 <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
//                   {" "}
//                   or{" "}
//                 </span>
//                 <a
//                   href="#"
//                   title=""
//                   class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
//                 >
//                   Continue Shopping
//                   <svg
//                     class="h-5 w-5"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M19 12H5m14 0-4 4m4-4-4-4"
//                     />
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
//               <form class="space-y-4">
//                 <div>
//                   <label
//                     for="voucher"
//                     class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     {" "}
//                     Do you have a voucher or gift card?{" "}
//                   </label>
//                   <input
//                     type="text"
//                     id="voucher"
//                     class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
//                     placeholder="Enter"
//                     required
//                     onChange={(e) => setCouponCode(e.target.value)}
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   class="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   Apply Code
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Pages/CartContext";

const Cart = () => {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(cart);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  // Sync cartItems with global cart state
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  // Calculate totals
  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateGST = () => calculateSubtotal() * 0.18;

  const calculateDiscountedTotal = () => {
    const subtotal = calculateSubtotal();
    const GST = calculateGST();
    return subtotal + GST - discount;
  };

  // Apply coupon
  const handleCouponApply = (e) => {
    e.preventDefault();
    if (calculateSubtotal() >= 100 && couponCode === "SAVE40") {
      setDiscount(40);
      setCouponMessage("Coupon applied successfully!");
    } else {
      setCouponMessage(
        calculateSubtotal() < 100
          ? "Total must be greater than $100 to apply the coupon."
          : "Invalid coupon code."
      );
    }
    setTimeout(() => setCouponMessage(""), 3000);
  };

  // Handle quantity changes
  const handleQuantityChange = (id, newQty) => {
    if (newQty <= 0) return;
    updateCartItem(id, newQty);
  };

  // Increment and decrement quantity
  const handleIncrement = (id, currentQty) => {
    handleQuantityChange(id, currentQty + 1);
  };

  const handleDecrement = (id, currentQty) => {
    if (currentQty > 1) {
      handleQuantityChange(id, currentQty - 1);
    }
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  // Navigation
  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleGoToCategories = () => {
    navigate("/categories");
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <button
          onClick={handleGoToCategories}
          className="bg-blue-700 text-white flex float-left font-semibold py-2 px-4 rounded-md -mt-4 -ml-28 hover:bg-black focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          &larr; Back to Categories
        </button>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mr-14">
          CART
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {cartItems.length > 0 ? (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <img
                        className="h-20 w-20"
                        src={item.image || "https://via.placeholder.com/150"}
                        alt={item.name}
                      />
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() =>
                            handleDecrement(item.id, item.quantity)
                          }
                          className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="w-10 border-0 bg-transparent text-center text-sm font-medium"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleIncrement(item.id, item.quantity)
                          }
                          className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-end">
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          ${item.price}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="text-base font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 p-6">
                <img
                  src="https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg?semt=ais_hybrid"
                  alt="No products in cart"
                  className="w-48 h-48"
                />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  No product in the cart. Add your desired product to proceed
                  further.
                </p>
                <button
                  onClick={handleGoToCategories}
                  className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Browse Products
                </button>
              </div>
            )}
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
              </p>
              <div className="space-y-4">
                <dl className="flex items-center justify-between">
                  <dt className="text-base text-gray-500">Subtotal</dt>
                  <dd className="text-base text-gray-900">
                    ${calculateSubtotal().toFixed(2)}
                  </dd>
                </dl>
                <dl className="flex items-center justify-between">
                  <dt className="text-base text-gray-500">GST (18%)</dt>
                  <dd className="text-base text-gray-900">
                    ${calculateGST().toFixed(2)}
                  </dd>
                </dl>
                <dl className="flex items-center justify-between">
                  <dt className="text-base text-gray-500">Discount</dt>
                  <dd className="text-base text-green-600">
                    -${discount.toFixed(2)}
                  </dd>
                </dl>
                <dl className="flex items-center justify-between">
                  <dt className="text-base font-bold text-gray-900">Total</dt>
                  <dd className="text-base font-bold text-gray-900">
                    ${calculateDiscountedTotal().toFixed(2)}
                  </dd>
                </dl>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-700 text-white py-2 rounded-lg"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <form onSubmit={handleCouponApply}>
                <label className="block mb-2 text-sm">Coupon Code</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 mt-2 rounded-lg"
                >
                  Apply Code
                </button>
                {couponMessage && (
                  <p className="mt-2 text-sm text-red-600">{couponMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;


// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../Pages/CartContext";

// const Cart = () => {
//   const { cart, updateCartItem, removeFromCart } = useCart();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [cartItems, setCartItems] = useState(cart);
//   const [discount, setDiscount] = useState(0);
//   const [couponCode, setCouponCode] = useState("");
//   const [couponMessage, setCouponMessage] = useState("");
//   const [favorites, setFavorites] = useState(new Set());

//   useEffect(() => {
//     setCartItems(cart);
//   }, [cart]);

//   const handleQuantityChange = (id, e) => {
//     const updatedQty = parseInt(e.target.value, 10);
//     if (isNaN(updatedQty) || updatedQty <= 0) return;
//     updateCartItem(id, updatedQty);
//   };

//   const calculateSubtotal = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const calculateGST = () => calculateSubtotal() * 0.18;

//   const calculateDiscountedTotal = () => {
//     const subtotal = calculateSubtotal();
//     const GST = calculateGST();
//     return subtotal + GST - discount;
//   };

//   const handleCouponApply = () => {
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

//   const handleRemoveItem = (id) => {
//     removeFromCart(id);
//   };

//   const toggleFavorite = (id) => {
//     setFavorites((prevFavorites) => {
//       const updatedFavorites = new Set(prevFavorites);
//       if (updatedFavorites.has(id)) {
//         updatedFavorites.delete(id);
//       } else {
//         updatedFavorites.add(id);
//       }
//       return updatedFavorites;
//     });
//   };

//   const handleCheckout = () => {
//     navigate("/checkout");
//   };

//   const handleGoToCategories = () => {
//     navigate("/categories");
//   };

//   return (
//     <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
//       <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
//           Cart
//         </h2>
//         <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
//           <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
//             <div className="space-y-6">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
//                 >
//                   <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
//                     <a href="#" className="shrink-0 md:order-1">
//                       <img
//                         className="h-20 w-20"
//                         src={item.image}
//                         alt={item.name}
//                       />
//                     </a>
//                     <div className="flex items-center justify-between md:order-3 md:justify-end">
//                       <input
//                         type="number"
//                         className="w-12 text-center border"
//                         value={item.quantity}
//                         onChange={(e) => handleQuantityChange(item.id, e)}
//                       />
//                       <div className="text-end md:w-32">
//                         <p className="text-base font-bold text-gray-900 dark:text-white">
//                           ${item.price * item.quantity}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
//                       <a
//                         href="#"
//                         className="text-base font-medium text-gray-900 hover:underline dark:text-white"
//                       >
//                         {item.name}
//                       </a>
//                       <div className="flex items-center gap-4">
//                         <button
//                           type="button"
//                           className={`inline-flex items-center text-sm font-medium ${
//                             favorites.has(item.id)
//                               ? "text-red-500"
//                               : "text-gray-500"
//                           } hover:text-red-500`}
//                           onClick={() => toggleFavorite(item.id)}
//                         >
//                           <svg
//                             className="h-5 w-5"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               stroke="currentColor"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
//                             />
//                           </svg>
//                           Add to Favorites
//                         </button>
//                         <button
//                           type="button"
//                           className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
//                           onClick={() => handleRemoveItem(item.id)}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
//             <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
//               <p className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Order Summary
//               </p>
//               <dl className="flex items-center justify-between">
//                 <dt>Subtotal</dt>
//                 <dd>${calculateSubtotal().toFixed(2)}</dd>
//               </dl>
//               <dl className="flex items-center justify-between">
//                 <dt>GST (18%)</dt>
//                 <dd>${calculateGST().toFixed(2)}</dd>
//               </dl>
//               <dl className="flex items-center justify-between">
//                 <dt>Discount</dt>
//                 <dd>${discount.toFixed(2)}</dd>
//               </dl>
//               <dl className="flex items-center justify-between font-bold">
//                 <dt>Total</dt>
//                 <dd>${calculateDiscountedTotal().toFixed(2)}</dd>
//               </dl>
//               <input
//                 type="text"
//                 className="w-full p-2 border"
//                 placeholder="Enter Coupon Code"
//                 value={couponCode}
//                 onChange={(e) => setCouponCode(e.target.value)}
//               />
//               <button
//                 className="w-full bg-blue-500 text-white py-2"
//                 onClick={handleCouponApply}
//               >
//                 Apply Coupon
//               </button>
//               <p className="text-red-500">{couponMessage}</p>
//               <button
//                 className="w-full bg-green-500 text-white py-2"
//                 onClick={handleCheckout}
//               >
//                 Proceed to Checkout
//               </button>
//               <button
//                 className="w-full bg-gray-500 text-white py-2"
//                 onClick={handleGoToCategories}  
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;
