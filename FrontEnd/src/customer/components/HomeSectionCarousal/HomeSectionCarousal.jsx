import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
// import { Button } from '@headlessui/react';
import { Button } from "@mui/material";
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import {dishes} from "../../../Data/Dishes";
// import dishes from "../../../Data/Dishes";

const HomeSectionCarousal = ({data,sectionName}) => {
  const [activeIndex, setActiveIndex] = useState(0);
const responsive = {
  0: { items: 1 },
  720: { items: 3 },
  1024: { items: 5.5 },
  };
  // console.log(activeIndex);

  const slideprev = () => setActiveIndex(activeIndex - 1);
  const slidenext = () => setActiveIndex(activeIndex + 1);

  const syncActiveIndex = ({ item }) => setActiveIndex(item);
  console.log(slidenext);

  const items = data
    .slice(0, 6)
    .map((item) => <HomeSectionCard product={item} />);
  return (
    <div className="border">
      <h2 className="text-2xl font-extrabold text-gray-800 py5">{sectionName}</h2>
      <div className="relative p-5 ">
        <AliceCarousel
          // mouseTracking
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />

        {/* Forward */}
        {activeIndex !== items.length-5 && (
          <Button
            onClick={slideprev}
            
            variant="contained"
            className="z-50 bg-white"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
              bgcolor: "white",
            }}
            aria-label="next"
          >
            <ArrowBackIosIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
        {/* backword */}
        {activeIndex !== 0 && (
          <Button
            onClick={slidenext}
            variant="contained"
            className="z-50 bg-white"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%) rotate(-90deg) ",
              bgcolor: "white",
            }}
            aria-label="next"
          >
            <ArrowForwardIosIcon
              sx={{ transform: "rotate(-90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousal;
