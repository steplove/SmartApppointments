import React from "react";
import { Container, Typography, Card, CardContent, Grid, Hidden } from "@mui/material";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
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
function Accreditation() {
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
                  <a href="/presentation" style={{ color: "#808080", fontSize: "1rem" }}>
                    {t("home")}/
                  </a>
                  <a href="/Accreditation" style={{ color: "#0bb288", fontSize: "1rem" }}>
                    {t("accreditation")}
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
                      {t("accreditation")}{" "}
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
                              1. ผ่านการรับรองมาตรฐานคุณภาพของสถานพยาบาล HA <br />
                              <br />
                              2. รางวัลผลประกอบการยอดเยี่ยม ของเครือโรงพยาบาลเกษมราษฎร์ ทั้ง 7 สาขา
                              (2 ปีซ้อน) <br />
                              <br />
                              3. รางวัลสถานประกอบกิจการดีเด่นด้านความปลอดภัย อาชีวอนามัย
                              และสภาพแวดล้อมในการทำงาน ระดับประเทศ 4 ปี ติดต่อกัน (พ.ศ 2553- พ.ศ
                              2556) <br />
                              <br />
                              4. รางวัลความเป็นเลิศระดับเพชร ประจำปี 2556
                              ประเภทห้องปฏิบัติการตรวจสุขภาพคนหางาน ที่จะไปทำงานต่างประเทศ
                              จากกรมวิทยาศาสตร์การแพทย์ กระทรวงสาธารณสุข
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
                      {t("accreditation")}{" "}
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
                              1. ผ่านการรับรองมาตรฐานคุณภาพของสถานพยาบาล HA <br />
                              <br />
                              2. รางวัลผลประกอบการยอดเยี่ยม ของเครือโรงพยาบาลเกษมราษฎร์ ทั้ง 7 สาขา
                              (2 ปีซ้อน) <br />
                              <br />
                              3. รางวัลสถานประกอบกิจการดีเด่นด้านความปลอดภัย อาชีวอนามัย
                              และสภาพแวดล้อมในการทำงาน ระดับประเทศ 4 ปี ติดต่อกัน (พ.ศ 2553- พ.ศ
                              2556) <br />
                              <br />
                              4. รางวัลความเป็นเลิศระดับเพชร ประจำปี 2556
                              ประเภทห้องปฏิบัติการตรวจสุขภาพคนหางาน ที่จะไปทำงานต่างประเทศ
                              จากกรมวิทยาศาสตร์การแพทย์ กระทรวงสาธารณสุข
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

export default Accreditation;
