import React, { useState, useEffect } from "react";
import "./card.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import useFetch from "hooks/useFetch";
import { BASE_URL } from "constants/constants";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  // Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
const ReactCardSlider = () => {
  const { data: fetchedDoctor = [] } = useFetch(`${BASE_URL}/api/randomDoctors`);
  const [doctors, setDoctors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  useEffect(() => {
    if (fetchedDoctor && Array.isArray(fetchedDoctor)) {
      setDoctors(fetchedDoctor);
    } else {
      console.log("error");
    }
  }, [fetchedDoctor]);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const handleDialogOpen = (DoctorID, imageUrl) => {
    const doctor = fetchedDoctor.find((doctor) => doctor.DoctorID === DoctorID);
    setSelectedDoctor({
      ...doctor,
      Doctor_IMG: imageUrl, // เพิ่ม URL รูปภาพในข้อมูลที่จะแสดงในไดอล็อก
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  if (!fetchedDoctor) {
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
          <p style={{ margin: "10px", color: "#333" }}>Loading Doctor...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="link-list-doctor">
        <p className="title-name-doctor">รายชื่อแพทย์</p>
        <a href="/doctorList" className="title-name-doctor">
          ดูทั้งหมด
        </a>
      </div>
      <div id="main-slider-container">
        <MdChevronLeft className="slider-icon left" size={50} onClick={slideLeft} />
        <div id="slider">
          {doctors.map((slide, index) => (
            <div
              key={index}
              className="slider-card"
              onClick={() => handleDialogOpen(slide.DoctorID, `${slide.Doctor_IMG}`)}
            >
              <img
                src={`${BASE_URL}/${slide.Doctor_IMG}`}
                alt={slide.Doctor_Name}
                className="slider-card-image"
              />
              <p className="slider-card-title">{slide.Doctor_Name}</p>
              <p className="slider-card-description">{slide.Clinic_Name}</p>
              {/* <Button
                variant="contained"
                color="primary"
                style={{ borderRadius: "20px", margin: "10px 0" }}
                onClick={() => handleDialogOpen(slide.DoctorID, `${slide.Doctor_IMG}`)}
              >
                <Typography style={{ fontSize: "10px" }}>ดูรายละเอียด</Typography>
              </Button> */}
            </div>
          ))}
        </div>
        <MdChevronRight className="slider-icon right" size={50} onClick={slideRight} />
      </div>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>รายละเอียดแพทย์</DialogTitle>
        <DialogContent>
          <img
            src={`${BASE_URL}/${selectedDoctor.Doctor_IMG}`}
            alt={selectedDoctor.Doctor_Name}
            style={{
              width: "80%", // ปรับขนาดของรูปภาพตามที่คุณต้องการ
              height: "auto", // คุณสามารถปรับแต่งความสูงตามที่คุณต้องการ
              display: "block",
              margin: "0 auto", // จัดให้อยู่ตรงกลางแนวนอน
            }}
          />

          <p>ชื่อ: {selectedDoctor.Doctor_Name}</p>
          <p>ความชำนาญ: {selectedDoctor.Doctor_Specialty}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReactCardSlider;
