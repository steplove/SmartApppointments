import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import React from "react";
import MKTypography from "components/MKTypography";
import banner1 from "../../../assets/images/550.jpg";
import banner2 from "../../../assets/images/Annual-Check.jpg";
import banner3 from "../../../assets/images/Pre-Marriage.jpg";
import DefaultFooter from "examples/Footers/DefaultFooter";
import MKBox from "components/MKBox";
import footerRoutes from "footer.routes";
function Packages() {
  const packageData = [
    {
      id: 1,
      image: banner1,
      title: "วัคซีนไข้หวัดใหญ่ 4 สายพันธ์ุ",
      subtitle: "Quadrivalent Influenza vaccine",
      details: "ศูนย์สุขภาพเด็ก, ศูนย์การแพทย์ฉุกเฉิน",
      contact:
        "✅ติดต่อสอบถามเพิ่มเติมศูนย์สุขภาพโรงพยาบาลเกษมราษฎร ศรีบุรินทร์ ☎️053-910-999 ต่อ 621,167,168",
      price: "550 บาท",
      promoDuration: " 31 ธันวาคม 2566",
    },
    {
      id: 2,
      image: banner2,
      title: "โปรแกรมตรวจสุขภาพ",
      subtitle: "Program Annual-Check up",
      details: "ศูนย์สุขภาพ ",
      contact:
        "✅ติดต่อสอบถามเพิ่มเติมศูนย์สุขภาพโรงพยาบาลเกษมราษฎร ศรีบุรินทร์ ☎️053-910-999 ต่อ 621,167,168",
      price: "2,000 - 14,000 บาท",
      promoDuration: " 31 ธันวาคม 2566",
    },
    {
      id: 3,
      image: banner3,
      title: "ตรวจสุขภาพก่อนแต่งงาน ",
      subtitle: "Pre-Marriage Program",
      details: "ศูนย์สุขภาพ ",
      contact:
        "✅ติดต่อสอบถามเพิ่มเติมศูนย์สุขภาพโรงพยาบาลเกษมราษฎร ศรีบุรินทร์ ☎️053-910-999 ต่อ 621,167,168",
      price: " 2,800-5,200 บาท",
      promoDuration: " 31 ธันวาคม 2566",
    },
  ];
  return (
    <>
      <Grid container spacing={2} textAlign={"center"}>
        {/* Items in the row */}
        <Grid item>
          <a href="/" style={{ color: "#808080" }}>
            หน้าแรก/
          </a>
          <a href="/" style={{ color: "#0bb288" }}>
            แพกเกจทั้งหมด
          </a>
        </Grid>
        <Grid item xs={10}></Grid>
        <Grid style={{ color: "#0bb288", fontSize: "30px" }}>บทความสุขภาพเกษมราษฎร์</Grid>
      </Grid>
      <Grid
        container
        xs={12}
        md={6}
        lg={12}
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        {packageData.map((packageItem) => (
          <Card
            key={packageItem.id}
            sx={{
              width: "100%", // ทำให้ Card มีความกว้างเต็มตาม container
              height: "100%",
              display: "flex", // ทำให้ Card เป็น flex container
              flexDirection: "column", // ให้ข้อมูลภายใน Card เรียงตั้งฉาก
              maxWidth: 450, // หากต้องการกำหนดขนาดมากสุดสำหรับ Card
              minHeight: 400,
              margin: "0 5px",
              marginBottom: "20px", // เพิ่มขีดเส้นระหว่าง Card
            }}
          >
            <CardMedia
              component="img"
              height="150"
              image={packageItem.image}
              alt="รายละเอียดรูปภาพ"
            />
            <CardContent>
              <MKTypography
                sx={{
                  color: "#0bb288",
                  fontSize: "17px",
                  fontWeight: "bold",
                }}
              >
                {packageItem.title}
              </MKTypography>
              <MKTypography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                {packageItem.subtitle}
              </MKTypography>
              <MKTypography sx={{ borderBottom: "2px solid #0bb288", width: "40px" }} />
              <MKTypography sx={{ color: "#808080", fontSize: "10px" }} mt={0}>
                {packageItem.details}
              </MKTypography>
              <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                {packageItem.contact}
              </MKTypography>
              <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                ราคา:{" "}
                <span style={{ color: "#ff0000", fontSize: "14px" }}>{packageItem.price}</span>
              </MKTypography>
              <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={1}>
                ระยะเวลาโปรโมชั่น:
                <span style={{ color: "#ff0000", fontSize: "14px" }}>
                  {packageItem.promoDuration}
                </span>
              </MKTypography>
              <MKTypography
                sx={{
                  color: "#0bb288",
                  fontSize: "15px",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                ดูรายละเอียด
              </MKTypography>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Packages;
