import React from "react";
import { useOrders } from "./OrderContext";
import "../../Css/Orders.css";

const OrdersPage = () => {
  const { orders } = useOrders();

  return (
    <div className="Order p-4">
      <div className="main flex justify-between ml-1">
        <a className="btn1 hover:bg-blue-300 hover:text-black l:h-10"
        href="/Categories">
        <l1 className="mr-2 text-2xl">&#8678;</l1>
          CATEGORIES
        </a>

        <a
          className="btn1 hover:bg-blue-300 font-bold hover:text-black"
          href="/Cart"
        >
          <l1 className="mr-2 text-2xl">&#8680;</l1>
          GO TO CART
        </a>
      </div>
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <>
          <p>No orders found</p>
          <img
            className="w-fit h-[30rem] ml-[32.5rem]"
            src="https://img.freepik.com/premium-vector/vector-illustration-about-concept-no-items-found-no-results-found_675567-6604.jpg?w=740"
            alt="No items found"
          ></img>
          <a className="btn btn-border-4" href="/Categories">
            START SHOPPING
          </a>
        </>
      ) : (
        <div className="space-y-4 max-w-s">
          {orders.map((item, index) => (
            <div
              key={index}
              className="content flex items-center space-x-4 border p-4 rounded"
            >
              <img className="image w-40"src={item.image} alt={item.name}></img>
              <div className="flex justify-between w-full">
              <div>
              <p className="Name flex-1">{item.name}</p>
              <p className="Description">Description : {item.description}</p>
              </div>
              <p className="Quantity">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
