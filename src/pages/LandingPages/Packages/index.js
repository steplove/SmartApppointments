import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import MKTypography from "components/MKTypography";
import DefaultFooter from "examples/Footers/DefaultFooter";
import MKBox from "components/MKBox";
import footerRoutes from "footer.routes";
import useFetch from "hooks/useFetch";
import { BASE_URL } from "constants/constants";

function Packages() {
  const { data: fetchedPackages = [] } = useFetch(`${BASE_URL}/api/showPackages`);
  const [packageData, setPackageData] = useState([]);

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
    <>
      <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <a href="/" style={{ color: "#808080" }}>
              หน้าแรก/
            </a>
            <a href="/" style={{ color: "#0bb288" }}>
              แพ็คเกจทั้งหมด
            </a>
          </Grid>
        </Grid>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          รายละเอียดแพ็คเกจ
        </Typography>

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
                      {packageItem.packagePrice}
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
    </>
  );
}

export default Packages;
