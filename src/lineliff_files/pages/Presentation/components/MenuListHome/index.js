import React from "react";
import { useSpring, animated } from "@react-spring/web";
import AssignmentIcon from "@mui/icons-material/Assignment";
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
    window.location.href = "/liff/signInBasic";
  };

  const hadleClickCheckUP = () => {
    window.location.href = "/liff/signinCheckup";
  };

  const handleClickSearchDoctor = () => {
    window.location.href = "/liff/doctorListHome";
  };

  const handleClickContactUs = () => {
    window.location.href = "/liff/Contact";
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
  ];

  const menuStyle = {
    padding: 2,
    borderRadius: "10px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    width: "100%",
    minWidth: "220px",
    height: "100%",
    minHeight: "150px",
    transition: "background-color 0.3s", // Add a smooth transition effect
    cursor: "pointer", // Add cursor style
  };

  const handleMouseEnter = (index) => {
    const Grid = document.getElementById(`menu-item-${index}`);
    if (Grid) {
      Grid.style.backgroundColor = "#7b6a50"; // Change color on hover
    }
  };

  const handleMouseLeave = (index) => {
    const Grid = document.getElementById(`menu-item-${index}`);
    if (Grid) {
      Grid.style.backgroundColor = menuStyles[index].backgroundColor; // Reset color on leave
    }
  };

  return (
    <Grid>
      <Grid item container justifyContent="center" alignItems="center" spacing={2} mt={1}>
        {menuStyles.map((style, index) => (
          <Grid item key={index}>
            <animated.div
              id={`menu-item-${index}`}
              onClick={
                index === 0
                  ? handleClickAppointment
                  : index === 1
                  ? hadleClickCheckUP
                  : index === 2
                  ? handleClickSearchDoctor
                  : index === 3
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
                <AssignmentIcon sx={{ color: "white !important" }} fontSize="large" />
              )}
              {index === 2 && (
                <ContentPasteSearchIcon sx={{ color: "white !important" }} fontSize="large" />
              )}
              {index === 3 && (
                <LocalHospitalIcon sx={{ color: "white !important" }} fontSize="large" />
              )}
              <Typography
                variant="caption"
                sx={{ color: "white !important", marginTop: 1, fontSize: "14px" }}
              >
                {index === 0 && t("appointment_with_doctor")}
                {index === 1 && t("sriburin_checkup_center")}
                {index === 2 && t("search_for_a_doctor")}
                {index === 3 && t("contact_us")}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "white !important", marginTop: 1, fontSize: "12px" }}
              >
                {index === 0 && t("book_an_appointment_online")}
                {index === 1 && t("")}
                {index === 2 && t("search_by_name_expertise_and_others")}
                {index === 3 && t("ask_for_information_on_treatment_and_services")}
              </Typography>
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default MenuListHome;
