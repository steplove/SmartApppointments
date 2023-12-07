import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import { useParams } from "react-router-dom";
import { BASE_URL } from "constants/constants";

function PackagesDetail() {
  const { code } = useParams();
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("1");
        const response = await fetch(`${BASE_URL}/api/searchPackageDetail/${code}`);
        console.log("2");
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();

        const promoEndDate = new Date(data.promoEndDate).toLocaleDateString();

        // อัพเดต state ด้วยข้อมูลที่แปลงแล้ว
        setSelectedPackage({ ...data, promoEndDate });
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [code]);

  return (
    <>
      <Container maxWidth="md" sx={{ paddingTop: 4, paddingBottom: 4 }}>
        {selectedPackage ? (
          <>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
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
                        <Typography variant="subtitle1" sx={{ marginBottom: 2, color: "#808080" }}>
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
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default PackagesDetail;
