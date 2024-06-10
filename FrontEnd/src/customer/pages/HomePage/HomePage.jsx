import React from "react";
import MainCrosel from "../../components/HomeCrosel/MainCrosel";
import HomeSectionCarousal from "../../components/HomeSectionCarousal/HomeSectionCarousal";


const HomePage=()=>{
    return(
        <div>
            <MainCrosel></MainCrosel>
            <div className=" space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                <HomeSectionCarousal/>
                <HomeSectionCarousal/>
                
            </div>
        </div>
    )
}
export default HomePage;