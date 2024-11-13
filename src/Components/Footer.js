/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Image from "../Images/footerlogo.png";

const Footer = () => {
  return (
    <>
      <footer className="bg-white lg:grid lg:grid-cols-5">
        <div className="relative block h-32 lg:col-span-2 lg:h-full">
          <img
            src="https://images.unsplash.com/photo-1642370324100-324b21fab3a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <img src={Image} alt="Logo" className="h-auto " />
              {/* Contact and Social Links */}
              <p>
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  {" "}
                  Call us{" "}
                </span>
                <a
                  href="#"
                  className="block text-2xl font-medium text-gray-900 hover:opacity-50   sm:text-3xl hover:text-yellow-500"
                >
                  +91 9876543210
                </a>
              </p>

              <ul className="mt-8 space-y-1 text-sm text-gray-700">
                <li>Monday to Friday: 10am - 5pm</li>
                <li>Weekend: 10am - 3pm</li>
              </ul>

              {/* Social Media Icons */}
              <ul className="mt-8 flex gap-6">{/* Social links here */}</ul>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Services */}
              <div>
                <p className=" font-bold text-gray-900">SERVICES</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-50   hover:text-yellow-500"
                    >
                      Product Checking
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-50   hover:text-yellow-500"
                    >
                      Product Shipment
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-50   hover:text-yellow-500"
                    >
                      Product Replacement
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-50   hover:text-yellow-500"
                    >
                      Order Packing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-50   hover:text-yellow-500"
                    >
                      Company Review
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <p className=" font-bold text-gray-900">INSCART</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-50   hover:text-yellow-500"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-50   hover:text-yellow-500"
                    >
                      Meet the Team
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 transition hover:opacity-50   hover:text-yellow-500"
                    >
                      Accounts Review
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-100 pt-12">
            <div className="sm:flex sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-4 text-xs">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-50   hover:text-yellow-500"
                  >
                    {" "}
                    Terms & Conditions{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-50   hover:text-yellow-500"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 transition hover:opacity-50   hover:text-yellow-500"
                  >
                    {" "}
                    Cookie Policy{" "}
                  </a>
                </li>
              </ul>

              <p className="mt-8 text-xs text-gray-500 sm:mt-0">
                © 2024 INSCART. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
