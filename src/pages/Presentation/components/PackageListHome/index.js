import { Card, CardContent, CardMedia, Grid, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import MKTypography from "components/MKTypography";
import useFetch from "hooks/useFetch";
import { BASE_URL } from "constants/constants";

function PackageListHome() {
  const { data: fetchedPackages = [], error } = useFetch(`${BASE_URL}/api/showRandomPackages`);
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
      console.error("Error fetching packages", error);
    }
  }, [fetchedPackages]);
  const packagesAll = () => {
    window.location.href = "/packages";
  };
  const packagesDetail = (code) => {
    window.location.href = `/packagesdetail/${code}`;
  };

  return (
    <>
      <span
        style={{
          variant: "button",
          fontWeight: "bold",
          textTransform: "capitalize",
          marginBottom: "1px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "25px",
        }}
      >
        แพ็กเกจแนะนำ
        <span style={{ borderBottom: "2px solid #0bb288", width: "40px" }}></span>
      </span>

      <Grid
        container
        item
        xs={12}
        md={6}
        lg={12}
        spacing={2}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        {packageData.map((packageItem) => (
          <Card
            key={packageItem.packageCode}
            sx={{
              width: "100%", // ทำให้ Card มีความกว้างเต็มตาม container
              height: "100%",
              display: "flex", // ทำให้ Card เป็น flex container
              flexDirection: "column", // ให้ข้อมูลภายใน Card เรียงตั้งฉาก
              maxWidth: 450, // หากต้องการกำหนดขนาดมากสุดสำหรับ Card
              minHeight: 400,
              margin: "0 5px",
              marginBottom: "20px", // เพิ่มขีดเส้นระหว่าง Card
            }}
          >
            <CardMedia
              component="img"
              height="150"
              image={`${BASE_URL}/${packageItem.packageImgBanner}`}
              alt="รายละเอียดรูปภาพ"
            />
            <CardContent>
              <MKTypography
                sx={{
                  color: "#0bb288",
                  fontSize: "17px",
                  fontWeight: "bold",
                }}
              >
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
        ))}
      </Grid>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          xs={12}
          sx={{
            color: "#FFFFFF",
            background: "#0bb288",
            fontSize: "12px",
            minHeight: "20px", // ปรับขนาดตามที่คุณต้องการ
          }}
          onClick={packagesAll}
        >
          ดูแพ็กเกจทั้งหมด
        </Button>
      </div>
    </>
  );
}

export default PackageListHome;
