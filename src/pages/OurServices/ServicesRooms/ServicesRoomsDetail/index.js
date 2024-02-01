import React, { useEffect, useState } from "react";
import { Container, Typography, CardContent, Grid, Hidden, Card } from "@mui/material";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import { useParams } from "react-router-dom";
import { BASE_URL } from "constants/constants";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Carousel } from "react-responsive-carousel";

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
function ServicesRoomsDetail() {
  const { t } = useTranslation();
  const { code } = useParams();
  const [selectedService, setSelectedService] = useState("");
  console.log(selectedService, "fetchDatafetchDatafetchData");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/searchServiceDetail/${code}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        console.log(data, "datadatadata");
        // อัพเดต state ด้วยข้อมูลที่แปลงแล้ว
        if (data && Array.isArray(data)) {
          // ให้ setSelectedService แสดงทั้งหมดที่ได้จาก data
          setSelectedService(data);
        } else {
          console.error("Data is null or not an array");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [code]);

  return (
    <Grid>
      <DefaultNavbar routes={routes} />
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Container maxWidth="md" sx={{ paddingTop: "5%", paddingBottom: 4 }}>
            {selectedService && selectedService.length > 0 ? (
              <Grid>
                <Typography
                  sx={{ marginBottom: 2, color: "#6b2a8b", fontWeight: "bold", fontSize: "1.5rem" }}
                >
                  {selectedService[0].Room_Type}
                </Typography>

                <Grid container justifyContent="center">
                  <Grid item lg={12}>
                    <Card>
                      <Grid item lg={12} sx={{ width: "80%", height: "80%", margin: "auto" }}>
                        <Carousel
                          showArrows={true}
                          showStatus={true}
                          showIndicators={true}
                          infiniteLoop={true}
                          showThumbs={true}
                          useKeyboardArrows={true}
                          autoPlay={true}
                          stopOnHover={true}
                          swipeable={true}
                          dynamicHeight={true}
                          emulateTouch={true}
                          height={600}
                        >
                          {selectedService.map((service) => (
                            <Grid key={service.UID}>
                              <img src={`${BASE_URL}/${service.image}`} alt="" />
                            </Grid>
                          ))}
                        </Carousel>
                      </Grid>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item lg={4}>
                            <Typography
                              variant="h5"
                              sx={{ marginBottom: 2, color: "#6b2a8b", fontWeight: "bold" }}
                            >
                              คุณลักษณะห้อง
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ marginBottom: 2, lineHeight: 0.8 }}
                            >
                              <Grid
                                dangerouslySetInnerHTML={{
                                  __html: selectedService[0].Room_Detail,
                                }}
                              />
                            </Typography>
                          </Grid>
                          <Grid item lg={4}>
                            <Typography
                              variant="h5"
                              sx={{ marginBottom: 2, color: "#6b2a8b", fontWeight: "bold" }}
                            >
                              อาหาร
                            </Typography>
                            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
                              <Grid
                                dangerouslySetInnerHTML={{
                                  __html: selectedService[0].Food_Detail,
                                }}
                              />
                            </Typography>
                          </Grid>
                          <Grid item lg={4}>
                            <Typography
                              variant="h5"
                              sx={{ marginBottom: 2, color: "#6b2a8b", fontWeight: "bold" }}
                            >
                              สิ่งอำนวยความสะดวก
                            </Typography>
                            <Typography variant="subtitle1" sx={{ lineHeight: 0.8 }}>
                              <Grid
                                dangerouslySetInnerHTML={{ __html: selectedService[0].Property }}
                              />
                            </Typography>
                          </Grid>
                          {/* ตำแหน่งส่วนที่ต้องการแสดงเพิ่มเติม */}
                        </Grid>
                        <Grid item lg={6}>
                          {/* ส่วนอื่น ๆ ที่ต้องการแสดง เช่น รายละเอียดเพิ่มเติม */}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="body1">No data available</Typography>
            )}
          </Container>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <Container maxWidth="md" sx={{ paddingTop: "15%", paddingBottom: 4 }}>
            {selectedService ? (
              <Grid>
                <Typography sx={{ marginBottom: 2, fontSize: "1.2rem" }}>
                  {selectedService.Room_Type}
                </Typography>
                <Grid container justifyContent="center">
                  <Grid item lg={12}>
                    <Carousel
                      showArrows={true}
                      showStatus={true}
                      showIndicators={true}
                      infiniteLoop={true}
                      showThumbs={true}
                      useKeyboardArrows={true}
                      autoPlay={true}
                      stopOnHover={true}
                      swipeable={true}
                      dynamicHeight={true}
                      emulateTouch={true}
                    >
                      {selectedService.map((service) => (
                        <Grid key={service.UID}>
                          <img src={`${BASE_URL}/${service.image}`} alt="" />
                        </Grid>
                      ))}
                    </Carousel>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item lg={6}>
                          <Typography variant="h5" sx={{ marginBottom: 2 }}>
                            {selectedService.Room_Type}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ marginBottom: 2, color: "#808080" }}
                          >
                            {t("")}
                          </Typography>
                          <Typography variant="body1" sx={{ color: "#ff0000" }}>
                            {/* ข้อมูลที่ต้องการแสดง */}
                          </Typography>
                          {/* ตำแหน่งส่วนที่ต้องการแสดงเพิ่มเติม */}
                        </Grid>
                        <Grid item lg={6}>
                          {/* ส่วนอื่น ๆ ที่ต้องการแสดง เช่น รายละเอียดเพิ่มเติม */}
                        </Grid>
                      </Grid>
                    </CardContent>
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

export default ServicesRoomsDetail;
