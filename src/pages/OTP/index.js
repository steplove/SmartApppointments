import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useParams } from "react-router-dom";
import md5 from "md5";
import { BASE_URL } from "constants/constants";
import Swal from "sweetalert2";

function OTP() {
  const { mobileNo, surveyid } = useParams();
  // let surveyid1;
  // console.log(mobileNo, surveyid);
  const [verifiOtp, setVerifiOtp] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);

  const MyConfig = {
    refText: "BCH01",
    otpSender: "BCHGROUP",
    keyauth: "520038d76befc773f2e5cebfe0285945",
    otpVarifyURL: "https://secure.etracker.cc/MobileOTPAPI/OTPVerifyAPI.aspx",
    otpReqURL: "https://secure.etracker.cc/MobileOTPAPI/OTPGenerateAPI.aspx",
    keyToken: "Bearer FC208BF8D7F6EE9B513B8B83EBC9BEB7B8205F1243529E6E8BB0539DF62D6C93",
  };
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
        const responseData = await response.json();
        const successStatus = responseData.success;
        if (successStatus) {
          setVerificationStatus("success");
          await fetch(`${BASE_URL}/api/otpUpdateStatus`, {
            method: "POST",
            body: JSON.stringify(mobileNo),
          });
          setTimeout(() => {
            window.location.href = `/signIn`;
          }, 1500);
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
  return (
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
      <p style={{ color: "#FF0000", fontSize: "15px" }}>กรุณากรอกหมายเลข OTP ที่ช่องด้านล่าง</p>

      <OtpInput
        value={verifiOtp}
        onChange={setVerifiOtp}
        numInputs={6}
        inputStyle={{ width: "3rem", height: "3rem", margin: "0 1rem" }} // ขยายขนาดของช่อง OTP
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />
      {isChecking && <p>กำลังตรวจสอบ OTP...</p>}
      {verificationStatus === "success" && <p style={{ color: "green" }}>ยืนยันสำเร็จ!</p>}
      {verificationStatus === "error" && <p style={{ color: "red" }}>รหัส OTP ไม่ถูกต้อง</p>}
      {/* แสดงข้อความผิดพลาด */}
    </div>
  );
}

export default OTP;
