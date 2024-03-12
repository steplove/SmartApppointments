import React, { useState } from "react";
import { Hidden } from "@mui/material";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CookieConsent from "react-cookie-consent";
import routes from "routes";
import Banner from "components/Banner";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import { Button, Stack, Container, Grid, Typography, Box } from "@mui/material";
import bgImage from "assets/images/hospital.png";
import MenuListHome from "./components/MenuListHome";
import PackageListHome from "./components/PackageListHome";
import HealthBlog from "./components/HealthBlogListHome";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LanguageSelector from "LanguageSelector";
import { useTranslation } from "react-i18next";
import { useSpring, animated } from "@react-spring/web";
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

function Presentation() {
  const [showNavbar] = useState(false);
  const slides = [];
  const { t } = useTranslation();
  const springs = useSpring({
    from: { x: -100 },
    to: { x: 0 },
  });
  const springs1 = useSpring({
    from: { y: -100 },
    to: { y: 0 },
  });
  const Cookie = useSpring({
    from: { y: 100 },
    to: { y: 0 },
  });
  return (
    <>
      {showNavbar && <DefaultNavbar routes={routes} sticky relative />}
      <Box component="header" position="relative">
        <Grid
          item
          style={{
            position: "absolute",
            right: 25,
            textAlign: "center",
            alignItems: "center",
            marginTop: 10,
            backgroundColor: "whitesmoke",
            borderRadius: 10,
            padding: 10,
            height: "6%",
          }}
        >
          <LanguageSelector />
        </Grid>
        <Box
          display="flex"
          alignItems="center"
          minHeight="85vh"
          sx={{
            backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.5),
                rgba(gradients.dark.state, 0.5)
              )}, url(${bgImage})`,

            backgroundSize: "cover",

            backgroundPosition: "center",
          }}
        >
          <Container>
            <Grid item xs={12} md={7} lg={6} flexDirection="column" justifyContent="center">
              <animated.div
                style={{
                  ...springs1,
                }}
              >
                <Typography
                  variant="h1"
                  color="#FFFFFF"
                  mb={3}
                  sx={({ breakpoints, typography: { size } }) => ({
                    [breakpoints.down("md")]: {
                      fontSize: size["3xl"],
                    },
                  })}
                >
                  {t("kasemrad_sriburin")}
                </Typography>
              </animated.div>{" "}
              <animated.div
                style={{
                  ...springs,
                }}
              >
                <Typography variant="body1" color="#FFFFFF" opacity={0.8} pr={6} mr={6}>
                  Hospital You Can Trust.
                </Typography>
              </animated.div>{" "}
              <animated.div
                style={{
                  ...springs,
                }}
              >
                <Typography variant="body1" color="#FFFFFF" opacity={0.8} pr={6} mr={6}>
                  {t("hospital_you_trust")}
                </Typography>
              </animated.div>{" "}
              <Stack direction="row" spacing={1} mt={3}>
                <animated.div
                  style={{
                    ...springs,
                  }}
                >
                  <Button style={{ backgroundColor: "white" }} href="/signIn">
                    {t("appointment")}
                  </Button>
                </animated.div>{" "}
              </Stack>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        <MenuListHome />
      </Box>
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Box sx={{ marginBottom: "20px", maxWidth: "70%", margin: "auto" }}>
            <animated.div
              style={{
                ...springs,
              }}
            >
              <Banner slides={slides} />
            </animated.div>{" "}
          </Box>
        </Hidden>
        {/* Mobile View */}
        <Hidden smUp>
          <Box sx={{ marginBottom: "20px", maxWidth: "100%", margin: "auto" }}>
            <Banner slides={slides} />
          </Box>
        </Hidden>
      </ThemeProvider>
      <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
        <PackageListHome />
      </Box>
      <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
        <HealthBlog />
      </Box>
      <Box pt={6} px={1} mt={6}>
        <animated.div
          style={{
            ...springs,
          }}
        >
          <DefaultFooter content={footerRoutes} />
        </animated.div>{" "}
      </Box>
      <animated.div
        style={{
          ...Cookie,
        }}
      >
        <CookieConsent
          location="bottom"
          buttonText={t("allow_all_cookies")}
          cookieName="myAwesomeCookieName2"
          style={{ background: "#FFFFFF" }}
          buttonStyle={{ color: "#FFFFFF", fontSize: "13px", background: "#0bb288" }}
          expires={150}
        >
          <span style={{ fontSize: ".813rem", color: "#808080" }}>{t("cookies")}</span>
        </CookieConsent>
      </animated.div>{" "}
    </>
  );
}

export default Presentation;
