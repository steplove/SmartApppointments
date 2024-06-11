import React from "react";
import { Container, Typography, Card, CardContent, Grid, Hidden } from "@mui/material";
import DefaultFooter from "../../../../src/lineliff_files/examples/Footers/DefaultFooter";
import footerRoutes from "../../../../src/lineliff_files/footer.routes";
import MKBox from "components/MKBox";
import DefaultNavbar from "../../../../src/lineliff_files/examples/Navbars/DefaultNavbar";
import routes from "../../../../src/lineliff_files/routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import NavbarsAboutUs from "../Navbars";
import { useTranslation } from "react-i18next";
import MyMap from "pages/Map";
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
function Contact() {
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
                  <a href="/liff/presentation" style={{ color: "#808080", fontSize: "1rem" }}>
                    {t("home")}/
                  </a>
                  <a href="/liff/CEO" style={{ color: "#0bb288", fontSize: "1rem" }}>
                    {t("contact_us")}
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
                      fontSize: "45px",
                      color: "#562170",
                    }}
                  >
                    <span style={{ borderBottom: "2px solid #d1c398" }}> {t("Contact")}</span>
                  </Typography>
                  <Card>
                    <CardContent>
                      <Grid container spacing={0}>
                        <Typography
                          style={{
                            variant: "button",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontSize: "45px",
                            color: "#562170",
                            margin: "auto",
                          }}
                        >
                          {/* <span style={{ borderBottom: "2px solid #d1c398" }}>
                            ที่อยู่โรงพยาบาล
                          </span> */}
                        </Typography>
                        <Grid item lg={12} mx={"auto"}>
                          <span>โรงพยาบาลเกษมราษฎร์ ศรีบุรินทร์</span>
                        </Grid>
                        <Grid item lg={12}>
                          <span>111/5 ถนนเอเชีย 1 หมู่ 13 ต.สันทราย อ.เมือง จ. เชียงราย 57000</span>
                        </Grid>
                        <Grid item lg={12}>
                          <span>โทร : 0-5391-0999 โทรสาร : 0-5315-3233</span>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <MyMap />
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
                      fontSize: "30px",
                      color: "#562170",
                    }}
                  >
                    <span style={{ borderBottom: "2px solid #d1c398" }}> {t("Contact")}</span>
                  </Typography>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item lg={12} mx={"auto"}>
                          <span>โรงพยาบาลเกษมราษฎร์ ศรีบุรินทร์</span>
                        </Grid>
                        <Grid item lg={12}>
                          <span>111/5 ถนนเอเชีย 1 หมู่ 13 ต.สันทราย อ.เมือง จ. เชียงราย 57000</span>
                        </Grid>
                        <Grid item lg={12}>
                          <span>โทร : 0-5391-0999 โทรสาร : 0-5315-3233</span>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <MyMap />
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

export default Contact;
