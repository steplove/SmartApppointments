import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

const Foots = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (isSmallScreen) {
    return null; // หากเป็นขนาดหน้าจอ "sm" ให้ไม่แสดง Foots
  }

  return (
    <Box
      sx={{
        backgroundColor: "#367F7A", // ตั้งสีพื้นหลังเป็นเขียว
        color: "white", // ตั้งสีข้อความเป็นขาว
        textAlign: "center", // จัดข้อความตรงกลาง
        padding: "20px", // กำหนดระยะห่างขอบ
        position: "fixed", // ทำให้อยู่ด้านล่างของหน้าจอ
        left: 0, // จัดให้อยู่ที่ซ้าย
        bottom: 0, // จัดให้อยู่ที่ด้านล่าง
        width: "100%", // ขยายกว้างเต็มหน้าจอ
      }}
      zindex={999}
    >
      <Typography variant="body1" sx={{ color: "white !important" }}>
        © 2023 โรงพยาบาลเกษมราษฎร์ ศรีบุรินทร์
      </Typography>
    </Box>
  );
};

export default Foots;
