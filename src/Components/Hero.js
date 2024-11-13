/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import SliderPlayer from "../Components/SlidePlayer";

import "../Css/Hero.css";
import "../Css/Sidebar.css";


const Hero = () => {
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const scrollbarRef = useRef(null); // Reference to custom scrollbar

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const moveDistance = Math.min(currentScrollY - 300, 2300); // Start moving only after 300px

      // Horizontal movement for left and right panels
      if (leftPanelRef.current && rightPanelRef.current) {
        if (currentScrollY > 300) {
          // Apply transformations once the scroll reaches 300px
          leftPanelRef.current.style.transform = `translateX(-${moveDistance}%) rotate(-45deg)`;
          rightPanelRef.current.style.transform = `translateX(${moveDistance}%) rotate(-45deg)`;
        } else {
          // Reset position when scroll is less than 300px
          leftPanelRef.current.style.transform = `translateX(0) rotate(-45deg)`;
          rightPanelRef.current.style.transform = `translateX(0) rotate(-45deg)`;
        }
      }

      // Move `.Head` element to the right and adjust opacity
      const headElement = document.querySelector(".Head");
      if (headElement) {
        headElement.style.transform = `translateX(${currentScrollY * 2}px)`;
        
        // Decrease opacity with scroll, with a minimum of 0.5
        const newOpacity = Math.max(1 - currentScrollY / 800, 0.5);
        headElement.style.opacity = newOpacity;
      }

      // Calculate the scroll percentage
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = (scrollPosition / scrollHeight) * 100;

      // Adjust the height of the custom scrollbar thumb based on scroll percentage
      const thumbHeight = Math.max(20, Math.min(50, (scrollPercentage / 100) * 100)); // Adjust values as needed

      // Set the height of the custom scrollbar thumb
      if (scrollbarRef.current) {
        scrollbarRef.current.style.height = `${thumbHeight}%`;
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);


  return (
    <div
      className={`Hero ${isSidebarOpen ? "sidebar-open" : ""}`}
      onClick={toggleSidebar}
    >
      <div className="Head">
        <h1>InsCart</h1>
        <p>
          Start shopping with us now! <br />
          Find your perfect product, add it to your cart, and checkout.
          <br />
          We have a wide selection of products, from electronics to clothing,
          and we are always here to help you find the <br /> perfect match.
          Enjoy smooth shopping with InsCart.
          <br />
          We also offer free shipping on orders over ₹400. <br />
          Enjoy fast delivery & easy returns on orders. <br />
          Surf our website for more information.
        </p>
        <div className="button">
          <a className="btn btn-border-4" href="/Categories">
            START SHOPPING
          </a>
        </div>
      </div>
      <div className="top">
        <div className="Carousel"><SliderPlayer /></div>
        <div className="top-left" ref={leftPanelRef}></div>
        <div className="top-right" ref={rightPanelRef}></div>
      </div>
      <div className="middle"></div>
      <div className="bottom"></div>
    </div>
  );
};

export default Hero;
