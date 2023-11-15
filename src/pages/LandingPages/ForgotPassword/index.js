import React, { useState } from "react";
import { BASE_URL } from "constants/constants";
import { TextField, Button, makeStyles, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // สีเขียวหลัก
    },
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff", // สีข้อความ
    "&:hover": {
      backgroundColor: "#388e3c", // สี hover
    },
  },
}));

function ForgotPassword() {
  const classes = useStyles();
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
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <TextField
          className={classes.input}
          type="email"
          label="Enter your email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className={classes.button} onClick={handleForgotPassword} variant="contained">
          Reset Password
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default ForgotPassword;
