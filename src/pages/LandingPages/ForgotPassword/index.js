import React, { useState } from "react";
import { BASE_URL } from "constants/constants";
import { Button, TextField, Card } from "@mui/material";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");

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
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // ทำให้คอมโพเนนต์อยู่กลางหน้าจอ
      }}
    >
      <div
        style={{ marginLeft: "0%", marginRight: "0%", display: "flex", flexDirection: "column" }}
      >
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
          style={{ marginBottom: "10px", width: "300px" }}
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
              margin: "auto",
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
              margin: "auto",
            }}
          >
            ส่งอีเมล
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ForgotPassword;
