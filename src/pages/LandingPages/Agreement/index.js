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
  Paper,
} from "@mui/material";
import MKBox from "components/MKBox";
// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKTypography from "components/MKTypography";
// Routes
import routes from "routes";
// Images
import bgImage from "assets/images/hospital.png";
// import DefaultFooter from "examples/Footers/DefaultFooter";
// import footerRoutes from "footer.routes";

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
          overflowY: "auto",
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
              <Paper sx={{ border: "1px solid black" }}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  p={3} // padding for some spacing around content
                >
                  <Typography variant="body1" paragraph>
                    Welcome to our website. If you continue to browse and use this website, you are
                    agreeing to comply with and be bound by the following terms and conditions of
                    use, which together with our privacy policy govern [business name]s relationship
                    with you in relation to this website. If you disagree with any part of these
                    terms and conditions, please do not use our website.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    The term [business name] refers to the owner of the website whose registered
                    office is [address]. Our company registration number is [company registration
                    number and place of registration]. The term you refers to the user or viewer of
                    our website.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    more agreement content
                  </Typography>
                </Box>
              </Paper>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={(e) => setChecked(e.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="I agree to the terms and conditions"
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
                  Accept
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
