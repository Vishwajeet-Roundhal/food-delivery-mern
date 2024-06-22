import React from "react";
import { useState, useEffect } from "react";

const HomeSectionCard = ({ product }) => {
  const getResto = async () => {
    try {
      const res = await fetch(
        "http://localhost:6005/api/restaurant/restaurants",
        {
          method: "GET",
        }
      );
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        // console.log(data);
        
      }
    } catch (error) {
      console.log(error, "error at contacts");
    }
  };

  useEffect(() => {
    getResto();
  }, []);


 
  return (
    <div
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg 
    overflow-hidden w-[15 rem] mx-3 border"
    >
      <div className="h-[13rem] w-[10rem] ">
        <img
          className="object-cover object-top w-full h-full"
          src={product.image}
          alt=""
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">
          {product.recipeName}
        </h3>
        <h6 className="text-md font-medium text-gray-800">
          {product.discountedPrice}
        </h6>
        <p className="mt-2 text-sm text-gray-500">{product.description}</p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
