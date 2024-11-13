import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import Cart from "./Components/Pages/Cart";
import Categories from "./Components/Pages/Categories";
import Productdetails from "./Components/Pages/Productdetails";
function App() {

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<> <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Hero isSidebarOpen={isSidebarOpen} /> <Footer/></>} />
          <Route path="/Cart" element={<><Cart/></>} />
          <Route path="/Categories" element={<><Categories/></>} />
          <Route path="/Productdetails" element={<Productdetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

