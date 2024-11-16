import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(
    location.state ? [{ ...location.state.product, qty: location.state.product.qty || 1 }] : []
  );
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [validCoupon, setValidCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');

  useEffect(() => {
    if (!location.state) {
      setCartItems([]);
    }
  }, [location.state]);

  const handleQuantityChange = (id, e) => {
    const updatedQty = parseInt(e.target.value, 10);
    if (isNaN(updatedQty) || updatedQty <= 0) {
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: updatedQty } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      const qty = parseInt(item.qty, 10);
      if (isNaN(price) || isNaN(qty)) return total;
      return total + price * qty;
    }, 0);
  };

  const calculateGST = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.1794;
  };

  const calculateDiscountedTotal = () => {
    const subtotal = calculateSubtotal();
    const GST = calculateGST();
    const discountAmount = discount;
    return subtotal + GST - discountAmount;
  };

  const handleCouponApply = () => {
    const total = calculateDiscountedTotal();
    if (total > 100) {
      if (couponCode === 'SAVE40') {
        setDiscount(40);
        setValidCoupon(true);
        setCouponMessage('Coupon applied successfully!');
      } else {
        setValidCoupon(false);
        setCouponMessage('Invalid coupon code.');
      }
    } else {
      setValidCoupon(false);
      setCouponMessage('Total must be greater than $100 to apply the coupon.');
    }
    setTimeout(() => {
      setCouponMessage('');
    }, 3000);
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleGoToCategories = () => {
    navigate('/categories');
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        
        <button
          onClick={handleGoToCategories}
          className="bg-gray-700 text-white flex float-left font-semibold py-2 px-4 rounded-md mb-4 -ml-32 "
        >
          &larr; Back to Categories
        </button>
        
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
          </header>

          {/* Cart items and checkout details go here */}
          <div className="mt-8">
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-sm text-gray-900">{item.name}</h3>
                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">Size:</dt>
                        <dd className="inline">{item.size}</dd>
                      </div>
                      <div>
                        <dt className="inline">Color:</dt>
                        <dd className="inline">{item.color}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                      <label htmlFor={`Line${item.id}Qty`} className="sr-only"> Quantity </label>
                      <input
                        type="number"
                        min="1"
                        id={`Line${item.id}Qty`}
                        name="quantity"
                        value={item.qty}
                        className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600"
                        onChange={(e) => handleQuantityChange(item.id, e)}
                      />
                    </form>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-600 transition hover:text-red-600"
                    >
                      <span className="sr-only">Remove item</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Coupon and Checkout sections */}
          <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
            <div className="w-screen max-w-lg space-y-4">
              <dl className="space-y-0.5 text-sm text-gray-700">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>${calculateSubtotal().toFixed(2)}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>GST (18%)</dt>
                  <dd>${calculateGST().toFixed(2)}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>Discount</dt>
                  <dd>-${discount.toFixed(2)}</dd>
                </div>

                <div className="flex justify-between !text-base font-medium">
                  <dt>Total</dt>
                  <dd>${calculateDiscountedTotal().toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon Code"
                  className="w-full p-2 border rounded-md text-gray-700"
                />
                <h1 className="text-sm text-green-600">Apply : "SAVE40" to get $40 discount</h1>
                <button
                  onClick={handleCouponApply}
                  className="w-full mt-2 p-2 bg-indigo-600 text-white rounded-md"
                >
                  Apply Coupon
                </button>
                {couponMessage && (
                  <p className={`mt-2 text-sm ${validCoupon ? 'text-green-500' : 'text-red-500'}`}>
                    {couponMessage}
                  </p>
                )}
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleCheckout}
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
