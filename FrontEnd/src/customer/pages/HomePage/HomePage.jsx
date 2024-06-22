import React from "react";
import MainCrosel from "../../components/HomeMainCarousal/MainCrosel";
import HomeSectionCarousal from "../../components/HomeSectionCarousal/HomeSectionCarousal";
import dishes from "../../../Data/Dishes";

const HomePage = () => {
  
  
  return (
    <div>
      <MainCrosel></MainCrosel>
      <div className=" space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
        <HomeSectionCarousal data={dishes} sectionName={"Punes Best Dishes"} />
        <HomeSectionCarousal data={dishes} sectionName={"Mumbai best dishes"} />
      </div>
    </div>
  );
};
export default HomePage;
