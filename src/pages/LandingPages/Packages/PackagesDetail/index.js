import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Grid, Hidden } from "@mui/material";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "constants/constants";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
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
  const { t } = useTranslation();
  const { code } = useParams();
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/searchPackageDetail/${code}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the status code is not in the range 200-299
        if (response.status < 200 || response.status >= 300) {
          throw new Error("Error fetching data");
        }

        const data = response.data;

        const promoEndDate = new Date(data.promoEndDate).toLocaleDateString();
        const packagePriceInt = parseInt(data.packagePrice, 10);
        const formattedPackagePrice = packagePriceInt.toLocaleString("th-TH");

        // Update state with the transformed data
        setSelectedPackage({ ...data, promoEndDate, formattedPackagePrice });
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [code]);
  const [openLoad, setopenLoad] = useState(false);
  useEffect(() => {
    if (selectedPackage) {
      // ทำการ render หน้าเว็บใหม่
      setopenLoad(true);
    }
  }, [selectedPackage]);
  // ตรวจสอบสถานะการโหลด หากกำลังโหลดข้อมูล แสดงข้อความ "Loading..."
  if (!openLoad) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div>
          <div style={{ textAlign: "center" }}>
            <CircularProgress color="primary" />
          </div>
          <p style={{ margin: "10px", color: "#333" }}>Loading ...</p>
        </div>
      </div>
    );
  }
  return (
    <Grid>
      <DefaultNavbar routes={routes} />
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Container maxWidth="md" sx={{ paddingTop: "5%", paddingBottom: 4 }}>
            {selectedPackage ? (
              <Grid>
                <Typography sx={{ marginBottom: 2, fontSize: "1.5rem" }}>
                  {selectedPackage.packageName}
                </Typography>
                <Grid container justifyContent="center">
                  <Grid item lg={12}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="auto"
                        image={`${selectedPackage.packageImage}`}
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
                              dangerouslySetInnerHTML={{ __html: selectedPackage.packageDetails }}
                            />
                            <Typography variant="body1" sx={{ color: "#ff0000" }}>
                              {t("price")}: {selectedPackage.packagePrice} ฿
                            </Typography>

                            <Typography variant="body1">
                              {t("expiration_date")}: {selectedPackage.promoEndDate}
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
              </Grid>
            ) : (
              <Typography variant="h4">Loading...</Typography>
            )}
          </Container>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <Container maxWidth="md" sx={{ paddingTop: "25%", paddingBottom: 4 }}>
            {selectedPackage ? (
              <Grid>
                <Typography sx={{ marginBottom: 2, fontSize: "1.2rem" }}>
                  {selectedPackage.packageName}
                </Typography>
                <Grid container justifyContent="center">
                  <Grid item lg={12}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="auto"
                        image={`${selectedPackage.packageImage}`}
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
                              {t("price")}: {selectedPackage.packagePrice} บาท
                            </Typography>
                            <Typography variant="body1">
                              {t("expiration_date")}: {selectedPackage.promoEndDate}
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
              </Grid>
            ) : (
              <Typography variant="h4">Loading...</Typography>
            )}
          </Container>
        </Hidden>
      </ThemeProvider>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </Grid>
  );
}

export default PackagesDetail;
