import React, { useState } from "react";
import { useParams,Link } from "react-router-dom";
import { useCart } from "../Pages/CartContext";
import "../../Css/ProductList.css";
import {Product} from "../Pages/Product.js";


const ProductList = () => {
  const { Category, Type } = useParams();
  const { cart, addToCart } = useCart(); // Using the custom hook
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [layout, setLayout] = useState("grid");

  // Filter products based on category and type
  const filteredProducts = Product.filter(
    (product) =>
      product.category.toLowerCase() === Category?.toLowerCase() &&
      product.type.toLowerCase() === Type?.toLowerCase()
  );

  // Sort products based on user selection
  const sortProducts = () => {
    let sortedProducts = [...filteredProducts];
    switch (sortBy) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "rating":
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      default:
        return sortedProducts;
    }
  };
  
  const handleAddToCart = (product, quantity) => {
    console.log("Clicked Add to Cart:", product);
    console.log("Cart before adding:", cart);
  
    const existingItem = cart.find((item) => item.id === product.id);
    const totalQuantity = existingItem
      ? existingItem.quantity + quantity
      : quantity;
  
    if (totalQuantity > product.stock) {
      console.error("Stock exceeded!");
      setError(`Only ${product.stock} items available for ${product.name}`);
      setTimeout(() => setError(""), 3000);
      return;
    }
  
    if (existingItem) {
      console.log("Updating existing item...");
      addToCart({ ...product, quantity: totalQuantity });
    } else {
      console.log("Adding new item...");
      addToCart({ ...product, quantity });
    }
  };

  


  return (
    <>
      <div className="relative group">
        <Link to="/Categories">
          <button className="p-2 rounded bg-blue-500 text-white hover:bg-black fixed flex mt-2 ml-2 -mb-3 z-10">
            <svg
              className="mt-1"
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="#ffffff"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
            Categories
          </button>
        </Link>
        <div className=" left-2 top-16 opacity-0 group-hover:opacity-100 fixed transition bg-slate-300 bg-opacity-90 text-black text-sm font-bold rounded py-2 px-2 z-10">
          Go to Categories
        </div>
      </div>

      <div className="container mx-auto flex flex-col-reverse p-6 ">
        {/* ----------------------------------------------------------------- MEN CLOTHING SECTION ------------------------------------------------------------------------ */}

        {Category === "Clothing" && Type === "Men" && (
          <section className="clothing-category py-8">
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                {error}
              </div>
            )}
            {/* Product rendering */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-manrope font-bold text-3xl sm:text-4xl text-black mb-6 text-center">
                Men's Wear
              </h2>
              <div
                className={
                  layout === "grid"
                    ? "grid grid-cols-1 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {sortProducts().map((product) => (
                  <div key={product.id} className="max-w-[384px] mx-auto">
                    <div className="w-full max-w-sm aspect-square">
                      <Link
                        to={`/Productdetails/${product.category}/${product.type}/${product.id}`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full rounded-xl object-cover"
                        />
                      </Link>
                    </div>
                    <div className="mt-5 flex flex-col justify-between">
                      <div>
                        <h6 className="font-medium text-xl leading-8 text-black mb-2">
                          {product.name}
                        </h6>
                        <h6 className="font-semibold text-xl leading-8 text-indigo-600">
                          ${product.price}
                        </h6>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="p-2 sm:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50"
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                        >
                          <path
                            d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------- WOMEN CLOTHING SECTION ------------------------------------------------------------------------ */}
        {Category === "Clothing" && Type === "Women" && (
          <section className="clothing-category py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                {error}
              </div>
            )}

            {/* Layout and Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded ${
                    layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded ${
                    layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  List
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-manrope font-bold text-3xl sm:text-4xl text-black mb-6 text-center">
                Women's Wear
              </h2>
              <div
                className={
                  layout === "grid"
                    ? "grid grid-cols-1 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {sortProducts().map((product) => (
                  <div
                    key={product.id}
                    className={`${
                      layout === "grid"
                        ? "max-w-[384px] mx-auto"
                        : "flex items-start space-x-6"
                    }`}
                  >
                    {/* Image section */}
                    <div
                      className={`${
                        layout === "grid" ? "max-w-[384px] mx-auto" : "w-1/3"
                      }`}
                    >
                      <Link
                        to={`/Productdetails/${product.category}/${product.type}/${product.id}`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-[400px] h-[400px] object-cover rounded-xl"
                        />
                      </Link>
                    </div>

                    {/* Product Info and Cart Button */}
                    <div
                      className={
                        layout === "grid"
                          ? "mt-5 flex justify-between items-center"
                          : "w-1/3 flex flex-col sm:flex-row justify-start items-start"
                      }
                    >
                      <div className="flex flex-col sm:w-2/3">
                        {/* Product Name and Price */}
                        <h6 className="font-medium text-xl leading-8 text-black mb-2 ml-24">
                          {product.name}
                        </h6>
                        <h6 className="font-semibold text-xl leading-8 text-indigo-600 mb-4 ml-24">
                          ${product.price}
                        </h6>

                        {/* Rating and Reviews section in a single row */}
                        <div className="flex items-center justify-center space-x-1 mb-2 ml-24">
                          {/* Render full stars */}
                          {[...Array(Math.floor(product.rating))].map(
                            (_, index) => (
                              <svg
                                key={index}
                                className="w-5 h-5 text-yellow-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.75l-5.633 3.25 1.073-6.401L2.85 9.615l6.477-.939L12 3l2.675 5.676 6.477.939-4.59 4.984 1.073 6.401z" />
                              </svg>
                            )
                          )}

                          {/* Render half star if there's a decimal part in rating */}
                          {product.rating % 1 >= 0.5 && (
                            <svg
                              className="w-5 h-5 text-yellow-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.75l-5.633 3.25 1.073-6.401L2.85 9.615l6.477-.939L12 3l2.675 5.676 6.477.939-4.59 4.984 1.073 6.401z" />
                            </svg>
                          )}

                          {/* Render empty stars for the remainder */}
                          {[
                            ...Array(
                              5 -
                                Math.floor(product.rating) -
                                (product.rating % 1 >= 0.5 ? 1 : 0)
                            ),
                          ].map((_, index) => (
                            <svg
                              key={index}
                              className="w-5 h-5 text-gray-300"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.75l-5.633 3.25 1.073-6.401L2.85 9.615l6.477-.939L12 3l2.675 5.676 6.477.939-4.59 4.984 1.073 6.401z" />
                            </svg>
                          ))}
                        </div>

                        {/* Reviews count */}
                        <div className="text-gray-600 ml-24">
                          {product.reviews && product.reviews > 0 ? (
                            <span>({product.reviews} reviews)</span>
                          ) : (
                            <span>No reviews yet</span>
                          )}
                        </div>
                      </div>
                      {/* Cart button - visible in both layouts */}
                      <button
                        onClick={() => handleAddToCart(product, 1)} // Assuming adding 1 quantity
                        className={`mt-3 sm:mt-0 sm:ml-6 p-2 sm:p-4 rounded-full bg-white border border-gray-300 flex items-center justify-center group shadow-sm transition-all duration-500 hover:shadow-gray-200 hover:border-gray-400 hover:bg-gray-50 ${
                          layout === "grid" ? "ml-auto" : ""
                        }`}
                      >
                        {/* Cart icon */}
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                        >
                          <path
                            d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------- ELECTRONIC SECTION ------------------------------------------------------------------------ */}

        {Category === "Electronics" && Type === "Tech" && (
          <div className="container mx-auto px-4 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                {error}
              </div>
            )}

            {/* Layout and Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded ${
                    layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded ${
                    layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  List
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Product List */}
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {sortProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <Link
                    to={`/Productdetails/${product.category}/${product.type}/${product.id}`}
                  >
                    <img
                      src={`${product.image}`}
                      alt={product.title}
                      className="w-full h-72 object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=612x612&w=0&k=20&c=biprOy3OAb9Hcn--dDSmKKSZ2JguNhuQMuhlJtr0s48=";
                      }}
                    />
                  </Link>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{product.title}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-bold">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- HOME APLLIANCES SECTION ------------------------------------------------------------------------ */}

        {Category === "HomeAppliances" && Type === "Appliances" && (
          <div className="container mx-auto px-4 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                {error}
              </div>
            )}

            {/* Layout and Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded ${
                    layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded ${
                    layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  List
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Product List */}
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {sortProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <Link
                    to={`/Productdetails/${product.category}/${product.type}/${product.id}`}
                  >
                    <img
                      src={`${product.image}`}
                      alt={product.name}
                      className="w-[400px] h-[370px] object-cover ml-8 mt-5"
                      onError={(e) => {
                        e.target.src =
                          "https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=612x612&w=0&k=20&c=biprOy3OAb9Hcn--dDSmKKSZ2JguNhuQMuhlJtr0s48=";
                      }}
                    />
                  </Link>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-bold">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- SHOE SECTION ------------------------------------------------------------------------ */}

        {Category === "Shoes" && Type === "Running" && (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                {error}
              </div>
            )}

            {/* Layout and Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded ${
                    layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded ${
                    layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  List
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Featured Shoes Collection
              </h1>

              {/* Conditionally Render Grid or List */}
              {layout === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 w-96 h-96"
                      role="article"
                    >
                      <div className="relative">
                        <Link
                          to={`/Productdetails/${product.category}/${product.type}/${product.id}`}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-72 object-cover"
                            loading="lazy"
                          />
                        </Link>

                        <div className="absolute top-4 right-4 flex space-x-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="p-2 rounded-full bg-white text-gray-600 shadow-md transition-colors duration-200 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            aria-label={`Add ${product.name} to cart`}
                          >
                            {/* Cart Icon */}
                            <svg
                              className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              viewBox="0 0 26 26"
                              fill="none"
                            >
                              <path
                                d="M12.6892 21.125C12.6892 22.0225 11.9409 22.75 11.0177 22.75C10.0946 22.75 9.34632 22.0225 9.34632 21.125M19.3749 21.125C19.3749 22.0225 18.6266 22.75 17.7035 22.75C16.7804 22.75 16.032 22.0225 16.032 21.125M4.88917 6.5L6.4566 14.88C6.77298 16.5715 6.93117 17.4173 7.53301 17.917C8.13484 18.4167 8.99525 18.4167 10.7161 18.4167H18.0056C19.7266 18.4167 20.587 18.4167 21.1889 17.9169C21.7907 17.4172 21.9489 16.5714 22.2652 14.8798L22.8728 11.6298C23.3172 9.25332 23.5394 8.06508 22.8896 7.28254C22.2398 6.5 21.031 6.5 18.6133 6.5H4.88917ZM4.88917 6.5L4.33203 3.25"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h2>
                        <p className="text-2xl font-bold text-blue-600">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden flex items-center p-4 space-x-4"
                    >
                      <div className="flex-1">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-352 h-96 object-cover rounded"
                        />
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h2>
                        <p className="text-2xl font-bold text-blue-600">
                          ${product.price.toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="mt-2 inline-block bg-blue-500 font-bold text-3xl text-white px-10 py-5 rounded hover:bg-blue-600"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- TOYS SECTION ------------------------------------------------------------------------ */}

        {Category === "Toys" && Type === "All" && (
          <div className="container mx-auto px-4 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                {error}
              </div>
            )}

            {/* Layout and Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded ${
                    layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded ${
                    layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  List
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Product List */}
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {sortProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <Link
                    to={`/Productdetails/${product.category}/${product.type}/${product.id}`}
                  >
                    <img
                      src={`${product.image}`}
                      alt={product.name}
                      className="w-[400px] h-[400px] object-cover ml-7"
                      onError={(e) => {
                        e.target.src =
                          "https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=612x612&w=0&k=20&c=biprOy3OAb9Hcn--dDSmKKSZ2JguNhuQMuhlJtr0s48=";
                      }}
                    />
                  </Link>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-bold">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- COSMETICS SECTION ------------------------------------------------------------------------ */}

        {Category === "Cosmetics" && Type === "All" && (
          <div className="container mx-auto px-4 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                {error}
              </div>
            )}

            {/* Layout and Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded ${
                    layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded ${
                    layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  List
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Product List */}
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {sortProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <Link
                    to={`/Productdetails/${product.category}/${product.type}/${product.id}`}
                  >
                    <img
                      src={`${product.image}`}
                      alt={product.name}
                      className="w-[400px] h-[400px] object-cover ml-7"
                      onError={(e) => {
                        e.target.src =
                          "https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=612x612&w=0&k=20&c=biprOy3OAb9Hcn--dDSmKKSZ2JguNhuQMuhlJtr0s48=";
                      }}
                    />
                  </Link>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-bold">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- TOOLS SECTION ------------------------------------------------------------------------ */}

        {Category === "Tools" && Type === "Equipments" && (
          <div className="container mx-auto px-4 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                {error}
              </div>
            )}

            {/* Layout and Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded ${
                    layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded ${
                    layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  List
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Product List */}
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {sortProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <Link
                    to={`/Productdetails/${product.category}/${product.type}/${product.id}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[400px] h-[400px] object-cover ml-8"
                      onError={(e) => {
                        e.target.src =
                          "https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=612x612&w=0&k=20&c=biprOy3OAb9Hcn--dDSmKKSZ2JguNhuQMuhlJtr0s48=";
                      }}
                    />
                  </Link>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-bold">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- STATIONERY SECTION ------------------------------------------------------------------------ */}

        {Category === "Stationery" && Type === "All" && (
          <div className="container mx-auto px-4 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                {error}
              </div>
            )}

            {/* Layout and Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded ${
                    layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded ${
                    layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  List
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Product List */}
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {sortProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <Link
                    to={`/Productdetails/${product.category}/${product.type}/${product.id}`}
                  >
                    <img
                      src={`${product.image}`}
                      alt={product.name}
                      className="w-[400px] h-[400px] object-cover ml-8"
                      onError={(e) => {
                        e.target.src =
                          "https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=612x612&w=0&k=20&c=biprOy3OAb9Hcn--dDSmKKSZ2JguNhuQMuhlJtr0s48=";
                      }}
                    />
                  </Link>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-bold">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- HOME DECOR SECTION ------------------------------------------------------------------------ */}

        {Category === "HomeDecor" && Type === "Decor" && (
          <div className="container mx-auto px-4 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                {error}
              </div>
            )}

            {/* Layout and Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded ${
                    layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded ${
                    layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  List
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Product List */}
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {sortProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <Link
                    to={`/Productdetails/${product.category}/${product.type}/${product.id}`}
                  >
                    <img
                      src={`${product.image}`}
                      alt={product.title}
                      className="w-full h-72 object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=612x612&w=0&k=20&c=biprOy3OAb9Hcn--dDSmKKSZ2JguNhuQMuhlJtr0s48=";
                      }}
                    />
                  </Link>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{product.title}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-bold">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- BOOKS SECTION ------------------------------------------------------------------------ */}

        {Category === "Books" && Type === "All" && (
          <div className="container mx-auto px-4 py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
                {error}
              </div>
            )}

            {/* Layout and Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setLayout("grid")}
                  className={`p-2 rounded ${
                    layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setLayout("list")}
                  className={`p-2 rounded ${
                    layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  List
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Product List */}
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {sortProducts().map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <Link
                    to={`/Productdetails/${product.category}/${product.type}/${product.id}`}
                  >
                    <img
                      src={`${product.image}`}
                      alt={product.name}
                      className="w-[400px] h-[400px] object-cover ml-8"
                      onError={(e) => {
                        e.target.src =
                          "https://media.istockphoto.com/id/924949200/vector/404-error-page-or-file-not-found-icon.jpg?s=612x612&w=0&k=20&c=biprOy3OAb9Hcn--dDSmKKSZ2JguNhuQMuhlJtr0s48=";
                      }}
                    />
                  </Link>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-2xl font-bold">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product, 1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <p className="text-center">
            No products found for this category and type.
          </p>
        )}
      </div>
    </>
  );
};

export default ProductList;
