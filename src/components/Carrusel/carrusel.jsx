import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

/* const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "400px",
};
const Carrusel = ({ slideImages }) => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{
                ...divStyle,
                backgroundImage: `url('https://siccic.com/backend${slideImages[index]}')`,
              }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Carrusel;*/

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
