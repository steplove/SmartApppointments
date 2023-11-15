import React, { useState } from "react";
import { BASE_URL } from "constants/constants";
import { Button, TextField, Card } from "@mui/material";
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

      if (response.ok) {
        alert("Password reset email sent");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error sending password reset email");
    }
  };

  return (
    <Card sx={{ marginTop: "50%" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2>รีเซ็ทรหัสผ่าน</h2>
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
        <Button
          variant="contained"
          onClick={handleForgotPassword}
          style={{ width: "150px", backgroundColor: "#4CAF50", color: "white" }}
        >
          ส่งอีเมล
        </Button>
      </div>
    </Card>
  );
}

export default ForgotPassword;
