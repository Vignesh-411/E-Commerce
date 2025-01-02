// import "./App.css";
// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Hero from "./Components/Hero";
// import Footer from "./Components/Footer";
// import Cart from "./Components/Pages/Cart";
// import Categories from "./Components/Pages/Categories";
// import ProductList from "./Components/Pages/ProductList";
// import Productdetails from "./Components/Pages/Productdetails";
// import { CartProvider } from "./Components/Pages/CartContext";

// function App() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="App">
//       <CartProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   {" "}
//                   <Navbar
//                     isSidebarOpen={isSidebarOpen}
//                     toggleSidebar={toggleSidebar}
//                   />
//                   <Hero isSidebarOpen={isSidebarOpen} /> <Footer />
//                 </>
//               }
//             />
//             <Route
//               path="/Cart"
//               element={
//                 <>
//                   <Cart />
//                 </>
//               }
//             />
//             <Route
//               path="/Categories"
//               element={
//                 <>
//                   <Categories />
//                 </>
//               }
//             />
//             <Route
//               path="/Categories/:Category/:Type"
//               element={<ProductList />}
//             />
//             <Route
//               path="/Productdetails/:category/:type/:id"
//               element={<Productdetails />}
//             />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//     </div>
//   );
// }

// export default App;


// import "./App.css";
// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Hero from "./Components/Hero";
// import Footer from "./Components/Footer";
// import Cart from "./Components/Pages/Cart";
// import Checkout from "./Components/Pages/Checkout";
// import Categories from "./Components/Pages/Categories";
// import ProductList from "./Components/Pages/ProductList";
// import Productdetails from "./Components/Pages/Productdetails";
// import { CartProvider } from "./Components/Pages/CartContext";

// function App() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="App">
//       <CartProvider>
//         <BrowserRouter>
//           <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <>
//                   <Hero isSidebarOpen={isSidebarOpen} />
//                   <Footer />
//                 </>
//               }
//             />
//             <Route path="/Cart" element={<Cart />} />
//             <Route path="/Categories" element={<Categories />} />
//             <Route path="/Categories/:Category/:Type" element={<ProductList />} />
//             <Route
//               path="/Productdetails/:category/:type/:id"
//               element={<Productdetails />}
//             />
//             <Route path="/Cart/Checkout" element={<Checkout/>}></Route>
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//     </div>
//   );
// }

// export default App;


import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import Cart from "./Components/Pages/Cart";
import Checkout from "./Components/Pages/Checkout";
import Categories from "./Components/Pages/Categories";
import ProductList from "./Components/Pages/ProductList";
import Productdetails from "./Components/Pages/Productdetails";
import OrdersPage from "./Components/Pages/Orders"; 
import { CartProvider } from "./Components/Pages/CartContext";
import { OrderProvider } from "./Components/Pages/OrderContext"; 

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <CartProvider>
        <OrderProvider>
          <BrowserRouter>
            <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero isSidebarOpen={isSidebarOpen} />
                    <Footer />
                  </>
                }
              />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Orders" element={<OrdersPage />} /> 
              <Route path="/Categories" element={<Categories />} />
              <Route path="/Categories/:Category/:Type" element={<ProductList />} />
              <Route
                path="/Productdetails/:category/:type/:id"
                element={<Productdetails />}
              />
              <Route path="/Cart/Checkout" element={<Checkout />} />
            </Routes>
          </BrowserRouter>
        </OrderProvider>
      </CartProvider>
    </div>
  );
}

export default App;
