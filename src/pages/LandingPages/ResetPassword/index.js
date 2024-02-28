import React, { useState, useEffect } from "react";
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
import md5 from "md5";
import OtpInput from "react-otp-input";
const MyConfig = {
  refText: "BCH01",
  otpSender: "BCHGROUP",
  keyauth: "520038d76befc773f2e5cebfe0285945",
  otpVarifyURL: "https://secure.etracker.cc/MobileOTPAPI/OTPVerifyAPI.aspx",
  otpReqURL: "https://secure.etracker.cc/MobileOTPAPI/OTPGenerateAPI.aspx",
  keyToken: "Bearer FC208BF8D7F6EE9B513B8B83EBC9BEB7B8205F1243529E6E8BB0539DF62D6C93",
};
function ResetPassword() {
  const { t } = useTranslation();
  const { mobileNo, surveyid } = useParams();
  const [password, setPassword] = useState("");
  const [verifiOtp, setVerifiOtp] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const isPasswordMatch = password === confirmPassword;

  useEffect(() => {
    if (verifiOtp.length === 6) {
      setIsChecking(true);
      // ทำการตรวจสอบ OTP ที่นี่
      gotoVarifyOTP(mobileNo, verifiOtp);
    }
  }, [verifiOtp]);

  const generateMd5 = (input) => {
    return md5(input);
  };
  const gotoVarifyOTP = async (mobileNo, otp) => {
    const refCode = generateMd5(`${MyConfig.refText}${mobileNo}${otp}`);
    const values = {
      survey_id: surveyid,
      refText: MyConfig.refText,
      otpSender: MyConfig.otpSender,
      phone_for_send: mobileNo,
      receive_opt: otp,
    };
    // กำหนด URL และ XML
    const url = MyConfig.otpVarifyURL;
    const xml = `<?xml version="1.0" encoding="UTF-8"?><REQ_DATA><SesID>${surveyid}</SesID><KEYAUTHEN>${MyConfig.keyauth}</KEYAUTHEN><RefCode>${refCode}</RefCode></REQ_DATA>`;
    const body = { xml, url, values };

    try {
      // ส่ง request ไปยัง API
      const response = await fetch("https://apicon.bangkokchainhospital.com/varifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: MyConfig.keyToken,
        },

        body: JSON.stringify(body),
      });
      console.log(response);
      if (response.ok) {
        const responseData = await response.json();
        const successStatus = responseData.success;
        if (successStatus) {
          if (password === confirmPassword) {
            // เพิ่มเงื่อนไข
            setVerificationStatus("success");
            setTimeout(() => {
              setIsOtpVerified(true);
            }, 1500);
          } else {
            setVerificationStatus("error");
            // เพิ่มข้อความแจ้งเตือนหรือกระทำที่ต้องการเมื่อรหัสผ่านไม่ตรงกัน
          }
        } else {
          setVerificationStatus("error");
        }
      } else {
        console.error("Error:", response.status);
        setVerificationStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setVerificationStatus("error");
    } finally {
      setIsChecking(false);
    }
  };
  const handleSignUpClick = () => {
    window.location.href = "/agreement";
  };
  const handleResetPassword = async () => {
    try {
      let countryCode = "0";

      const telephoneForSend = mobileNo.replace(/^66/, countryCode);
      console.log(telephoneForSend, "telephoneForSendtelephoneForSend");
      Swal.fire({
        title: "กำลังดำเนินการ...",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        timer: 10000, // 10 วินาที
        didClose: () => {
          // หาก SweetAlert ถูกปิดจากการเกินเวลา 10 วินาที
          // ทำอะไรก็ตามที่คุณต้องการทำหลังจาก SweetAlert ถูกปิดจากการเกินเวลา
          // เช่น นำผู้ใช้ไปยังหน้าอื่น ๆ, แสดงข้อความเตือน, ฯลฯ
        },
      });
      const response = await fetch(`${BASE_URL}/api/reset-password/${telephoneForSend}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        Swal.close();
        Swal.fire({
          title: `${t("password_reset_successful")}`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = "/presentation";
        }, 1500);
      } else {
        Swal.close();

        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "ไม่สามารถดำเนินการได้",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.close();
      console.error(error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถดำเนินการได้",
        icon: "error",
      });
    }
  };
  return (
    <Grid>
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
                {isOtpVerified ? (
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
                    <MKBox mt={2}></MKBox>
                    <MKInput
                      type="password"
                      label="ยืนยันรหัสผ่าน..."
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="confirmPassword"
                      fullWidth
                      placeholder="Enter your password again"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {!isPasswordMatch && <p style={{ color: "red" }}>รหัสผ่านไม่ตรงกัน</p>}
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
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p>ส่ง OTP ไปยังหมายเลข {mobileNo}</p>
                    <OtpInput
                      value={verifiOtp}
                      onChange={setVerifiOtp}
                      numInputs={6}
                      inputStyle={{ width: "2rem", height: "2rem", margin: "0.3rem" }}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                    />
                    {isChecking && <p>กำลังตรวจสอบ OTP...</p>}
                    {verificationStatus === "success" && (
                      <>
                        <p style={{ color: "green" }}>ยืนยันสำเร็จ!</p>
                        {/* เมื่อยืนยัน OTP แล้วตั้งค่า isOtpVerified เป็น true */}
                        {setIsOtpVerified(true)}
                      </>
                    )}
                    {verificationStatus === "error" && (
                      <p style={{ color: "red" }}>รหัส OTP ไม่ถูกต้อง</p>
                    )}
                  </div>
                )}
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </Grid>
  );
}

export default ResetPassword;
