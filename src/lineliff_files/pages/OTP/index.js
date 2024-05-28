import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useParams } from "react-router-dom";
import md5 from "md5";
import { BASE_URL, token } from "constants/constants";
import Swal from "sweetalert2";
import { Button, Grid, Hidden } from "@mui/material";
import MKBox from "components/MKBox";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
function OTP() {
  const { mobileNo, surveyid } = useParams();
  // let surveyid1;
  // console.log(mobileNo, surveyid);
  const [verifiOtp, setVerifiOtp] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const mobileOTP = mobileNo;
  let refText, otpSender, keyauth, phoneforsend;

  const MyConfig = {
    refText: "BCH01",
    otpSender: "BCHGROUP",
    keyauth: "520038d76befc773f2e5cebfe0285945",
    otpVarifyURL: "https://secure.etracker.cc/MobileOTPAPI/OTPVerifyAPI.aspx",
    otpReqURL: "https://secure.etracker.cc/MobileOTPAPI/OTPGenerateAPI.aspx",
    keyToken: "Bearer FC208BF8D7F6EE9B513B8B83EBC9BEB7B8205F1243529E6E8BB0539DF62D6C93",
  };

  useEffect(() => {
    fetch(BASE_URL + "/api/my-config")
      .then((response) => response.json())
      .then((data) => {
        // ใช้ MyConfig ที่ได้จากการเรียก API
        console.log(data, "datadatadata");
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (verifiOtp.length === 6) {
      setIsChecking(true);
      // ทำการตรวจสอบ OTP ที่นี่
      gotoVarifyOTP(mobileNo, verifiOtp);
    }
  }, [verifiOtp]);

  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);
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
        },
      });
      // ส่ง request ไปยัง API
      const response = await fetch("https://apicon.bangkokchainhospital.com/varifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: MyConfig.keyToken,
        },

        body: JSON.stringify(body),
      });
      if (response.ok) {
        Swal.close();
        setVerificationStatus("success");
        updateStatusOTP();
      } else {
        setVerificationStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setVerificationStatus("error");
    } finally {
      setIsChecking(false);
    }
  };

  const updateStatusOTP = async () => {
    // console.log(mobileOTP, "mobileOTPmobileOTP");
    let countryCode = "0";

    const telephoneForSend = mobileOTP.replace(/^66/, countryCode);
    const response = await fetch(`${BASE_URL}/api/otpUpdateStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ telephoneForSend }),
    });
    if (response.ok) {
      // The request was successful
      // console.log(response, "Request was successful");
      const responseData = await response.json();
      // console.log("Response data:", responseData);
      if (responseData) {
        Swal.fire({
          title: `OTP Success!`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        Swal.close();
        Swal.fire({
          title: " ยืนยันOTPสำเร็จ กำลังไปยังหน้าล็อคอิน",
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
        setTimeout(() => {
          window.location.href = `/liff/signIn`;
        }, 1500);
      }
    } else {
      // The request failed
      console.error(``);

      // Log the error message from the response body
      const errorData = await response.json();
      console.error("Error data:", errorData);
    }
  };
  const gotoOTP = async () => {
    refText = MyConfig.refText;
    otpSender = MyConfig.otpSender;
    keyauth = MyConfig.keyauth;
    phoneforsend = mobileOTP;

    const values = {
      survey_id: surveyid,
      refText: refText,
      otpSender: otpSender,
      phone_for_send: phoneforsend,
    };

    const url = MyConfig.otpReqURL;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <REQ_DATA>
        <TRANSID>${surveyid}</TRANSID>
        <KEYAUTHEN>${keyauth}</KEYAUTHEN>
        <RefText>${refText}</RefText>
        <Sender>${otpSender}</Sender>
        <Recipient>${phoneforsend}</Recipient>
      </REQ_DATA>`;
    // console.log(xml, "xml");
    const body = { xml: xml, url: url, values: values };

    try {
      const response = await axios.post("https://apicon.bangkokchainhospital.com/sendotp", body, {
        headers: { Authorization: MyConfig.keyToken },
      });

      if (response.status === 200) {
        // routeToOTP(surveyid, phoneforsend);
        console.log("success");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleRequestOTP = async () => {
    setCountdown(30);
    setVerificationStatus(null);
    setVerifiOtp("");
    setIsChecking(false);
    gotoOTP();
    Swal.fire({
      title: "กำลังส่ง OTP ใหม่...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
      timer: 5000, // Adjust the timer as needed
    });

    // Example: Simulate a delay (replace with your actual logic)
    setTimeout(() => {
      Swal.close();
      // Add logic to handle the completion of requesting a new OTP
      // ...
    }, 5000);
  };

  return (
    <Grid>
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <p>ส่ง OTP ไปยังหมายเลข {mobileNo}</p>
            <p style={{ color: "#FF0000", fontSize: "15px" }}>
              กรุณากรอกหมายเลข OTP ที่ช่องด้านล่าง
            </p>
            <OtpInput
              value={verifiOtp}
              onChange={setVerifiOtp}
              numInputs={6}
              inputStyle={{ width: "3rem", height: "3rem", margin: "0 1rem" }} // ขยายขนาดของช่อง OTP
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
            <Button
              style={{ marginTop: 20, color: "white", background: "#311b92" }}
              variant="contained"
              onClick={handleRequestOTP}
              disabled={countdown > 0}
            >
              ขอ OTP ใหม่ ({countdown} วิ)
            </Button>

            {isChecking && <p>กำลังตรวจสอบ OTP...</p>}
            {verificationStatus === "success" && <p style={{ color: "green" }}>ยืนยันสำเร็จ!</p>}
            {verificationStatus === "error" && <p style={{ color: "red" }}>รหัส OTP ไม่ถูกต้อง</p>}
            {/* แสดงข้อความผิดพลาด */}
          </div>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <MKBox px={3} width="100%" position="relative" zIndex={2}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={10} md={8} lg={6} xl={4} sx={{ marginTop: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <p>ส่ง OTP ไปยังหมายเลข {mobileNo}</p>
                  <p style={{ color: "#FF0000", fontSize: "15px" }}>
                    กรุณากรอกหมายเลข OTP ที่ช่องด้านล่าง
                  </p>
                  <OtpInput
                    value={verifiOtp}
                    onChange={setVerifiOtp}
                    numInputs={6}
                    inputStyle={{ width: "2rem", height: "2.5rem", margin: "0.5rem" }} // ขยายขนาดของช่อง OTP
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                  <Button
                    style={{ marginTop: 20, color: "white", background: "#311b92" }}
                    variant="contained"
                    onClick={handleRequestOTP}
                    disabled={countdown > 0}
                  >
                    ขอ OTP ใหม่ ({countdown} วิ)
                  </Button>

                  {isChecking && <p>กำลังตรวจสอบ OTP...</p>}
                  {verificationStatus === "success" && (
                    <p style={{ color: "green" }}>ยืนยันสำเร็จ!</p>
                  )}
                  {verificationStatus === "error" && (
                    <p style={{ color: "red" }}>รหัส OTP ไม่ถูกต้อง</p>
                  )}
                  {/* แสดงข้อความผิดพลาด */}
                </div>
              </Grid>
            </Grid>
          </MKBox>
        </Hidden>
      </ThemeProvider>
    </Grid>
  );
}

export default OTP;
