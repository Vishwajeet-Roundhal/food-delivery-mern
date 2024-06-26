import React from "react";
import { useState, useEffect,useRef } from "react";

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
    <div>home</div>
  );
};

export default HomeSectionCard;
