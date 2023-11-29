import React from "react";
import { Container, Typography, Card, CardContent, CardMedia, Button } from "@mui/material";
import PackageImage from "../../../../assets/images/550.jpg"; // เพิ่ม path ของรูปภาพ

function PackagesDetail() {
  return (
    <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        รายละเอียดแพ็คเกจ
      </Typography>

      <Card>
        <CardMedia component="img" height="300" image={PackageImage} alt="รูปภาพแพ็คเกจ" />{" "}
        {/* เพิ่มรูปภาพ */}
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            ชื่อแพ็คเกจ
          </Typography>
          <Typography variant="subtitle1" sx={{ marginBottom: 2, color: "#0bb288" }}>
            ชื่อย่อแพ็คเกจ
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            คำอธิบายแพ็คเกจ ที่นี่คือส่วนที่บอกถึงสิ่งที่รวมอยู่ในแพ็คเกจ
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            ข้อมูลเพิ่มเติมหรือรายละเอียดเพิ่มเติมเกี่ยวกับแพ็คเกจสามารถเพิ่มที่นี่
          </Typography>
          <Typography variant="body1" sx={{ color: "#ff0000" }}>
            ราคา: 550 บาท
          </Typography>

          {/* เพิ่มข้อมูลหรือปุ่มอื่น ๆ ตามที่คุณต้องการที่นี่ */}

          <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            จองเดี๋ยวนี้
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default PackagesDetail;
