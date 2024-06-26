import { Card, CardContent, CardMedia, Grid, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, token } from "constants/constants";
import { useTranslation } from "react-i18next";

function PackageListHome() {
  const { t } = useTranslation();
  const [packageData, setPackageData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/showRandomPackages`, {
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
        } else {
          console.log();
        }
      } catch (error) {
        console.log();
      }
    };

    fetchData();
  }, []);
  const packagesAll = () => {
    window.location.href = "/packages";
  };
  const packagesDetail = (code) => {
    window.location.href = `/packagesdetail/${code}`;
  };

  return (
    <Grid item>
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
        {t("recommended_package")}
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
          marginTop: "2%",
        }}
      >
        {packageData.map((packageItem) => {
          const promoEndDate = new Date(packageItem.promoEndDate);
          const currentDate = new Date();

          if (promoEndDate >= currentDate) {
            return (
              <Grid item key={packageItem.packageCode} xs={11} md={3}>
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 450,
                    minWidth: 100,
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
                    sx={{
                      objectFit: "fill",
                    }}
                  />
                  <CardContent>
                    <Typography
                      sx={{
                        color: "#0bb288",
                        fontSize: "17px",
                        fontWeight: "bold",
                      }}
                      body1="span"
                    >
                      {packageItem.packageName}
                    </Typography>
                    <Typography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                      {packageItem.packageNameEN}
                    </Typography>
                    <Typography sx={{ borderBottom: "2px solid #0bb288", width: "40px" }} />
                    <Typography
                      sx={{ color: "#808080", fontSize: "10px" }}
                      mt={0}
                      dangerouslySetInnerHTML={{ __html: packageItem.packagesDetail }}
                    />
                    <Typography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                      {packageItem.packageContact}
                    </Typography>
                    <Typography sx={{ color: "#808080", fontSize: "12px" }} mt={2}>
                      {t("price")}:{" "}
                      <span style={{ color: "#ff0000", fontSize: "14px" }}>
                        {packageItem.packagePrice} ฿
                      </span>
                    </Typography>
                    <Typography sx={{ color: "#808080", fontSize: "12px" }} mt={1}>
                      {t("expiration_date")}:
                      <span style={{ color: "#ff0000", fontSize: "14px" }}>
                        {new Date(packageItem.promoEndDate).toLocaleDateString()}
                      </span>
                    </Typography>
                    <Typography
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
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          } else {
            // ถ้า promoEndDate น้อยกว่าเวลาปัจจุบัน ไม่แสดงอะไรเลย
            return null;
          }
        })}
      </Grid>
      <Grid item style={{ textAlign: "center", marginTop: "20px" }}>
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
          {t("view_all_packages")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default PackageListHome;
