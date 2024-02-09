import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BASE_URL } from "../../constants/constants";
import useFetch from "../../hooks/useFetch";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function Banners() {
  const { data: fetchedBanner = [] } = useFetch(`${BASE_URL}/api/showBanners`);
  const [imgBanner, setImgBanner] = useState([]);

  useEffect(() => {
    if (!fetchedBanner || !Array.isArray(fetchedBanner)) {
      console.warn("Invalid or missing data in fetchedBanner:", fetchedBanner);
    } else {
      setImgBanner(fetchedBanner);
      setopenLoad(true);
    }
  }, [fetchedBanner]);
  const [openLoad, setopenLoad] = useState(false);
  if (!openLoad) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div>
          <div style={{ textAlign: "center" }}>
            <CircularProgress color="primary" />
          </div>
          <p style={{ margin: "10px", color: "#333" }}>Loading ...</p>
        </div>
      </div>
    );
  }
  return (
    <Carousel
      autoPlay={true}
      interval={1800}
      showArrows={true}
      showThumbs={false}
      centerMode={false}
      infiniteLoop={true}
      showStatus={true}
    >
      {imgBanner.map((image) => (
        <Grid key={image.BannerID}>
          <img src={`${BASE_URL}/${image.ImageName}`} alt="" />
        </Grid>
      ))}
    </Carousel>
  );
}

export default Banners;
