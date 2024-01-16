import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BASE_URL } from "../../constants/constants";
import useFetch from "../../hooks/useFetch";

function Banners() {
  const { data: fetchedBanner = [] } = useFetch(`${BASE_URL}/api/showBanners`);
  const [imgBanner, setImgBanner] = useState([]);

  useEffect(() => {
    if (!fetchedBanner || !Array.isArray(fetchedBanner)) {
      console.warn("Invalid or missing data in fetchedBanner:", fetchedBanner);
    } else {
      setImgBanner(fetchedBanner);
    }
  }, [fetchedBanner]);

  return (
    <Carousel
      autoPlay={true}
      interval={4000}
      showArrows={true}
      showThumbs={false}
      centerMode={false}
      infiniteLoop={true}
      showStatus={false}
    >
      {imgBanner.map((image) => (
        <div key={image.BannerID}>
          <img src={`${BASE_URL}/${image.ImageName}`} alt="" />
        </div>
      ))}
    </Carousel>
  );
}

export default Banners;
