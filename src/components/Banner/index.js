import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BASE_URL, token } from "../../constants/constants";
import axios from "axios";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function Banners() {
  const [imgBanner, setImgBanner] = useState([]);
  const [openLoad, setopenLoad] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/showBanners`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedBanner = response.data;

      if (!fetchedBanner || !Array.isArray(fetchedBanner)) {
        console.warn("");
      } else {
        setImgBanner(fetchedBanner);
        setopenLoad(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
      interval={3000}
      showArrows={true}
      showThumbs={false}
      centerMode={false}
      infiniteLoop={true}
      showStatus={true}
    >
      {imgBanner.map((image, index) => (
        <Grid key={index}>
          <img src={`${image.ImageName}`} alt="" />
        </Grid>
      ))}
    </Carousel>
  );
}

export default Banners;
