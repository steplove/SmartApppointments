import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, CardMedia, Grid, Hidden } from "@mui/material";
import MKTypography from "components/MKTypography";
import DefaultFooter from "examples/Footers/DefaultFooter";
import MKBox from "components/MKBox";
import footerRoutes from "footer.routes";
import useFetch from "hooks/useFetch";
import { BASE_URL, token } from "constants/constants";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { useTranslation } from "react-i18next";
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
function MedicalServiceCenter() {
  const { t } = useTranslation();
  const { data: fetchedPackages = [] } = useFetch(`${BASE_URL}/api/showPackages`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const [packageData, setPackageData] = useState([]);
  console.log(packageData);
  useEffect(() => {
    if (fetchedPackages && Array.isArray(fetchedPackages)) {
      setPackageData(fetchedPackages);
    } else {
      console.error("Error fetching packages");
    }
  }, [fetchedPackages]);
  const packagesDetail = (code) => {
    window.location.href = `/packagesdetail/${code}`;
  };
  return (
    <Grid>
      <DefaultNavbar routes={routes} sticky relative />
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Container maxWidth="md" sx={{ paddingTop: "1%", paddingBottom: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <a href="/presentation" style={{ color: "#808080", fontSize: "1.0rem" }}>
                  {t("home")}/
                </a>
                <a href="/packages" style={{ color: "#0bb288", fontSize: "1.0rem" }}>
                  {t("medical_service_center")}
                </a>
              </Grid>
            </Grid>
            {/* <Typography variant="h4" sx={{ marginBottom: 2 }}>
              รายละเอียดแพ็คเกจ
            </Typography> */}

            <Grid container spacing={2} style={{ margin: "0 auto" }}>
              <Grid item xs={12} md={4}>
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
                    // image={`${BASE_URL}/${}`}
                    alt="รายละเอียดรูปภาพ"
                  />
                  <CardContent>
                    <MKTypography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                      {}
                    </MKTypography>
                    <MKTypography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                      {/* {EN} */}
                    </MKTypography>
                    <MKTypography sx={{ borderBottom: "2px solid #0bb288", width: "40px" }} />
                    <MKTypography sx={{ color: "#808080", fontSize: "10px" }} mt={0}>
                      {}
                    </MKTypography>
                    <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                      {}
                    </MKTypography>
                    <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                      {t("price")}: <span style={{ color: "#ff0000", fontSize: "14px" }}>{}</span>
                    </MKTypography>

                    <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={1}>
                      {t("expiration_date")}:
                      <span style={{ color: "#ff0000", fontSize: "14px" }}>
                        {new Date().toLocaleDateString()}
                      </span>
                    </MKTypography>
                    <MKTypography
                      sx={{
                        color: "#0bb288",
                        fontSize: "15px",
                        textAlign: "center",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => packagesDetail()}
                    >
                      {t("view_details")}
                    </MKTypography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <MKBox pt={6} px={1} mt={6}>
              <DefaultFooter content={footerRoutes} />
            </MKBox>
          </Container>
        </Hidden>
        {/* Mobile View */}
        <Hidden smUp>
          <Container maxWidth="md" sx={{ paddingTop: "1%", paddingBottom: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <a href="/presentation" style={{ color: "#808080", fontSize: "0.8rem" }}>
                  {t("home")}/
                </a>
                <a href="/packages" style={{ color: "#0bb288", fontSize: "0.8rem" }}>
                  {t("all_packages")}
                </a>
              </Grid>
            </Grid>

            <Grid container spacing={2} style={{ margin: "0 auto" }}>
              <Grid item xs={11} md={4}>
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 400,
                    minHeight: 400,
                    margin: "0 5px",
                    marginBottom: "20px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    // image={`${BASE_URL}/${}`}
                    alt="รายละเอียดรูปภาพ"
                  />
                  <CardContent>
                    <MKTypography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                      {}
                    </MKTypography>
                    <MKTypography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                      {/* {EN} */}
                    </MKTypography>
                    <MKTypography sx={{ borderBottom: "2px solid #0bb288", width: "40px" }} />
                    <MKTypography sx={{ color: "#808080", fontSize: "10px" }} mt={0}>
                      {}
                    </MKTypography>
                    <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                      {}
                    </MKTypography>
                    <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                      {t("price")}: <span style={{ color: "#ff0000", fontSize: "14px" }}>{}</span>
                    </MKTypography>
                    <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={1}>
                      {t("expiration_date")}:
                      <span style={{ color: "#ff0000", fontSize: "14px" }}>
                        {new Date().toLocaleDateString()}
                      </span>
                    </MKTypography>
                    <MKTypography
                      sx={{
                        color: "#0bb288",
                        fontSize: "15px",
                        textAlign: "center",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => packagesDetail()}
                    >
                      {t("view_details")}
                    </MKTypography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <MKBox pt={6} px={1} mt={6}>
              <DefaultFooter content={footerRoutes} />
            </MKBox>
          </Container>
        </Hidden>
      </ThemeProvider>
    </Grid>
  );
}

export default MedicalServiceCenter;
