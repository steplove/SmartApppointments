import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import "./banner.css";
const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  maxHeight: "600px",
  maxWidth: "1200px",
  overflow: "hidden",
  width: "100%",
  margin: "0 auto",
};

const imgStyle = {
  objectFit: "cover",
  width: "100%",
  height: "100%",
};

const slideImages = [banner1, banner2, banner3, banner4];

const Slideshow = () => {
  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
  };

  return (
    <Slide {...properties}>
      {slideImages.map((image, index) => (
        <div key={index}>
          <div style={divStyle}>
            <img src={image} alt={`slide-${index}`} style={imgStyle} />
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default Slideshow;
