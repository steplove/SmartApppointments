import React from "react";
import { Container, Typography, Card, CardContent, Grid, Hidden } from "@mui/material";
import DefaultFooter from "../../../../../src/lineliff_files/examples/Footers/DefaultFooter";
import footerRoutes from "../../../../../src/lineliff_files/footer.routes";
import MKBox from "components/MKBox";
import DefaultNavbar from "../../../../../src/lineliff_files/examples/Navbars/DefaultNavbar";
import routes from "../../../../../src/lineliff_files/routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import image from "assets/images/hospital.png";
// import NavbarsAboutUs from "../Navbars";
import { useTranslation } from "react-i18next";

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
function Vision_And_Mission() {
  const { t } = useTranslation();

  return (
    <Grid>
      <DefaultNavbar routes={routes} sticky relative />
      {/* <NavbarsAboutUs /> */}
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Container maxWidth="md" sx={{ paddingTop: "0%", paddingBottom: 4 }}>
            <Grid>
              <Typography sx={{ marginBottom: 2, fontSize: "1.5rem" }}></Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <a href="/" style={{ color: "#808080", fontSize: "1rem" }}>
                    {t("home")}/
                  </a>
                  <a href="/Vision_And_Mission" style={{ color: "#0bb288", fontSize: "1rem" }}>
                    {t("vision_and_mission")}
                  </a>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item lg={12}>
                  <Typography
                    style={{
                      variant: "button",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      marginBottom: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "30px",
                      color: "#562170",
                    }}
                  >
                    <span style={{ borderBottom: "2px solid #d1c398" }}>
                      {" "}
                      {t("vision_and_mission")}{" "}
                    </span>
                  </Typography>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item lg={0.3}></Grid>
                        <Grid item lg={11}>
                          <Typography paragraph>
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              วิสัยทัศน์
                              <span style={{ color: "#5f5f5f", fontSize: "1rem" }}>
                                {"    "}
                                เราจะเป็นโรงพยาบาลเอกชนชั้นนำที่มุ่งมั่นให้การรักษาพยาบาลระดับตติยภูมิ
                                มอบความมั่นใจและไว้วางใจแก่ผู้รับบริการและบุคลากรทุกระดับ
                              </span>
                            </span>
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              พันธกิจ
                              <span
                                style={{ color: "#5f5f5f", fontSize: "1rem", paddingLeft: "20px" }}
                              >
                                1. การพัฒนาภาพลักษณ์ โดยยึดหลัก &quot;โรงพยาบาลที่คุณวางใจ&quot;{" "}
                                <br />
                                &emsp;1.1 พัฒนาการบริการทางการแพทย์เฉพาะทางให้ครบทุกสาขา <br />
                                &emsp;1.2
                                พัฒนาการระบบบริการทางการแพทย์ที่มีคุณภาพได้มาตรฐานและมีเทคโนโลยีที่ทันสมัย{" "}
                                <br />
                                &emsp;1.3 พัฒนาระบบบริการที่รวดเร็ว ถูกต้อง ปลอดภัย
                                และเข้าถึงได้ง่าย ไม่มีรอยต่อ <br />
                                &emsp;1.4 พัฒนาศักยภาพ ความรู้ ทักษะ บุคลิกภาพ ภาษา
                                และพฤติกรรมบริการของบุคลากรในทุกระดับ <br />
                                &emsp;1.5 พัฒนาสถานที่
                                สิ่งแวดล้อมในการทำงานและรอบโรงพยาบาลให้เกิดความปลอดภัย <br />
                                &emsp;1.6 พัฒนาระบบ IT ให้มีประสิทธิภาพและสามารถตอบสนองการปฏิบัติงาน{" "}
                                <br />
                                2. พัฒนาประสิทธิภาพในการบริหารต้นทุน <br />
                                3. สร้างความพึงพอใจสูงสุด ของผู้ให้บริการและผู้รับบริการ
                              </span>
                            </span>
                            <br />
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              ค่านิยม
                              <span style={{ color: "#5f5f5f", fontSize: "1rem" }}>
                                {"    "}
                                มีความรู้ คู่วินัย ให้ความรัก ( ผู้รับบริการ เพื่อนร่วมงาน ตัวเอง
                                องค์กร ) ทักษะเยี่ยม
                              </span>
                            </span>
                            <br />
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              เข็มมุ่ง International patient safety goals
                              <span style={{ color: "#5f5f5f", fontSize: "1rem" }}>
                                {"    "}
                                IPSG 1 : PatientIdentifications <br />
                                IPSG 2 : Improve Effective Communication <br />
                                IPSG 3 : Improve the Safety of High-AlertMedication <br />
                                IPSG 4 : Ensure CorrectSiteCorrect-Patient SurgeryCorrect-Procedure
                                IPSG 5 : Reduce the Risk of Health Care-Associated Infections <br />
                                IPSG 6 : Reduce the Risk of Patient Harm Resulting from Falls
                              </span>
                            </span>
                            <br />
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              สโลแกน
                              <span style={{ color: "#5f5f5f", fontSize: "1rem" }}>
                                {"    "}
                                Hospital You Can Trust. โรงพยาบาลที่คุณวางใจ
                              </span>
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item lg={6}>
                          {/* ส่วนอื่น ๆ ที่ต้องการแสดง เช่น รายละเอียดเพิ่มเติม */}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <Container maxWidth="md" sx={{ paddingTop: "0%", paddingBottom: 4 }}>
            <Grid>
              <Typography sx={{ marginBottom: 2, fontSize: "1.5rem" }}></Typography>
              <Grid container justifyContent="center">
                <Grid item lg={12}>
                  <Typography
                    style={{
                      variant: "button",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      marginBottom: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "25px",
                      color: "#562170",
                    }}
                  >
                    <span style={{ borderBottom: "2px solid #d1c398" }}>
                      {" "}
                      {t("vision_and_mission")}{" "}
                    </span>
                  </Typography>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item lg={0.3}></Grid>
                        <Grid item lg={11}>
                          <Typography paragraph>
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              วิสัยทัศน์
                              <span style={{ color: "#5f5f5f", fontSize: "1rem" }}>
                                {"    "}
                                เราจะเป็นโรงพยาบาลเอกชนชั้นนำที่มุ่งมั่นให้การรักษาพยาบาลระดับตติยภูมิ
                                มอบความมั่นใจและไว้วางใจแก่ผู้รับบริการและบุคลากรทุกระดับ
                              </span>
                            </span>
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              พันธกิจ
                              <span
                                style={{ color: "#5f5f5f", fontSize: "1rem", paddingLeft: "20px" }}
                              >
                                1. การพัฒนาภาพลักษณ์ โดยยึดหลัก &quot;โรงพยาบาลที่คุณวางใจ&quot;{" "}
                                <br />
                                &emsp;1.1 พัฒนาการบริการทางการแพทย์เฉพาะทางให้ครบทุกสาขา <br />
                                &emsp;1.2
                                พัฒนาการระบบบริการทางการแพทย์ที่มีคุณภาพได้มาตรฐานและมีเทคโนโลยีที่ทันสมัย{" "}
                                <br />
                                &emsp;1.3 พัฒนาระบบบริการที่รวดเร็ว ถูกต้อง ปลอดภัย
                                และเข้าถึงได้ง่าย ไม่มีรอยต่อ <br />
                                &emsp;1.4 พัฒนาศักยภาพ ความรู้ ทักษะ บุคลิกภาพ ภาษา
                                และพฤติกรรมบริการของบุคลากรในทุกระดับ <br />
                                &emsp;1.5 พัฒนาสถานที่
                                สิ่งแวดล้อมในการทำงานและรอบโรงพยาบาลให้เกิดความปลอดภัย <br />
                                &emsp;1.6 พัฒนาระบบ IT ให้มีประสิทธิภาพและสามารถตอบสนองการปฏิบัติงาน{" "}
                                <br />
                                2. พัฒนาประสิทธิภาพในการบริหารต้นทุน <br />
                                3. สร้างความพึงพอใจสูงสุด ของผู้ให้บริการและผู้รับบริการ
                              </span>
                            </span>
                            <br />
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              ค่านิยม
                              <span style={{ color: "#5f5f5f", fontSize: "1rem" }}>
                                {"    "}
                                มีความรู้ คู่วินัย ให้ความรัก ( ผู้รับบริการ เพื่อนร่วมงาน ตัวเอง
                                องค์กร ) ทักษะเยี่ยม
                              </span>
                            </span>
                            <br />
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              เข็มมุ่ง International patient safety goals
                              <span style={{ color: "#5f5f5f", fontSize: "1rem" }}>
                                {"    "}
                                IPSG 1 : PatientIdentifications <br />
                                IPSG 2 : Improve Effective Communication <br />
                                IPSG 3 : Improve the Safety of High-AlertMedication <br />
                                IPSG 4 : Ensure CorrectSiteCorrect-Patient SurgeryCorrect-Procedure
                                IPSG 5 : Reduce the Risk of Health Care-Associated Infections <br />
                                IPSG 6 : Reduce the Risk of Patient Harm Resulting from Falls
                              </span>
                            </span>
                            <br />
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              สโลแกน
                              <span style={{ color: "#5f5f5f", fontSize: "1rem" }}>
                                {"    "}
                                Hospital You Can Trust. โรงพยาบาลที่คุณวางใจ
                              </span>
                            </span>
                          </Typography>
                        </Grid>
                        <Grid item lg={6}>
                          {/* ส่วนอื่น ๆ ที่ต้องการแสดง เช่น รายละเอียดเพิ่มเติม */}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Hidden>
      </ThemeProvider>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </Grid>
  );
}

export default Vision_And_Mission;
