import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
} from "@mui/material";
import MKBox from "components/MKBox";
// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKTypography from "components/MKTypography";
import ListIcon from "@mui/icons-material/List";

// Routes
import routes from "routes";
// Images
import bgImage from "assets/images/hospital.png";

function Agreement() {
  const [isChecked, setChecked] = useState(false);
  const handleClickRegister = () => {
    window.location.href = "/register";
  };
  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-end",
          overflowY: "scroll",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.8, // คุณสามารถปรับค่าโปร่งแสงของรูปภาพที่นี่
            filter: "blur(2px)", // คุณสามารถปรับค่าเบลอที่นี่
            zIndex: -1,
          },
        }}
      >
        <Container
          sx={{
            display: "inline-block",
            flexDirection: "column",
            justifyContent: "center",
            height: {
              xs: "calc(115vh - 56px)",
              sm: "calc(100vh - 64px)",
              md: "calc(80vh - 64px)",
              lg: "calc(80vh - 64px)",
            },
            marginTop: {
              xs: "calc(25vh - 56px)",
              sm: "calc(30vh - 64px)",
            },
          }}
        >
          <Card elevation={5} sx={{ maxWidth: "800px", marginRight: "2%", marginBottom: "20px" }}>
            <MKBox
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={2}
              sx={{
                backgroundColor: "#01817a",
                borderTopLeftRadius: "0.7rem",
                borderTopRightRadius: "0.7rem",
              }}
            >
              <MKTypography
                style={{
                  color: "white",
                  fontSize: "1rem",
                }}
              >
                ข้อกำหนดและเงื่อนไขการใช้บริการแอพพลิเคชั่น
              </MKTypography>
            </MKBox>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListIcon color="primary" sx={{ marginRight: 1, fontSize: "2rem" }} />{" "}
                {/* Adjust fontSize value as needed */}
                <Typography variant="body1" paragraph>
                  ท่านที่มีนัดกับทาง รพ. อยู่แล้วไม่จำเป็นต้องจองผ่านระบบนี้
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <ListIcon color="primary" sx={{ marginRight: "1rem" }} />
                <Typography variant="body1" paragraph>
                  ระบบนี้อำนวยความสะดวกเพื่อลดขั้นตอนให้ท่านไม่ต้องไปติดต่อลงทะเบียน
                  และติดต่อศูนย์คัดกรอง ท่านสามารถไปที่หน้าห้องตรวจได้เลย และเมื่อไปถึง
                  หน้าห้องตรวจแล้ว ขอความกรุณาแจ้งกับพยาบาลหน้าห้องตรวจว่า
                  ได้ทำการลงทะเบียนออนไลน์มาแล้ว
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <ListIcon color="primary" sx={{ marginRight: "1rem" }} />
                <Typography variant="body1" paragraph>
                  ระบบนี้มิใช่การจองคิวเพื่อจัดลำดับการเข้าพบแพทย์
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <ListIcon color="primary" sx={{ marginRight: "1rem" }} />
                <Typography variant="body1" paragraph>
                  หลังจากจองลงทะเบียนตรวจล่วงหน้าแล้ว กรุณารอรับข้อความ SMS จาก รพ.
                  ซึ่งถ้าช่วงเวลาที่ท่านทำรายการเป็นช่วงนอกเวลาราชการ หรือวันหยุดราชการ
                  กรุณารอรับข้อความ SMS ในวันเปิดทำการถัดไป
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                <ListIcon color="primary" sx={{ marginRight: "1rem" }} />
                <Typography variant="body1" paragraph>
                  เปิดบริการเฉพาะ ผู้ป่วยชำระเงิน ข้าราชการ/รัฐวิสาหกิจนำใบเสร็จไปเบิก
                  ข้าราชการเบิกตรง ประกันสังคม เกษมราษฎร์ ศรีบุรินทร์
                  ประกันสุขภาพถ้วนหน้าโรงพยาบาลมเกษมราษฎร์ ศรีบุรินทร์
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={(e) => setChecked(e.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="ข้าพเจ้าได้อ่าน และยอมรับข้อกำหนด และเงื่อนไขการใช้บริการ"
              />
              <Box mt={2}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#367f7a", color: "white" }}
                  disabled={!isChecked}
                  onClick={() => {
                    handleClickRegister();
                  }}
                >
                  สมัครสมาชิก
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </MKBox>
    </>
  );
}

export default Agreement;
