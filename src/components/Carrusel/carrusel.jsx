import React from "react";

import "react-slideshow-image/dist/styles.css";

import { Carousel } from "react-responsive-carousel";

const MyNewCarousel = ({ images }) => (
  <Carousel autoPlay>
    {images.map((slideImage, index) => (
      <div key={index}>
        <img
          alt=""
          src={`https://siccic.com/backend${images[index]}`}
          style={{}}
        ></img>
      </div>
    ))}
  </Carousel>
);
export default MyNewCarousel;
