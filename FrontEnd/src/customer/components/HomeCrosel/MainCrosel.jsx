import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import MainCroselData from './MainCroselData';
import "./MainCrosel.css";


// const MainCrosel=()=>{
//     const items = MainCroselData.map((item)=><img className='cursor-pointer' role='presentation' src={item.image} alt=''/>)
// return(
//     <AliceCarousel items={items}/>
// )
// }
const MainCrosel = () => {
    const items = MainCroselData.map(item => (
        <div className="item" key={item.id}>
            <img src={item.image} alt={item.title} className="carousel-image" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p>
        </div>
    ))
    return (
        <AliceCarousel
            mouseTracking
            items={items}
            autoPlay
            autoPlayInterval={1000}
            infinite
            disableButtonsControls
            // disableSlideInfo
            disableDotsControls
        />
    );
};
export default MainCrosel;