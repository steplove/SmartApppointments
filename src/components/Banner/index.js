import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./banner.css";
import { BASE_URL } from "../../constants/constants";
import useFetch from "../../hooks/useFetch";

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

const Slideshow = () => {
  const { data: fetchedBanner = [] } = useFetch(`${BASE_URL}/api/showBanners`);
  const [imgBanner, setImgBanner] = useState();

  useEffect(() => {
    if (fetchedBanner && Array.isArray(fetchedBanner)) {
      setImgBanner(fetchedBanner);
    }
  }, [fetchedBanner]);

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
  };

  return (
    <Slide {...properties}>
      {imgBanner &&
        imgBanner.map((image) => {
          const imageUrl = `${BASE_URL}/${image.ImageName}`;
          console.log(imageUrl);
          return (
            <div key={image.BannerID}>
              <div style={divStyle}>
                <img src={imageUrl} alt="" style={imgStyle} />
              </div>
            </div>
          );
        })}
    </Slide>
  );
};

export default Slideshow;
