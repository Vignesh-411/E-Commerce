// import React from "react";

// const Checkout = () => {
//   return (
//     <div className="overflow-x-hidden">
//       <h1 className="text-4xl mt-10 font-extrabold">Checkout</h1>
//       <div className="boxcontent">
//         <div className="text-2xl flex gap-4 p-10 w-[60rem] border-solid border-2 rounded-xl h-auto mx-10 mt-10 ">
//           <h1 className=" w-full m-0 mb-10 flex justify-center font-bold">
//             Order Summary
//           </h1>
//           <div>
            
//           </div>
//         </div>

//       </div>

//       <div></div>
//     </div>
//   );
// };

// export default Checkout;


import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Pages/CartContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateGST = () => {
    return calculateSubtotal() * 0.18;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error("No items in the cart to place an order.");
      return;
    }

    
    toast.success("Order placed successfully!");
    setTimeout(() => {
      navigate("/categories"); 
    }, 3000); 
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
          onClick={() => navigate("/Cart")}
          className="bg-blue-700 text-white w-48 font-semibold py-2 px-4 rounded-md hover:bg-black focus:outline-none flex justify-start mb-10 mt-10 -ml-24"
        >
          &larr; Back to Cart
        </button>
        <div className="flex justify-center items-center border-b border-gray-200 whitespace-nowrap dark:border-gray-700 mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h2>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div
            className="flex-1 overflow-y-auto space-y-6 pr-4"
            style={{ maxHeight: "calc(100% - 150px)" }}
          >
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
                      <p className="text-gray-900 dark:text-white font-bold">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No items in the cart to checkout.
              </p>
            )}
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
                <p className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </p>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
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

export default Checkout;
