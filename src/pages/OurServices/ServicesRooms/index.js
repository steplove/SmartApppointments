import React, { useState, useEffect } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Grid, Hidden } from "@mui/material";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import MKTypography from "components/MKTypography";
import routes from "routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
// import NavbarsAboutUs from "../Navbars";
import { BASE_URL } from "constants/constants";
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
function ServicesRoom() {
  const { t } = useTranslation();
  const [typeRoomData, setTypeRoomData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/showBannerTypeRoom`);
      const fetchedTypeRoom = response.data;

      if (Array.isArray(fetchedTypeRoom)) {
        const filteredTypeRoomData = fetchedTypeRoom.filter(
          (packageItem) =>
            packageItem.Image_Room_Type !== null &&
            packageItem.Image_Room_Type !== undefined &&
            packageItem.Image_Room_Type !== ""
        );

        const updatedTypeRoomData = filteredTypeRoomData.map((packageItem) => {
          const packagePriceInt = parseInt(packageItem.packagePrice, 10);
          const formattedTypeRoomPrice = packagePriceInt.toLocaleString("th-TH");

          return {
            ...packageItem,
            formattedTypeRoomPrice: formattedTypeRoomPrice,
          };
        });

        setTypeRoomData(updatedTypeRoomData);
      } else {
        console.error("Error fetching packages");
      }
    } catch (error) {
      console.error("Error fetching packages:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const servicesDetail = (code) => {
    window.location.href = `/ServicesRoomsDetail/${code}`;
  };
  const [openLoad, setopenLoad] = useState(false);
  useEffect(() => {
    if (typeRoomData) {
      // ทำการ render หน้าเว็บใหม่
      setopenLoad(true);
    }
  }, [typeRoomData]);
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
    <>
      <DefaultNavbar routes={routes} sticky relative />
      {/* <NavbarsAboutUs /> */}
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Container maxWidth="md" sx={{ paddingTop: "0%", paddingBottom: 4 }}>
            <Grid>
              <Typography sx={{ marginBottom: 2, fontSize: "1.5rem" }}></Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <a href="/" style={{ color: "#808080", fontSize: "1rem" }}>
                    {t("home")}/
                  </a>
                  <a href="/ServicesRooms" style={{ color: "#0bb288", fontSize: "1rem" }}>
                    <span>{t("room_services")}</span>
                  </a>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item lg={12}>
                  <Typography
                    style={{
                      variant: "button",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      marginBottom: "10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      fontSize: "30px",
                      color: "#562170",
                    }}
                  >
                    <span style={{ borderBottom: "2px solid #d1c398" }}> {t("room_services")}</span>
                  </Typography>
                  <Grid container spacing={2} style={{ margin: "0 auto" }}>
                    {typeRoomData.map((typeItem) => (
                      <Grid item key={typeItem.Image_UID} xs={12} md={4}>
                        <Card
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: 450,
                            minHeight: 400,
                            margin: "0 5px",
                            marginBottom: "20px",
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="150"
                            alt="รายละเอียดรูปภาพ"
                            image={`${BASE_URL}/${typeItem.image}`}
                          />
                          <CardContent>
                            <MKTypography
                              sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}
                              dangerouslySetInnerHTML={{ __html: typeItem.Image_Room_Type }}
                            />

                            <MKTypography
                              sx={{
                                color: "#808080",
                                fontSize: "12px",
                                lineHeight: 0.5,
                                marginTop: "10px",
                              }}
                              dangerouslySetInnerHTML={{ __html: typeItem.Room_Detail }}
                            />

                            <MKTypography
                              sx={{
                                color: "#0bb288",
                                fontSize: "15px",
                                textAlign: "center",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                              onClick={() => servicesDetail(typeItem.Image_Room_Type)}
                            >
                              {t("view_details")}
                            </MKTypography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <Container maxWidth="md" sx={{ paddingTop: "0%", paddingBottom: 4 }}>
            <Grid>
              <Typography sx={{ marginBottom: 2, fontSize: "1.5rem" }}></Typography>
              <Grid container justifyContent="center">
                {typeRoomData.map((typeItem) => (
                  <Grid item key={typeItem.Image_UID} lg={12}>
                    <Typography
                      style={{
                        variant: "button",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        marginBottom: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: "30px",
                        color: "#562170",
                      }}
                    >
                      <span style={{ borderBottom: "2px solid #d1c398" }}>
                        {" "}
                        {t("room_services")}
                      </span>
                    </Typography>
                    <Card>
                      <CardMedia
                        component="img"
                        height="150"
                        alt="รายละเอียดรูปภาพ"
                        image={`${BASE_URL}/${typeItem.image}`}
                      />
                      <CardContent>
                        <MKTypography
                          sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}
                          dangerouslySetInnerHTML={{ __html: typeItem.Image_Room_Type }}
                        />
                        <MKTypography
                          sx={{ color: "#808080", fontSize: "12px" }}
                          dangerouslySetInnerHTML={{ __html: typeItem.Room_Detail }}
                        />

                        <MKTypography
                          sx={{
                            color: "#0bb288",
                            fontSize: "15px",
                            textAlign: "center",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => servicesDetail(typeItem.Image_Room_Type)}
                        >
                          {t("view_details")}
                        </MKTypography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Container>
        </Hidden>
      </ThemeProvider>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default ServicesRoom;
