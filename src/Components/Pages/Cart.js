// /* eslint-disable jsx-a11y/img-redundant-alt */
// /* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Pages/CartContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../Css/Cart.css'
const Cart = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Card");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
    upiId: "",
    paypalEmail: "",
  });

  // Handle UPI ID verification
  const handleVerifyUpiId = () => {
    if (paymentDetails.upiId) {
      alert(`UPI ID ${paymentDetails.upiId} verified successfully!`);
    } else {
      alert("Please enter a valid UPI ID.");
    }
  };

  // Handle PayLater confirmation
  const handleConfirmPayLater = () => {
    alert("PayLater option selected. Please complete payment within 30 days.");
  };

  // Handle final order confirmation
  const handleConfirmOrder = () => {
    if (selectedPaymentMethod === "Card" && !paymentDetails.cardNumber) {
      alert("Please fill in all card details.");
      return;
    }

    if (selectedPaymentMethod === "UPI" && !paymentDetails.upiId) {
      alert("Please enter a valid UPI ID.");
      return;
    }

    if (selectedPaymentMethod === "PayPal" && !paymentDetails.paypalEmail) {
      alert("Please enter a valid PayPal email.");
      return;
    }

    alert(`Payment successful with ${selectedPaymentMethod}!`);
  };
  const [activeButton, setActiveButton] = useState("cart");

  const { cart, incrementCartItem, decrementCartItem, removeFromCart } =
    useCart();
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      street: "123 Elm Street",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "0987654321",
      street: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
    },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const coupons = [
    { code: "SAVE40", type: "fixed", value: 40, minAmount: 100 },
    { code: "DISCOUNT10", type: "percentage", value: 10, minAmount: 50 },
    { code: "FREESHIP", type: "fixed", value: 20, minAmount: 150 },
    { code: "SAVE80%", type: "percentage", value: 80, minAmount: 2000 },
  ];

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
    return calculateTotalBeforeDiscount() - discount;
  };

  const handleCouponApply = () => {
    const totalBeforeDiscount = calculateTotalBeforeDiscount();

    const coupon = coupons.find(
      (c) => c.code === couponCode.trim().toUpperCase()
    );

    if (coupon) {
      if (totalBeforeDiscount >= coupon.minAmount) {
        if (coupon.type === "fixed") {
          setDiscount(coupon.value);
        } else if (coupon.type === "percentage") {
          setDiscount((totalBeforeDiscount * coupon.value) / 100);
        }
        toast.success("Coupon applied successfully!");
      } else {
        toast.error(
          `Minimum Total amount must be greater than $${coupon.minAmount}.`
        );
      }
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewAddress = () => {
    if (
      !newAddress.name ||
      !newAddress.email ||
      !newAddress.phone ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.zip
    ) {
      toast.error("Please fill in all the fields!");
      return;
    }
    setSavedAddresses((prev) => [...prev, { ...newAddress, id: Date.now() }]);
    setSelectedAddressId(Date.now());
    toast.success("Address saved successfully!");
    setNewAddress({
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    });
  };

  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      toast.error("Please select an address!");
      return;
    }
    toast.success("Address selected successfully!");
    setTimeout(() => setActiveButton("payment"), 2000);
  };

  const renderActiveSection = () => {
    switch (activeButton) {
      case "cart":
        return cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.id}
              className="custom-scrollbar rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <img className="h-20 w-20" src={item.image} alt={item.name} />
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
                    className="ml-4 text-red-400 hover:text-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        );

        case "address":
        return (
          <div className="text-gray-700 dark:text-white">
            <div className="mx-auto max-w-screen-lg px-4 py-8">
              <h2 className="text-2xl font-bold mb-4">Select Address</h2>
              <div className="space-y-4">
                {savedAddresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex items-center space-x-4 p-4 border-2 rounded ${
                      selectedAddressId === addr.id
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={addr.id}
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="h-4 w-4 accent-blue-600"
                    />
                    <div>
                      <p className="font-medium">{addr.name}</p>
                      <p>{`${addr.street}, ${addr.city}, ${addr.state} - ${addr.zip}`}</p>
                      <p>{`Phone: ${addr.phone}`}</p>
                    </div>
                  </label>
                ))}
              </div>
              <h3 className="text-xl font-bold mt-6">Add New Address</h3>
              <div className="space-y-4 mt-4">
                <input
                  type="text"
                  name="name"
                  value={newAddress.name}
                  onChange={handleNewAddressChange}
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={newAddress.email}
                  onChange={handleNewAddressChange}
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleNewAddressChange}
                  placeholder="Phone Number"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleNewAddressChange}
                  placeholder="Street Address"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleNewAddressChange}
                  placeholder="City"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleNewAddressChange}
                  placeholder="State"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="zip"
                  value={newAddress.zip}
                  onChange={handleNewAddressChange}
                  placeholder="ZIP Code"
                  className="w-full p-2 border rounded"
                />
                <div className="flex flex-row justify-center gap-10">
                <button
                  onClick={handleSaveNewAddress}
                  className="w-fit  bg-green-700 mt-6 text-white py-2 px-4 rounded hover:bg-green-800"
                >
                  Save New Address
                </button>
              <button
                onClick={handleProceedToPayment}
                className="mt-6 w-fit bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
                >
                Proceed to Payment
              </button>
                  </div>
                </div>
            </div>
          </div>
        );

        case "payment":
          return (
            <div className="text-gray-700 dark:text-white">
              <div className="mx-auto max-w-screen-lg px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>

                {/* Payment Method Options */}
                <div className="space-y-4">
                  {["Card", "UPI", "PayPal", "PayLater"].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center space-x-4 p-4 border rounded ${
                        selectedPaymentMethod === method
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={selectedPaymentMethod === method}
                        onChange={() => setSelectedPaymentMethod(method)}
                        className="h-4 w-4 accent-blue-600"
                      />
                      <p className="font-medium">{method}</p>
                    </label>
                  ))}
                </div>

                {/* Dynamic Input Fields Based on Payment Method */}
                <div className="mt-6">
                  {selectedPaymentMethod === "Card" && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={paymentDetails.cardNumber}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cardNumber: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentDetails.expiry}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              expiry: e.target.value,
                            })
                          }
                          className="w-1/2 p-2 border rounded"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={paymentDetails.cvv}
                          onChange={(e) =>
                            setPaymentDetails({
                              ...paymentDetails,
                              cvv: e.target.value,
                            })
                          }
                          className="w-1/2 p-2 border rounded"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Card Holder Name"
                        value={paymentDetails.cardHolder}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cardHolder: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  )}

                  {selectedPaymentMethod === "UPI" && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Enter UPI ID"
                        value={paymentDetails.upiId}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            upiId: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                      <button
                        onClick={handleVerifyUpiId}
                        className="w-fit bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
                      >
                        Verify UPI ID
                      </button>
                    </div>
                  )}

                  {selectedPaymentMethod === "PayPal" && (
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="PayPal Email"
                        value={paymentDetails.paypalEmail}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            paypalEmail: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  )}

                  {selectedPaymentMethod === "PayLater" && (
                    <div className="space-y-4">
                      <p className="text-gray-700">
                        PayLater allows you to complete your payment within 30
                        days.
                      </p>
                      <button
                        onClick={handleConfirmPayLater}
                        type="dropdown dropdown-toggle" 
                        className="w-fit bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800"
                      >
                        Proceed with PayLater
                      </button>
                    </div>
                  )}
                </div>

                {/* Confirm Payment Button */}
                <button
                  onClick={handleConfirmOrder}
                  className="mt-6 w-fit bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          );

      default:
        return null;
    }
  };

  return (
    <section
      className="bg-white dark:bg-gray-900"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 h-full flex flex-col">
        <button
          onClick={() => navigate("/categories")}
          className="bg-blue-700 text-white w-48 font-semibold py-2 px-4 rounded-md hover:bg-black focus:outline-none flex justify-start mb-10 mt-10 -ml-24"
        >
          &larr; Back to Categories
        </button>
        <div className="flex justify-center items-center border-b border-gray-200 whitespace-nowrap dark:border-gray-700 mb-4">
          <button
            onClick={() => setActiveButton("cart")}
            className={`inline-flex items-center h-10 px-2 py-2 text-center sm:px-4 whitespace-nowrap focus:outline-none ${
              activeButton === "cart"
                ? "text-blue-600 border-b-2 border-blue-500 dark:border-blue-400 dark:text-blue-300 text-lg"
                : "text-gray-700 border-b-2 border-transparent hover:border-gray-400 dark:text-white text-sm"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              fill="currentColor"
              className="bi bi-cart mr-1"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            Cart
          </button>

          <button
            onClick={() => setActiveButton("address")}
            className={`inline-flex items-center h-10 px-2 py-2 text-center sm:px-4 whitespace-nowrap focus:outline-none ${
              activeButton === "address"
                ? "text-blue-600 border-b-2 border-blue-500 dark:border-blue-400 dark:text-blue-300 text-lg"
                : "text-gray-700 border-b-2 border-transparent hover:border-gray-400 dark:text-white text-sm"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mx-1 sm:w-6 sm:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
            Address
          </button>

          <button
            onClick={() => setActiveButton("payment")}
            className={`inline-flex items-center h-10 px-2 py-2 text-center sm:px-4 whitespace-nowrap focus:outline-none ${
              activeButton === "payment"
                ? "text-blue-600 border-b-2 border-blue-500 dark:border-blue-400 dark:text-blue-300 text-lg"
                : "text-gray-700 border-b-2 border-transparent hover:border-gray-400 dark:text-white text-sm"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mx-1 sm:w-6 sm:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            Payment
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div
            className="flex-1 overflow-y-auto space-y-6 pr-4"
            style={{ maxHeight: "calc(100% - 150px)" }}
          >
            {renderActiveSection()}
          </div>

          <div className="lg:w-1/3 space-y-6 pl-4">
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
                onClick={() => {
                  if (activeButton === "cart") {
                    setActiveButton("address"); // Move to the Address section
                  } else if (activeButton === "address") {
                    setActiveButton("payment"); // Move to the Payment section
                  } else if (activeButton === "payment") {
                    navigate("/Cart/Checkout"); // Navigate to the final Checkout page
                  }
                }}
                className="mt-4 w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
              >
                {activeButton === "cart"
                  ? "Proceed to Address"
                  : activeButton === "address"
                  ? "Proceed to Payment"
                  : "Proceed to Checkout"}
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
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </section>
  );
};

export default Cart;
