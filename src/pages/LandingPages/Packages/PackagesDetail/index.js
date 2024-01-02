import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Grid, Hidden } from "@mui/material";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import { useParams } from "react-router-dom";
import { BASE_URL } from "constants/constants";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
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
function PackagesDetail() {
  const { code } = useParams();
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/searchPackageDetail/${code}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();

        const promoEndDate = new Date(data.promoEndDate).toLocaleDateString();
        const packagePriceInt = parseInt(data.packagePrice, 10);

        // ใช้ toLocaleString() กับ integer
        const formattedPackagePrice = packagePriceInt.toLocaleString("th-TH");

        // อัพเดต state ด้วยข้อมูลที่แปลงแล้ว
        setSelectedPackage({ ...data, promoEndDate, formattedPackagePrice });
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [code]);

  return (
    <>
      <DefaultNavbar routes={routes} />
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Container maxWidth="md" sx={{ paddingTop: "8%", paddingBottom: 4 }}>
            {selectedPackage ? (
              <>
                <Typography sx={{ marginBottom: 2, fontSize: "1.5rem" }}>
                  {selectedPackage.packageName}
                </Typography>
                <Grid container justifyContent="center">
                  <Grid item lg={12}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="auto"
                        image={`${BASE_URL}/${selectedPackage.packageImage}`}
                        alt="รูปภาพแพ็คเกจ"
                      />
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item lg={6}>
                            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                              {selectedPackage.packageName}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ marginBottom: 2, color: "#808080" }}
                            >
                              {selectedPackage.packageDetails}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#ff0000" }}>
                              ราคา: {selectedPackage.formattedPackagePrice} บาท
                            </Typography>

                            <Typography variant="body1">
                              วันหยุดอายุ: {selectedPackage.promoEndDate}
                            </Typography>
                          </Grid>
                          <Grid item lg={6}>
                            {/* ส่วนอื่น ๆ ที่ต้องการแสดง เช่น รายละเอียดเพิ่มเติม */}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography variant="h4">Loading...</Typography>
            )}
          </Container>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <Container maxWidth="md" sx={{ paddingTop: "25%", paddingBottom: 4 }}>
            {selectedPackage ? (
              <>
                <Typography sx={{ marginBottom: 2, fontSize: "1.2rem" }}>
                  {selectedPackage.packageName}
                </Typography>
                <Grid container justifyContent="center">
                  <Grid item lg={12}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="auto"
                        image={`${BASE_URL}/${selectedPackage.packageImage}`}
                        alt="รูปภาพแพ็คเกจ"
                      />
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item lg={6}>
                            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                              {selectedPackage.packageName}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ marginBottom: 2, color: "#808080" }}
                            >
                              {selectedPackage.packageDetails}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#ff0000" }}>
                              ราคา: {selectedPackage.packagePrice} บาท
                            </Typography>
                            <Typography variant="body1">
                              วันหยุดอายุ: {selectedPackage.promoEndDate}
                            </Typography>
                          </Grid>
                          <Grid item lg={6}>
                            {/* ส่วนอื่น ๆ ที่ต้องการแสดง เช่น รายละเอียดเพิ่มเติม */}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography variant="h4">Loading...</Typography>
            )}
          </Container>
        </Hidden>
      </ThemeProvider>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default PackagesDetail;
