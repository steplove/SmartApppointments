import React, { useState } from "react";
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
import { BASE_URL } from "constants/constants";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ResetPassword() {
  const { t } = useTranslation();

  const { UID } = useParams();
  const [password, setPassword] = useState("");
  console.log("UIDUID");
  const handleSignUpClick = () => {
    window.location.href = "/agreement";
  };
  const handleResetPassword = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/reset-password/${UID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        Swal.fire({
          title: `${t("password_reset_successful")}`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location = "/presentation";
        }, 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error resetting password");
    }
  };
  return (
    <>
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
                    {t("reset_password")}
                  </Typography>
                </MKBox>
                <MKBox mt={2}>
                  <MKInput
                    type="password"
                    label="รหัสผ่านใหม่..."
                    id="newPassword"
                    name="newPassword"
                    autoComplete="newPassword"
                    fullWidth
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </MKBox>
                <MKBox mt={2} mb={1}>
                  <MKButton
                    variant="gradient"
                    fullWidth
                    sx={{ background: "#2596be", color: "#ffffff" }}
                    onClick={handleResetPassword}
                  >
                    {t("reset_password")}
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
    </>
  );
}

export default ResetPassword;
