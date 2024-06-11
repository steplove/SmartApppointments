import React from "react";
import { Container, Typography, Card, CardContent, CardMedia, Grid, Hidden } from "@mui/material";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import image from "assets/images/hospital.png";
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
function History() {
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
                  <a href="/History" style={{ color: "#0bb288", fontSize: "1rem" }}>
                    {t("hospital_history")}
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
                      {t("hospital_history")}{" "}
                    </span>
                  </Typography>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item lg={12}>
                          <Typography paragraph>
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              โรงพยาบาลเกษมราษฎร ศรีบุรินทร์
                              <span style={{ color: "#5f5f5f", fontSize: "1rem" }}>
                                {"    "}
                                ได้เริ่มก่อตั้งขึ้นเมื่อปี พ.ศ. 2537 โดยได้จดทะเบียนเป็นบริษัท
                                “โรงพยาบาลศรีบุรินทร์ จำกัด” ด้วยทุนจดทะเบียน 170 ล้านบาท
                                ประกอบด้วยแพทย์ กลุ่มพยาบาลและนักธุรกิจ เป็นผู้ถือหุ้นร่วมกับ
                                บริษัทบางกอกฮอสปิตอล ในเครือโรงพยาบาลเกษมราษฎร์ โดย...
                              </span>
                            </span>
                          </Typography>

                          <CardMedia
                            component="img"
                            height="auto"
                            src={image}
                            alt="รูปภาพแพ็คเกจ"
                          />
                          <br />
                          <span style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1rem" }}>
                            ปัจจุบันโรงพยาบาลเกษมราษฎร์ ศรีบุรินทร์
                            เปิดให้บริการทางการแพทย์ทั่วไปและเฉพาะทาง มีขนาด 200 เตียง
                            และมีพื้นที่ทั้งหมด 14 ไร่เศษ เปิดให้บริการผู้ป่วยในจังหวัดเชียงราย
                            และจังหวัดใกล้เคียง
                          </span>
                          <span style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1rem" }}>
                            Hospital you can trust.....โรงพยาบาลที่คุณวางใจ
                          </span>
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
                      {t("hospital_history")}
                    </span>
                  </Typography>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item lg={12}>
                          <Typography paragraph>
                            <span
                              style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1.2rem" }}
                            >
                              โรงพยาบาลเกษมราษฎร ศรีบุรินทร์
                              <span style={{ color: "#5f5f5f", fontSize: "1rem" }}>
                                {"    "}
                                ได้เริ่มก่อตั้งขึ้นเมื่อปี พ.ศ. 2537 โดยได้จดทะเบียนเป็นบริษัท
                                “โรงพยาบาลศรีบุรินทร์ จำกัด” ด้วยทุนจดทะเบียน 170 ล้านบาท
                                ประกอบด้วยแพทย์ กลุ่มพยาบาลและนักธุรกิจ เป็นผู้ถือหุ้นร่วมกับ
                                บริษัทบางกอกฮอสปิตอล ในเครือโรงพยาบาลเกษมราษฎร์ โดย...
                              </span>
                            </span>
                          </Typography>

                          <CardMedia
                            component="img"
                            height="auto"
                            src={image}
                            alt="รูปภาพแพ็คเกจ"
                          />
                          <br />
                          <span style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1rem" }}>
                            ปัจจุบันโรงพยาบาลเกษมราษฎร์ ศรีบุรินทร์
                            เปิดให้บริการทางการแพทย์ทั่วไปและเฉพาะทาง มีขนาด 200 เตียง
                            และมีพื้นที่ทั้งหมด 14 ไร่เศษ เปิดให้บริการผู้ป่วยในจังหวัดเชียงราย
                            และจังหวัดใกล้เคียง
                          </span>
                          <span style={{ color: "#5f5f5f", fontWeight: "bold", fontSize: "1rem" }}>
                            Hospital you can trust.....โรงพยาบาลที่คุณวางใจ
                          </span>
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

export default History;
