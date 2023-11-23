import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
// const spanStyle = {
//   padding: "20px",
//   background: "#efefef",
//   color: "#000000",
// };
// const bannerStyles = {
//   marginTop: "0px", // ปรับค่าตามที่ต้องการ
// };
const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "auto",
  overflow: "hidden",
};

const imgStyle = {
  objectFit: "cover",
  maxWidth: "50%", // ควบคุมขนาดมากสุดในทิศทางความกว้าง
  maxHeight: "50%", // ควบคุมขนาดมากสุดในทิศทางความสูง
  width: "auto", // ทำให้ความกว้างของรูปภาพปรับตามความกว้างของพื้นที่ตัวกล่อง
  height: "auto", // ทำให้ความสูงของรูปภาพปรับตามความสูงของพื้นที่ตัวกล่อง
};

const slideImages = [
  {
    url: banner1,
  },
  {
    url: banner2,
  },
  {
    url: banner3,
  },
  {
    url: banner4,
  },
];

const Slideshow = () => {
  return (
    <div
      style={{
        marginTop: "0px",
        zIndex: 3,
        width: "100%",
      }}
    >
      <Slide style={{ width: "100%", height: "100%" }}>
        {slideImages.map((slideImage, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <div style={divStyle}>
              <img src={slideImage.url} alt={`slide-${index}`} style={imgStyle} />
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
export default Slideshow;
