import React from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useTranslation } from "react-i18next";

function MenuListHome() {
  const { t } = useTranslation();

  const handleClickAppointment = () => {
    window.location.href = "/signIn";
  };
  const handleClickSearchDoctor = () => {
    window.location.href = "/doctorListHome"; // หรือ URL ที่คุณต้องการ
  };
  const handleClickContactUs = () => {
    window.open("https://www.kasemrad.co.th/Sriburin/th/site/contact_us", "_blank");
  };

  const menuStyles = [
    {
      backgroundColor: "#af976d",
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
    const div = document.getElementById(`menu-item-${index}`);
    if (div) {
      div.style.backgroundColor = "#7b6a50"; // Change color on hover
    }
  };

  const handleMouseLeave = (index) => {
    const div = document.getElementById(`menu-item-${index}`);
    if (div) {
      div.style.backgroundColor = menuStyles[index].backgroundColor; // Reset color on leave
    }
  };

  return (
    <>
      <Grid item container justifyContent="center" alignItems="center" spacing={2} mt={1}>
        {menuStyles.map((style, index) => (
          <Grid item key={index}>
            <div
              id={`menu-item-${index}`}
              onClick={
                index === 0
                  ? handleClickAppointment
                  : index === 1
                  ? handleClickSearchDoctor
                  : index === 2
                  ? handleClickContactUs
                  : ""
              }
              style={{ ...menuStyle, ...style }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {index === 0 && (
                <AssignmentIcon sx={{ color: "white !important" }} fontSize="large" />
              )}
              {index === 1 && (
                <ContentPasteSearchIcon sx={{ color: "white !important" }} fontSize="large" />
              )}
              {index === 2 && (
                <LocalHospitalIcon sx={{ color: "white !important" }} fontSize="large" />
              )}
              <MKTypography
                variant="caption"
                sx={{ color: "white !important", marginTop: 1, fontSize: "14px" }}
              >
                {index === 0 && t("appointment_with_doctor")}
                {index === 1 && t("search_for_a_doctor")}
                {index === 2 && t("contact_us")}
              </MKTypography>
              <MKTypography
                variant="caption"
                sx={{ color: "white !important", marginTop: 1, fontSize: "12px" }}
              >
                {index === 0 && t("book_an_appointment_online")}
                {index === 1 && t("search_by_name_expertise_and_others")}
                {index === 2 && t("ask_for_information_on_treatment_and_services")}
              </MKTypography>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default MenuListHome;
