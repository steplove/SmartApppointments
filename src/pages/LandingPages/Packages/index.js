import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, CardMedia, Grid, Hidden } from "@mui/material";
import MKTypography from "components/MKTypography";
import DefaultFooter from "examples/Footers/DefaultFooter";
import MKBox from "components/MKBox";
import footerRoutes from "footer.routes";
import useFetch from "hooks/useFetch";
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
function Packages() {
  const { data: fetchedPackages = [] } = useFetch(`${BASE_URL}/api/showPackages`);
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    if (fetchedPackages && Array.isArray(fetchedPackages)) {
      const updatedPackageData = fetchedPackages.map((packageItem) => {
        const packagePriceInt = parseInt(packageItem.packagePrice, 10);
        const formattedPackagePrice = packagePriceInt.toLocaleString("th-TH");

        return {
          ...packageItem,
          formattedPackagePrice: formattedPackagePrice,
        };
      });

      setPackageData(updatedPackageData);
    } else {
      console.error("Error fetching packages");
    }
  }, [fetchedPackages]);
  const packagesDetail = (code) => {
    window.location.href = `/packagesdetail/${code}`;
  };
  return (
    <>
      <DefaultNavbar routes={routes} sticky relative />
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Container maxWidth="md" sx={{ paddingTop: "1%", paddingBottom: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <a href="/" style={{ color: "#808080", fontSize: "1.0rem" }}>
                  หน้าแรก/
                </a>
                <a href="/packages" style={{ color: "#0bb288", fontSize: "1.0rem" }}>
                  แพ็คเกจทั้งหมด
                </a>
              </Grid>
            </Grid>
            {/* <Typography variant="h4" sx={{ marginBottom: 2 }}>
              รายละเอียดแพ็คเกจ
            </Typography> */}

            <Grid container spacing={2} style={{ margin: "0 auto" }}>
              {packageData.map((packageItem) => (
                <Grid item key={packageItem.id} xs={12} md={4}>
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
                      image={`${BASE_URL}/${packageItem.packageImgBanner}`}
                      alt="รายละเอียดรูปภาพ"
                    />
                    <CardContent>
                      <MKTypography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                        {packageItem.packageName}
                      </MKTypography>
                      <MKTypography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                        {packageItem.packageNameEN}
                      </MKTypography>
                      <MKTypography sx={{ borderBottom: "2px solid #0bb288", width: "40px" }} />
                      <MKTypography sx={{ color: "#808080", fontSize: "10px" }} mt={0}>
                        {packageItem.packagesDetail}
                      </MKTypography>
                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                        {packageItem.packageContact}
                      </MKTypography>
                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                        ราคา:{" "}
                        <span style={{ color: "#ff0000", fontSize: "14px" }}>
                          {packageItem.formattedPackagePrice}
                        </span>
                      </MKTypography>

                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={1}>
                        ระยะเวลาโปรโมชั่น:
                        <span style={{ color: "#ff0000", fontSize: "14px" }}>
                          {new Date(packageItem.promoEndDate).toLocaleDateString()}
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
                        onClick={() => packagesDetail(packageItem.packageCode)}
                      >
                        ดูรายละเอียด
                      </MKTypography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
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
                <a href="/" style={{ color: "#808080", fontSize: "0.8rem" }}>
                  หน้าแรก/
                </a>
                <a href="/packages" style={{ color: "#0bb288", fontSize: "0.8rem" }}>
                  แพ็คเกจทั้งหมด
                </a>
              </Grid>
            </Grid>

            <Grid container spacing={2} style={{ margin: "0 auto" }}>
              {packageData.map((packageItem) => (
                <Grid item key={packageItem.id} xs={11} md={4}>
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
                      image={`${BASE_URL}/${packageItem.packageImgBanner}`}
                      alt="รายละเอียดรูปภาพ"
                    />
                    <CardContent>
                      <MKTypography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                        {packageItem.packageName}
                      </MKTypography>
                      <MKTypography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                        {packageItem.packageNameEN}
                      </MKTypography>
                      <MKTypography sx={{ borderBottom: "2px solid #0bb288", width: "40px" }} />
                      <MKTypography sx={{ color: "#808080", fontSize: "10px" }} mt={0}>
                        {packageItem.packagesDetail}
                      </MKTypography>
                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                        {packageItem.packageContact}
                      </MKTypography>
                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                        ราคา:{" "}
                        <span style={{ color: "#ff0000", fontSize: "14px" }}>
                          {packageItem.formattedPackagePrice}
                        </span>
                      </MKTypography>
                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={1}>
                        ระยะเวลาโปรโมชั่น:
                        <span style={{ color: "#ff0000", fontSize: "14px" }}>
                          {new Date(packageItem.promoEndDate).toLocaleDateString()}
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
                        onClick={() => packagesDetail(packageItem.packageCode)}
                      >
                        ดูรายละเอียด
                      </MKTypography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <MKBox pt={6} px={1} mt={6}>
              <DefaultFooter content={footerRoutes} />
            </MKBox>
          </Container>
        </Hidden>
      </ThemeProvider>
    </>
  );
}

export default Packages;
