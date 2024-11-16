import React, { useState, useEffect } from "react";
import "../Css/SliderPlayer.css";
import Cloth from "../Images/familybg.jpeg"
import Tech from "../Images/techbg.jpg";
import Furniture from "../Images/furniturebg.png";

const SliderPlayer = () => {
  const [selectedItem, setSelectedItem] = useState("item-1");
  const [paused, setPaused] = useState(false);

  const handleRadioChange = (event) => {
    setSelectedItem(event.target.id);
    document.body.classList.toggle("blue");
  };

  const handleButtonClick = (page) => {
    window.location.href = page;
  };

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        setSelectedItem((prevItem) => {
          if (prevItem === "item-1") return "item-2";
          if (prevItem === "item-2") return "item-3";
          return "item-1";
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [paused]);

  return (
    <div className="container1">
      <input
        type="radio"
        name="slider"
        id="item-1"
        checked={selectedItem === "item-1"}
        onChange={handleRadioChange}
      />
      <input
        type="radio"
        name="slider"
        id="item-2"
        checked={selectedItem === "item-2"}
        onChange={handleRadioChange}
      />
      <input
        type="radio"
        name="slider"
        id="item-3"
        checked={selectedItem === "item-3"}
        onChange={handleRadioChange}
      />

      <div
        className="cards"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <label className="card" htmlFor="item-1" id="song-1">
          <img
            src={Cloth}
            alt="Clothing Essentials"
          />
          <button
            className="navigate-btn"
            onClick={() => handleButtonClick("/Categories/Clothing")}
          >
            <span>
              VIEW <br />
              collections 
            </span>
          </button>
        </label>
        <label className="card" htmlFor="item-2" id="song-2">
          <img
            src={Tech}
            alt="Tech Gadgets"
          />
          <button
            className="navigate-btn"
            onClick={() => handleButtonClick("/Categories/Electronics")}
          >
            <span>
              VIEW <br />
              Gadgets 
            </span>
          </button>
        </label>
        <label className="card" htmlFor="item-3" id="song-3">
          <img
            src={Furniture}
            alt="Furnitures and Home Decor" 
          />
          <button
            className="navigate-btn"
            onClick={() => handleButtonClick("/Categories/HomeDecor")}
          >
            <span>
              VIEW <br />
              Furnitures
            </span>
          </button>
        </label>
      </div>

      <div className="player">
        <div className="upper-part">
          <div
            className="info-area"
            id="test"
            style={{
              transform:
                selectedItem === "item-2"
                  ? "translateY(-145px)"
                  : selectedItem === "item-3"
                  ? "translateY(-295px)"
                  : "translateY(0)",
            }}
          >
            <label className="song-info" id="song-info-1">
              <div className="title">TRENDING CLOTHINGS</div>
              <div className="sub-line">
                <div className="subtitle">
                <span className="bold-text">Customized</span> Men, Women, Kids Clothing and more wearables
                </div>
                <div className="time">Prices Starts from <span className="bold-text">₹300 </span> Onwards on All Clothing Products </div>
              </div>
            </label>
            <label className="song-info" id="song-info-2">
              <div className="title">TECH RESPOSITORY</div>
              <div className="sub-line">
                <div className="subtitle">
                  <span className="bold-text">Newly Launched</span> Electronic
                  Gadgets and Accessories
                </div>

                <div className="time">
                  {" "}
                  Up to <span className="bold-text">20% Off</span>  on Mobiles and Tablets On Credit Card Purchases
                </div>
              </div>
            </label>
            <label className="song-info" id="song-info-3">
              <div className="title">HOME ESSENTIALS</div>
              <div className="sub-line">
                <div className="subtitle">
                  {" "}
                  <span className="bold-text">Best Selling</span>  Home Essentials with Affordable Prices and
                  Quality
                </div>
                <div className="time">
                <span className="bold-text">Free Shipping</span> On Ordering of Products from IKEA, PepperFry,
                  Damro{" "}
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderPlayer;
