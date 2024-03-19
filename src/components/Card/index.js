import React, { useState, useEffect } from "react";
import "./card.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { BASE_URL, token } from "constants/constants";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  // Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Hidden,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import axios from "axios";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1280,
      lg: 1920,
      xl: 2560,
    },
  },
  palette: {
    primary: {
      main: "#6A0DAD", // สีม่วงเข้ม
    },
    secondary: {
      main: "#D1C4E9", // สีม่วงอ่อน
    },
  },
});
const ReactCardSlider = () => {
  const { t } = useTranslation();
  const [doctors, setDoctors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/randomDoctors`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedDoctor = response.data;

        if (fetchedDoctor && Array.isArray(fetchedDoctor)) {
          setDoctors(fetchedDoctor);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const handleDialogOpen = (DoctorID, imageUrl) => {
    const doctor = doctors.find((doctor) => doctor.DoctorID === DoctorID);
    setSelectedDoctor({
      ...doctor,
      Doctor_IMG: imageUrl, // เพิ่ม URL รูปภาพในข้อมูลที่จะแสดงในไดอล็อก
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  if (!doctors) {
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
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <div className="link-list-doctor">
            <p className="title-name-doctor">{t("doctor_list")}</p>
            <a href="/doctorList" className="title-name-doctor">
              {t("view_all")}
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
                    src={`${slide.Doctor_IMG}`}
                    alt={slide.Doctor_Name}
                    className="slider-card-image"
                  />
                  <p className="slider-card-title">{slide.Doctor_Name}</p>
                  <p className="slider-card-description">{slide.Clinic_Name}</p>
                </div>
              ))}
            </div>
            <MdChevronRight className="slider-icon right" size={50} onClick={slideRight} />
          </div>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <div className="link-list-doctor">
            <p className="title-name-doctor">{t("doctor_list")}</p>
            <a href="/doctorList" className="title-name-doctor">
              {t("view_all")}
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
                    src={`${slide.Doctor_IMG}`}
                    alt={slide.Doctor_Name}
                    className="slider-card-image"
                  />
                  <p className="slider-card-title">{slide.Doctor_Name}</p>
                  <p className="slider-card-description">{slide.Clinic_Name}</p>
                </div>
              ))}
            </div>
            <MdChevronRight className="slider-icon right" size={50} onClick={slideRight} />
          </div>
        </Hidden>
      </ThemeProvider>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{t("doctor_details")}</DialogTitle>
        <DialogContent>
          <img
            src={`${selectedDoctor.Doctor_IMG}`}
            alt={selectedDoctor.Doctor_Name}
            style={{
              width: "80%", // ปรับขนาดของรูปภาพตามที่คุณต้องการ
              height: "auto", // คุณสามารถปรับแต่งความสูงตามที่คุณต้องการ
              display: "block",
              margin: "0 auto", // จัดให้อยู่ตรงกลางแนวนอน
            }}
          />

          <p>
            {t("name")}: {selectedDoctor.Doctor_Name}
          </p>
          <p>
            {t("doctor_expertise")}: {selectedDoctor.Doctor_Specialty}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReactCardSlider;
