import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, CardMedia, Grid, Hidden } from "@mui/material";
import MKTypography from "components/MKTypography";
import DefaultFooter from "../../../../../src/lineliff_files/examples/Footers/DefaultFooter";
import MKBox from "components/MKBox";
import footerRoutes from "../../../../../src/lineliff_files/footer.routes";
import axios from "axios";
import { BASE_URL, token } from "constants/constants";
import DefaultNavbar from "../../../../../src/lineliff_files/examples/Navbars/DefaultNavbar";
import routes from "../../../../../src/lineliff_files/routes";
import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
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
  const { t } = useTranslation();
  const [packageData, setPackageData] = useState([]);
  const [openLoad, setopenLoad] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/showPackages`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          const updatedPackageData = response.data.map((packageItem) => {
            const packagePriceInt = parseInt(packageItem.packagePrice, 10);
            const formattedPackagePrice = packagePriceInt.toLocaleString("th-TH");

            return {
              ...packageItem,
              formattedPackagePrice: formattedPackagePrice,
            };
          });

          setPackageData(updatedPackageData);
          setopenLoad(true);
        } else {
          console.error("Error fetching packages");
        }
      } catch (error) {
        console.error("Error fetching packages:", error.message);
      }
    };

    fetchData();
  }, []);
  const packagesDetail = (code) => {
    window.location.href = `/liff/packagesdetail/${code}`;
  };

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
      <DefaultNavbar routes={routes} sticky relative />
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Container maxWidth="md" sx={{ paddingTop: "1%", paddingBottom: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <a href="/liff/presentation" style={{ color: "#808080", fontSize: "1.0rem" }}>
                  {t("home")}/
                </a>
                <a href="/liff/packages" style={{ color: "#0bb288", fontSize: "1.0rem" }}>
                  {t("all_packages")}
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
                      image={`${packageItem.packageImgBanner}`}
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
                      <MKTypography
                        sx={{ color: "#808080", fontSize: "10px" }}
                        mt={0}
                        dangerouslySetInnerHTML={{ __html: packageItem.packagesDetail }}
                      />
                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                        {packageItem.packageContact}
                      </MKTypography>
                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                        {t("price")}:{" "}
                        <span style={{ color: "#ff0000", fontSize: "14px" }}>
                          {packageItem.packagePrice}
                        </span>
                      </MKTypography>

                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={1}>
                        {t("expiration_date")}:
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
                        {t("view_details")}
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
                <a href="/liff/presentation" style={{ color: "#808080", fontSize: "0.8rem" }}>
                  {t("home")}/
                </a>
                <a href="/liff/packages" style={{ color: "#0bb288", fontSize: "0.8rem" }}>
                  {t("all_packages")}
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
                      image={`${packageItem.packageImgBanner}`}
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
                      <MKTypography
                        sx={{ color: "#808080", fontSize: "10px" }}
                        mt={0}
                        dangerouslySetInnerHTML={{ __html: packageItem.packagesDetail }}
                      />
                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                        {packageItem.packageContact}
                      </MKTypography>
                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                        {t("price")}:{" "}
                        <span style={{ color: "#ff0000", fontSize: "14px" }}>
                          {packageItem.packagePrice} ฿
                        </span>
                      </MKTypography>
                      <MKTypography sx={{ color: "#808080", fontSize: "12px" }} mt={1}>
                        {t("expiration_date")}:
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
                        {t("view_details")}
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
    </Grid>
  );
}

export default Packages;
