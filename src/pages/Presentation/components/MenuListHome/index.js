import React from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

function MenuListHome() {
  const handleClickAppointment = () => {
    window.location.href = "/signIn";
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
      <Grid container justifyContent="center" alignItems="center" spacing={2} mt={1}>
        {menuStyles.map((style, index) => (
          <Grid item key={index}>
            <div
              id={`menu-item-${index}`}
              onClick={() => handleClickAppointment()}
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
                {index === 0 && "นัดหมายแพทย์"}
                {index === 1 && "ค้นหาแพทย์"}
                {index === 2 && "ติดต่อสอบถาม"}
              </MKTypography>
              <MKTypography
                variant="caption"
                sx={{ color: "white !important", marginTop: 1, fontSize: "12px" }}
              >
                {index === 0 && "จองนัดหมายผ่านทางออน์ไลน์"}
                {index === 1 && "ค้นหาด้วยชื่อ ความเชี่ยวชาญ และ อื่นๆ"}
                {index === 2 && "สอบถามข้อมูล การรักษา และ บริการ"}
              </MKTypography>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default MenuListHome;
