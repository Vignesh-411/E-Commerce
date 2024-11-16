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
    <div className="Categories h-[200vh] bg-fixed-container custom-scrollbar">
          <div className="absolute top-5 left-5 z-20">
        <button
          onClick={goHome}
          className=" back text-black px-4 py-2 font-bold"
        >
          <img src={Arrow} alt="arrow" className="h-10" />
          <span className="tooltip-text">Go To Home</span>

        </button>
      </div>
      <div className="Cat-container relative z-10 flex-col">
        <h1 className="text-center text-8xl uppercase text-white bg-[#0084B5] w-fit pt-5 pb-3 pl-5 pr-5 ml-auto mr-auto mt-10 rounded-xl shadow-custom font-[MyFont3]">
          Product Categories
        </h1>

        <div className="flex flex-col gap-5 -mt-5 rounded-xl overflow-x-hidden w-full ">
          <div className="cat1 h-full w-[calc(100%-50px)] ml-5 mt-12 rounded-xl shadow-custom">
            <img src={Sale} className="w-full h-full object-cover" alt="sale" />
          </div>

          <div className="flex justify-between gap-5 w-[97%] ml-5 mt-2">
            <div className="image-container w-[47%]">
              <img
                src={Men}
                className="w-full h-full object-cover shadow-custom"
                alt="Men Fashion"
              />
              <button
                onClick={() => handleNavigate("/Categories/Clothing/Men")}
                className="image-button"
              >
                Shop Men Fashion
              </button>
            </div>
            <div className="image-container w-[48%]">
              <img
                src={Women}
                className="w-full h-full object-cover shadow-custom"
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
            <div className="flex flex-col gap-5">
              <div className="image-container w-[47%]">
                <img
                  src={Tech}
                  className="w-[69rem] h-full cursor-pointer object-cover shadow-custom"
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
                  className="w-[69rem] h-full cursor-pointer object-cover shadow-custom"
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

            <div className="flex flex-col gap-5 w-[22.3rem] h-full">
              <div className="image-container w-[47%]">
                <img
                  src={Shoe}
                  className="w-[22.3rem] h-[142vh] cursor-pointer object-cover shadow-custom"
                  alt="shoe"
                />
                <button
                  onClick={() => handleNavigate("/Categories/Shoes/Running")}
                  className="image-button w-[15rem]"
                >
                  Shop Shoes
                </button>
              </div>
              <div className="image-container w-[47%]">
                <img
                  src={Toys}
                  className="w-full h-[100vh] cursor-pointer object-cover shadow-custom"
                  alt="Toys"
                />
                <button
                  onClick={() => handleNavigate("/Categories/Toys/All")}
                  className="image-button w-[15rem]"
                >
                  shop toys
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
                  alt="Decor"
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
                  alt="Decor"
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
                  alt="Decor"
                />
                <button
                  onClick={() => handleNavigate("/Categories/Stationery/All")}
                  className="image-button"
                >
                  shop Stationery items
                </button>
              </div>
            </div>
            <div className="image-container w-[47%]">
              <img
                src={Decor}
                className="h-[164.5vh] w-[50rem] cursor-pointer object-cover shadow-custom"
                alt="Decor"
              />
              <button
                onClick={() => handleNavigate("/Categories/HomeDecor/Decor")}
                className="image-button"
              >
                shop hoome decor items
              </button>
            </div>
          </div>
          <div className="image-container w-[47%]">
            <img
              src={Book}
              className="h-[80vh] w-[93rem] cursor-pointer object-cover shadow-custom ml-5 mb-5"
              alt="Decor"
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
