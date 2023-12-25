import React, { useState } from "react";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CookieConsent from "react-cookie-consent";
import routes from "routes";
import Banner from "components/Banner";
import MKBox from "components/MKBox";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
// Material Kit 2 React components
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
// Images
import bgImage from "assets/images/hospital.png";
import MenuListHome from "./components/MenuListHome";
import PackageListHome from "./components/PackageListHome";
import HealthBlog from "./components/HealthBlogListHome";
function Presentation() {
  const [showNavbar] = useState(false);
  const slides = [];
  return (
    <>
      {showNavbar && <DefaultNavbar routes={routes} sticky />}
      <MKBox component="header" position="relative">
        <MKBox
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
            <Grid
              container
              item
              xs={12}
              md={7}
              lg={6}
              flexDirection="column"
              justifyContent="center"
            >
              <MKTypography
                variant="h1"
                color="white"
                mb={3}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                Kasemrad Sriburin
              </MKTypography>
              <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
                Hospital You Can Trust.
              </MKTypography>
              <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
                โรงพยาบาลที่คุณวางใจ
              </MKTypography>

              <Stack direction="row" spacing={1} mt={3}>
                <MKButton color="white" href="/signIn">
                  นัดหมาย
                </MKButton>
              </Stack>
            </Grid>
          </Container>
        </MKBox>
      </MKBox>
      <MKBox sx={{ marginBottom: "20px" }}>
        <MenuListHome />
      </MKBox>
      <MKBox sx={{ marginBottom: "20px" }}>
        <Banner slides={slides} />
      </MKBox>
      <MKBox sx={{ marginTop: "20px", marginBottom: "20px" }}>
        <PackageListHome />
      </MKBox>
      <MKBox sx={{ marginTop: "20px", marginBottom: "20px" }}>
        <HealthBlog />
      </MKBox>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
      <CookieConsent
        location="bottom"
        buttonText="อนุญาตคุกกี้ทั้งหมด"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#FFFFFF" }}
        buttonStyle={{ color: "#FFFFFF", fontSize: "13px", background: "#0bb288" }}
        expires={150}
      >
        <p style={{ fontSize: ".813rem", color: "#808080" }}>
          {" "}
          เมื่อคลิก “อนุญาตคุกกี้ทั้งหมด”
          หมายความว่าผู้ใช้งานยอมรับที่จะเปิดการใช้งานคุกกี้เพื่อวัตถุประสงค์ต่าง ๆ ดังต่อไปนี้
          เพื่อให้เว็บไซต์สามารถทำงานได้อย่างถูกต้องและเต็มประสิทธิภาพ
          เพื่อเปิดใช้คุณสมบัติของโซเชียลมีเดีย
          และเพื่อวิเคราะห์การเข้าใช้งานเพื่อนำข้อมูลไปใช้ในการทำการตลาดและการโฆษณา
          รวมถึงการแบ่งปันข้อมูลการใช้งานกับพาร์ทเนอร์โซเชียลมีเดีย
        </p>
      </CookieConsent>
    </>
  );
}

export default Presentation;
