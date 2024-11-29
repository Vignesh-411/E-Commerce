import React from "react";
import { useNavigate } from "react-router-dom";
import Tech from "../../Images/techcat.png";
import Decor from "../../Images/homecat.png";
import Toys from "../../Images/toyscat.jpeg";
import HomeAppl from "../../Images/Homeappl.jpg";
import Men from "../../Images/m-fash.jpg";
import Sale from "../../Images/topbg.png";
import Women from "../../Images/w-fash2.jpg";
import Shoe from "../../Images/Shoecat.png";
import Cosmetic from "../../Images/coscat.jpeg";
import Tools from "../../Images/toolcat.jpeg";
import Book from "../../Images/bookcat.jpeg";
import Stationery from "../../Images/staticat.png";
import Arrow from "../../Images/left-arrow.png";
import "../../Css/Categories.css";

const Categories = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="Categories bg-fixed-container custom-scrollbar overflow-x-hidden">
          <div className="absolute top-5 left-5 z-20">
        <button
          onClick={goHome}
          className=" back text-black px-4 py-2 font-bold"
        >
          <img src={Arrow} alt="arrow" className="h-10 arrow"/>
          <span className="tooltip-text">Go To Home</span>

        </button>
      </div>
      <div className="Cat-container relative z-10 flex-col overflow-hidden">
        <h1 className=" heading text-center text-8xl uppercase text-white bg-[#0084B5] w-fit pt-5 pb-3 pl-5 pr-5 ml-auto mr-auto mt-10 rounded-xl shadow-custom font-[MyFont3]">
          Product Categories
        </h1>

        <div className="flex flex-col gap-5 -mt-5 rounded-xl overflow-hidden w-full ">
          <div className="cat1 h-full w-[calc(100%-50px)] ml-5 mt-12 rounded-xl shadow-custom sale">
            <img src={Sale} className="w-full h-full object-cover " alt="sale" />
          </div>

          <div className="flex justify-between gap-5 w-[97%] ml-5 mt-2 men-women" >
            <div className="image-container w-[47%] men">
              <img
                src={Men}
                className="w-full h-full object-cover shadow-custom "
                alt="Men Fashion"
              />
              <button
                onClick={() => handleNavigate("/Categories/Clothing/Men")}
                className="image-button"
              >
                Shop Men Fashion
              </button>
            </div>
            <div className="image-container w-[48%] women">
              <img
                src={Women}
                className="w-full h-full object-cover shadow-custom "
                alt="Women Fashion"
              />
              <button
                onClick={() => handleNavigate("/Categories/Clothing/Women")}
                className="image-button"
              >
                Shop Women Fashion
              </button>
            </div>
          </div>

          <div className="flex flex-row gap-3 w-screen h-full ml-5">
            <div className=" ht flex flex-col gap-5">
              <div className="image-container w-[47%]">
                <img
                  src={Tech}
                  className="w-[69rem] h-full cursor-pointer object-cover shadow-custom tech"
                  alt="Tech"
                />
                <button
                  onClick={() => handleNavigate("/Categories/Electronics/Tech")}
                  className="image-button"
                >
                  Shop Tech Gadgets
                </button>
              </div>
              <div className="image-container w-[47%]">
                <img
                  src={HomeAppl}
                  className="w-[69rem] h-full cursor-pointer object-cover shadow-custom home-appl"
                  alt="Home Appliances"
                />
                <button
                  onClick={() => handleNavigate("/Categories/HomeAppliances/Appliances")}
                  className="image-button"
                >
                  Shop Home Appliances
                </button>
              </div>
            </div>

            <div className="st flex flex-col gap-5 w-[22.3rem] h-full">
  {/* Shoe Section */}
  <div className="image-container w-[47%] shs">
    <img
      src={Shoe}
      className="shoe w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] cursor-pointer object-cover shadow-custom"
      alt="shoe"
    />
    <button
      onClick={() => handleNavigate("/Categories/Shoes/Running")}
      className="image-button w-[15rem] sh-btn"
    >
      Shop Shoes
    </button>
  </div>

  {/* Toys Section */}
  <div className="image-container w-[47%] tyt">
    <img
      src={Toys}
      className="toys w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] cursor-pointer object-cover shadow-custom"
      alt="Toys"
    />
    <button
      onClick={() => handleNavigate("/Categories/Toys/All")}
      className="image-button w-[15rem] ty-btn"
    >
      Shop Toys
    </button>
  </div>
</div>

          </div>

          <div className="flex flex-row gap-5 w-full ml-5">
            <div className="flex flex-col gap-5 w-[72rem]">
              <div className="image-container w-[47%]">
                <img
                  src={Cosmetic}
                  className="h-auto w-full cursor-pointer object-cover shadow-custom"
                  alt="cosmetic"
                />
                <button
                  onClick={() => handleNavigate("/Categories/Cosmetics/All")}
                  className="image-button w-[25rem]"
                >
                  shop Cosmetic items
                </button>
              </div>
              <div className="image-container w-[47%]">
                <img
                  src={Tools}
                  className="h-auto w-full cursor-pointer object-cover shadow-custom"
                  alt="tools"
                />
                <button
                  onClick={() => handleNavigate("/Categories/Tools/Equipments")}
                  className="image-button w-[25rem]"
                >
                  shop tool equipments
                </button>
              </div>
              <div className="image-container w-[47%]">
                <img
                  src={Stationery}
                  className="h-auto w-full cursor-pointer object-cover shadow-custom"
                  alt="stationery"
                />
                <button
                  onClick={() => handleNavigate("/Categories/Stationery/All")}
                  className="image-button"
                >
                  shop Stationery items
                </button>
              </div>
            </div>
            <div className="image-container dc">
              <img
                src={Decor}
                className=" decor h-[159.5vh] cursor-pointer object-cover shadow-custom w-full"
                alt="Decor"
              />
              <button
                onClick={() => handleNavigate("/Categories/HomeDecor/Decor")}
                className="image-button"
              >
                shop home decor items
              </button>
            </div>
          </div>
          <div className="image-container bk">
            <img
              src={Book}
              className=" book  w-full cursor-pointer object-cover shadow-custom "
              alt="book"
            />
            <button
              onClick={() => handleNavigate("/Categories/Books/All")}
              className="image-button"
            >
              shop books and comics
            </button>
          </div>
        </div>
      </div>

      <div className="Cat-list"></div>
    </div>
  );
};

export default Categories;
