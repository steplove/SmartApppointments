import React, { useState } from "react";
import { BASE_URL } from "constants/constants";
import { useParams } from "react-router-dom";
function ResetPassword() {
  const { UID } = useParams();
  const [password, setPassword] = useState("");
  console.log("UIDUID");
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
        alert("Password reset email sent");
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
    <div>
      <input
        type="password"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;
