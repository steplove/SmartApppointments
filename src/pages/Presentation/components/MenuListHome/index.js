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
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <div
            onClick={() => {
              handleClickAppointment();
            }}
            style={{
              backgroundColor: "#af976d",
              padding: 2,
              borderRadius: "0%",
              margin: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              width: "100%",
            }}
          >
            <AssignmentIcon sx={{ color: "white !important" }} fontSize="large" />
            <MKTypography variant="caption" sx={{ color: "white !important", marginTop: 1 }}>
              นัดหมายแพทย์
            </MKTypography>
            <MKTypography
              variant="caption"
              sx={{ color: "white !important", marginTop: 1, fontSize: "11px" }}
            >
              จองนัดหมายผ่านทางออน์ไลน์
            </MKTypography>
          </div>
        </Grid>
        <Grid item>
          <div
            style={{
              backgroundColor: "#0bb288",
              padding: 2,
              borderRadius: "0%",
              margin: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <ContentPasteSearchIcon sx={{ color: "white !important" }} fontSize="large" />
            <MKTypography variant="caption" sx={{ color: "white !important", marginTop: 1 }}>
              ค้นหาแพทย์
            </MKTypography>
            <MKTypography
              variant="caption"
              sx={{ color: "white !important", marginTop: 1, fontSize: "11px" }}
            >
              ค้นหาด้วยชื่อ ความเชี่ยวชาญ และ อื่นๆ
            </MKTypography>
          </div>
        </Grid>
        <Grid item>
          <div
            style={{
              backgroundColor: "#646569",
              padding: 2,
              borderRadius: "0%",
              margin: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <LocalHospitalIcon sx={{ color: "white !important" }} fontSize="large" />
            <MKTypography variant="caption" sx={{ color: "white !important", marginTop: 1 }}>
              ติดต่อสอบถาม
            </MKTypography>
            <MKTypography
              variant="caption"
              sx={{ color: "white !important", marginTop: 1, fontSize: "11px" }}
            >
              สอบถามข้อมูล การรักษา และ บริการ
            </MKTypography>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default MenuListHome;
