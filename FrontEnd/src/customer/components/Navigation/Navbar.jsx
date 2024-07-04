import React, { useState, useEffect } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineSearch,
  AiFillTag,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsFillCartFill, BsFillSaveFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUserFriends, FaWallet } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import { CartContext } from "../../../Context/CartContext";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";

const Navbar = ({cart}) => {
  const [nav, setNav] = useState(false);
  const { cartSize } = useContext(CartContext)
  const { locData } = useContext(UserContext)
  const { city , region, country_name } = locData;
 
  return (
    <div className="max-w-[1640px] mx-auto flex justify-between p-4 items-center">
      {/* left side */}
      <div className="flex items-center">
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <Link to="/" className="text-2xl sm:text-3xl lg:text-4xl px-2">
        Foodie<span className="font-bold">Finder</span>
        </Link>
        <div className="flex flex-col items-center justify-center space-y-2">
      <p className="text-sm">{locData.city}</p>
      <p className="text-xs text-gray-500">{locData.region}</p>
    </div>
      </div>
      {/* search */}
      <div className="bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch size={25} />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="Search Foods"
        />
      </div>

      <li>
        <Link to="/registerRestaurant">Register your own restaurant</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
        </li>
      {/* Cart button */}
      <Link to="/cart" className="bg-black text-white hidden md:flex items-center py-3 px-2 rounded-full ">
        <BsFillCartFill size={20} className="mr-2" />
        Cart {cartSize}
      </Link>

      {/* Mobile menu  */}
      {/* Overlay */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 "></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 h-screen w-[300px] bg-white duration-300 z-10"
            : "fixed top-0 left-[-100%] h-screen w-[300px] bg-white duration-300 z-10"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute top-4 right-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">
        Foodie<span className="font-bold">Finder</span>
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <Link to="/orders" className="text-xl py-4 flex">
              <TbTruckDelivery size={25} className="mr-4" />
              Orders
            </Link>
            <li className="text-xl py-4 flex">
              <MdFavorite size={25} className="mr-4" />
              Favorites
            </li>
            <li className="text-xl py-4 flex">
              <MdHelp size={25} className="mr-4" />
              Help
            </li> 
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
