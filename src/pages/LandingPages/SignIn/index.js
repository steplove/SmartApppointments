/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 React page layout routes
import routes from "routes";
import logo from "assets/images/logosmartApppointments.png"; // Adjust the path to your actual logo location
// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Swal from "sweetalert2";
function SignInBasic() {
  const handleSignInClick = () => {
    Swal.fire({
      icon: "success",
      title: "เข้าสู่ระบบสำเร็จ",
      text: "ยินดีต้อนรับเข้าสู่ Smart Apppointments",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = "/dashboard";
    });
  };
  const handleSignUpClick = () => {
    window.location.href = "/register";
  };
  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <img
                src={logo}
                alt="Logo"
                style={{ width: "160px", height: "auto", marginBottom: "-10px" }}
              />
              <MKTypography variant="h4" fontWeight="medium" color="white">
                Smart Appointments
              </MKTypography>
            </Box>
            <Card>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox>
                    <Typography style={{ color: "black" }}>Email :</Typography>
                    <MKInput type="email" label="Email" fullWidth />
                  </MKBox>
                  <MKBox>
                    <Typography style={{ color: "black" }}>Password :</Typography>
                    <MKInput type="password" label="Password" fullWidth />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={() => {
                        handleSignInClick();
                      }}
                    >
                      sign in
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="black">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                        onClick={() => {
                          handleSignUpClick();
                        }}
                      >
                        Sign up
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default SignInBasic;
