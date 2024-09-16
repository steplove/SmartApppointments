import React from "react";
import { useSpring, animated } from "@react-spring/web";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import { Grid, Typography } from "@mui/material";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useTranslation } from "react-i18next";

function MenuListHome() {
  const { t } = useTranslation();

  const springs = useSpring({
    from: { opacity: 0, transform: "translateX(-100px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  });

  const handleClickAppointment = () => {
    window.location.href = "/signIn";
  };

  const handleClickCheckUP = () => {
    window.location.href = "/signInCheckup";
  };
  const handleClickSleepTest = () => {
    window.location.href = "/Quiz";
  };
  const handleClickHeartRisk = () => {
    window.location.href = "/QuizHeartRisk";
  };

  const handleClickSearchDoctor = () => {
    window.location.href = "/doctorListHome";
  };

  const handleClickContactUs = () => {
    window.location.href = "/Contact";
  };

  const menuStyles = [
    {
      backgroundColor: "#af976d",
    },
    {
      backgroundColor: "#293242",
    },
    {
      backgroundColor: "#0bb288",
    },
    {
      backgroundColor: "#646569",
    },
    {
      backgroundColor: "#d9534f",
    },
    {
      backgroundColor: "#0d6efd",
    },
  ];

  const menuStyle = {
    padding: 0,
    borderRadius: "10px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    width: "90%",
    minWidth: "100px",
    height: "100%",
    minHeight: "150px",
    transition: "background-color 0.3s",
    cursor: "pointer",
  };

  const handleMouseEnter = (index) => {
    const Grid = document.getElementById(`menu-item-${index}`);
    if (Grid) {
      Grid.style.backgroundColor = "#7b6a50";
    }
  };

  const handleMouseLeave = (index) => {
    const Grid = document.getElementById(`menu-item-${index}`);
    if (Grid) {
      Grid.style.backgroundColor = menuStyles[index].backgroundColor;
    }
  };

  return (
    <Grid>
      <Grid item container justifyContent="center" alignItems="center" spacing={2} mt={1}>
        {menuStyles.map((style, index) => (
          <Grid item xs={6} sm={6} md={6} lg={2} key={index} sx={{ mb: 2 }}>
            <animated.div
              id={`menu-item-${index}`}
              onClick={
                index === 0
                  ? handleClickAppointment
                  : index === 1
                  ? handleClickSleepTest
                  : index === 2
                  ? handleClickHeartRisk
                  : index === 3
                  ? handleClickCheckUP
                  : index === 4
                  ? handleClickSearchDoctor
                  : index === 5
                  ? handleClickContactUs
                  : ""
              }
              style={{ ...menuStyle, ...style, ...springs }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {index === 0 && (
                <AssignmentIcon sx={{ color: "white !important" }} fontSize="large" />
              )}
              {index === 1 && (
                <AirlineSeatIndividualSuiteIcon
                  sx={{ color: "white !important" }}
                  fontSize="large"
                />
              )}
              {index === 2 && (
                <MonitorHeartIcon eIcon sx={{ color: "white !important" }} fontSize="large" />
              )}
              {index === 3 && <FavoriteIcon sx={{ color: "white !important" }} fontSize="large" />}
              {index === 4 && (
                <ContentPasteSearchIcon sx={{ color: "white !important" }} fontSize="large" />
              )}
              {index === 5 && (
                <LocalHospitalIcon sx={{ color: "white !important" }} fontSize="large" />
              )}
              <Typography
                variant="caption"
                sx={{ color: "white !important", marginTop: 1, fontSize: "14px" }}
              >
                {index === 0 && t("appointment_with_doctor")}
                {index === 1 && t("sleeptest")}
                {index === 2 && "แบบประเมินค้นหาความเสี่ยง"}
                {index === 3 && t("sriburin_checkup_center")}
                {index === 4 && t("search_for_a_doctor")}
                {index === 5 && t("contact_us")}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "white !important", marginTop: 1, fontSize: "12px" }}
              >
                {index === 0 && t("book_an_appointment_online")}
                {index === 1 && t("")}
                {index === 2 && t("เป็นโรคหัวใจและหลอดเลือด")}
                {index === 3 && t("")}
                {index === 4 && t("search_by_name_expertise_and_others")}
                {index === 5 && t("ask_for_information_on_treatment_and_services")}
              </Typography>
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default MenuListHome;
