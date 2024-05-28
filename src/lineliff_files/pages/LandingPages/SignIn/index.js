// react-router-dom components
import React, { useState, useEffect } from "react";
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
import DefaultNavbar from "../../../../../src/lineliff_files/examples/Navbars/DefaultNavbar";

// Material Kit 2 React page layout routes
import routes from "../../../../../src/lineliff_files/routes";
import logo from "assets/images/logosmartApppointments.png"; // Adjust the path to your actual logo location
// Images
import bgImage from "assets/images/hospital.png";
import Swal from "sweetalert2";
import { BASE_URL, token } from "constants/constants";
import Foots from "../../../../../src/lineliff_files/components/Foot";
import { useTranslation } from "react-i18next";

function SignInBasic() {
  const { t } = useTranslation();
  const [identificationInput, setIdentificationInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // ถ้ามี token ให้ทำการ redirect ไปยังหน้า dashboard
      window.location.href = "/liff/dashboard";
    }
  }, []);

  const handleSignInClick = async () => {
    try {
      // สมมติว่าคุณมี state สำหรับ username และ password
      Swal.fire({
        title: `${t("Logging_in")}`,
        text: `${t("Just_a_moment_please")}`,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      const userData = {
        IdenNumber: identificationInput,
        Password: passwordInput,
      };
      // สมมติว่า URL ของ API endpoint สำหรับการลงชื่อเข้าใช้คือ '/api/login'
      const response = await fetch(`${BASE_URL}/api/loginCustomer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.status !== 200) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      // ตรวจสอบว่ามี token หรือ response อื่น ๆ ที่ต้องการ
      if (data.token) {
        // บันทึก token หรือทำอะไรที่ต้องการ
        localStorage.setItem("token", data.token);
      }
      Swal.close();
      if (data.Customer_Status === 1) {
        Swal.fire({
          icon: "warning",
          title: `${t("unable_to_login")}`,
          text: `${t("please_confirm_OTP")}`,
          showConfirmButton: true,
        }).then(() => {
          window.location.href = "/liff/forgototp";
        });
      } else {
        Swal.fire({
          icon: "success",
          title: `${t("login_successful")}`,
          text: `${t("welcome_to")}`,
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = "/liff/dashboard";
        });
      }
      // แสดงข้อความแจ้งเตือนว่าลงชื่อเข้าใช้สำเร็จ
    } catch (error) {
      // แสดงข้อความแจ้งเตือนว่าลงชื่อเข้าใช้ไม่สำเร็จ
      Swal.fire({
        icon: "error",
        title: `${t("login_failed")}`,
        text: error.message,
      });
    }
  };

  const handleSignUpClick = () => {
    window.location.href = "/liff/agreement";
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // เมื่อกด Enter ให้ทำงานที่นี่
      handleSignInClick();
    }
  };
  return (
    <Grid>
      <DefaultNavbar routes={routes} />
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
                    <Typography className="black-text" sx={{ fontSize: "0.9rem" }}>
                      {t("national_identification_number")}/{t("passport")}
                    </Typography>
                    <MKInput
                      type="email"
                      label={`${t("national_identification_number")}/${t("passport")}`}
                      id="identificationNumber"
                      name="identificationNumber"
                      autoComplete="identificationNumber"
                      value={identificationInput}
                      onChange={(e) => setIdentificationInput(e.target.value)}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox>
                    <Typography className="black-text" sx={{ fontSize: "0.9rem" }}>
                      {t("password")}
                    </Typography>
                    <MKInput
                      type="password"
                      label={`${t("password")}`}
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      fullWidth
                      onKeyPress={handleKeyPress}
                    />
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
                      {t("login")}
                    </MKButton>
                  </MKBox>
                  <Grid style={{ display: "flex", justifyContent: "space-between" }}>
                    <MKBox mt={0} mb={0} textAlign="center">
                      <MKTypography variant="button" className="black-text">
                        {t("no_account")}?{" "}
                        <MKTypography
                          variant="button"
                          color="info"
                          fontWeight="medium"
                          textGradient
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleSignUpClick();
                          }}
                        >
                          {t("register")}
                        </MKTypography>
                      </MKTypography>
                    </MKBox>
                    <MKBox mt={0} mb={0} textAlign="center">
                      <MKTypography variant="button" className="black-text">
                        {" "}
                        <MKTypography
                          variant="button"
                          color="info"
                          fontWeight="medium"
                          textGradient
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            window.location.href = "/liff/ForgotPassword";
                          }}
                        >
                          {t("forgot_password")}
                        </MKTypography>
                      </MKTypography>
                    </MKBox>
                  </Grid>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <Foots />
    </Grid>
  );
}

export default SignInBasic;
