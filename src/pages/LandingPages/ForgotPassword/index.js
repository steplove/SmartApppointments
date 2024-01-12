import React, { useState } from "react";
import { BASE_URL } from "constants/constants";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 React page layout routes
import routes from "routes";
import { Card } from "@mui/material";
import Swal from "sweetalert2";
import MKBox from "components/MKBox";
import bgImage from "assets/images/hospital.png";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import logo from "assets/images/logosmartApppointmentsnew.png"; // Adjust the path to your actual logo location
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const handleSignUpClick = () => {
    window.location.href = "/agreement";
  };
  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      console.log(response);
      if (response.ok) {
        Swal.fire({
          title: "ส่งอีเมลสำเร็จ",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("สำเร็จ");
        setTimeout(() => {
          window.location = "/presentation";
        }, 1500);
      } else if (response.status === 404) {
        Swal.fire({
          title: "ไม่พบข้อมูลอีเมลในระบบ",
          text: "",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        // const errorData = await response.json();
        // throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error sending password reset email");
    }
  };

  return (
    <>
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
            <Card>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      src={logo}
                      alt="Logo"
                      style={{
                        width: "120px",
                        height: "auto",
                        marginBottom: "-10px",
                      }}
                    />
                    <Typography variant="h4" fontWeight="medium" color="white">
                      Smart Appointments
                    </Typography>
                  </Box>
                  <Typography style={{ fontWeight: "bold", color: "#408080", textAlign: "center" }}>
                    {t("forgot_password")}
                  </Typography>
                  <Typography
                    className="black-text"
                    sx={{ fontSize: "0.8rem", textAlign: "center" }}
                  >
                    {t("reset_your_password_with_your_registered_email")}
                  </Typography>
                </MKBox>
                <MKBox mt={2}>
                  <MKInput
                    type="email"
                    label={`${t("email")}`}
                    id="identificationNumber"
                    name="identificationNumber"
                    autoComplete="identificationNumber"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </MKBox>
                <MKBox mt={2} mb={1}>
                  <MKButton
                    variant="gradient"
                    fullWidth
                    sx={{ background: "#2596be", color: "#ffffff" }}
                    onClick={handleForgotPassword}
                  >
                    <SendIcon style={{ marginRight: "8px" }} /> {t("reset_password")}
                  </MKButton>
                </MKBox>
                <MKBox mt={0} mb={0} textAlign="center">
                  <MKTypography variant="button" className="black-text">
                    {t("no_account")}?{" "}
                    <MKTypography
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                      onClick={() => {
                        handleSignUpClick();
                      }}
                    >
                      {t("register")}
                    </MKTypography>
                  </MKTypography>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      {/* <div
        style={{
          marginLeft: "0%",
          marginRight: "0%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // ทำให้คอมโพเนนต์อยู่กลางหน้าจอ
          padding: "20px",
        }}
      >
        <Card sx={{ width: "80%", height: "50%" }}>
          <h2 style={{ fontWeight: "bold", color: "#408080", textAlign: "center" }}>
            รีเซ็ทรหัสผ่าน
          </h2>
          <TextField
            id="outlined-basic"
            label="อีเมล"
            variant="outlined"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              marginBottom: "10px",
              width: "300px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "300px",
              margin: "auto",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                // ตัวอย่างการใส่ลิงค์กลับหน้าหลัก
                window.location.href = "/presentation";
              }}
              style={{
                width: "150px",
                backgroundColor: "#0d6efd",
                color: "white",
                margin: "10px",
              }}
            >
              กลับหน้าหลัก
            </Button>
            <Button
              variant="contained"
              onClick={handleForgotPassword}
              style={{
                width: "150px",
                backgroundColor: "#01817a",
                color: "white",
                margin: "10px",
              }}
            >
              ส่งอีเมล
            </Button>
          </div>
        </Card>
      </div> */}
    </>
  );
}

export default ForgotPassword;
