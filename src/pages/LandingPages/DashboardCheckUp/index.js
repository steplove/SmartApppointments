import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Hidden, Box, Divider } from "@mui/material";
import PropTypes from "prop-types";
import MenuListCheckup from "../MenuListCheckup";
import { BASE_URL } from "constants/constants";
import useTokenCheck from "hooks/useTokenCheck";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import Banner from "components/Banner";
import { useTranslation } from "react-i18next";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
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
const slides = [];
function DashboardCheckup() {
  const { t } = useTranslation();
  const [, HN] = useTokenCheck();
  const filename = HN;
  const [filteredFiles, setFilteredFiles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // เรียก API เพื่อดึงรายชื่อไฟล์ทั้งหมด
        const response = await axios.get(BASE_URL + "/api/get-all-pdfs", {
          timeout: 10000, // 10 วินาที timeout (ปรับตามความเหมาะสม)
        });

        // กรองไฟล์ที่ตรงกับเงื่อนไข
        const filtered = response.data.files.filter((file) => {
          // ตรวจสอบว่าไฟล์เริ่มต้นด้วย HN
          return file.startsWith(`${filename}_`);
        });

        setFilteredFiles(filtered);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("คำขอถูกยกเลิก:", error.message);
        } else {
          console.error("ข้อผิดพลาด:", error.message);
        }
      }
    };

    fetchData();

    return () => {
      // ยกเลิกการร้องขอเมื่อ component unmount (ถ้าต้องการ)
    };
  }, [filename]);

  const handleDownload = (filename) => {
    // สร้างลิงก์
    const downloadLink = document.createElement("a");
    downloadLink.href = `${BASE_URL}/api/download-pdf/${filename}`;
    downloadLink.target = "_blank"; // เปิดในแท็บใหม่
    downloadLink.download = filename;

    // โปรแกรมคลิกลิงก์
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  const [openLoad, setopenLoad] = useState(false);
  useEffect(() => {
    // ทำการ render หน้าเว็บใหม่
    if (HN) {
      setopenLoad(true);
    }
  }, [HN]);
  const ButtonWithHover = ({ file }) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
      setHovered(true);
    };

    const handleMouseLeave = () => {
      setHovered(false);
    };

    return (
      <div key={file} style={{ marginTop: 2 }}>
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundColor: hovered ? "purple" : "#0bb288",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
          onClick={() => handleDownload(file)}
        >
          <span style={{ marginRight: "5px" }}>{t("Download")}</span>
          <CloudDownloadIcon />
        </button>
      </div>
    );
  };
  ButtonWithHover.propTypes = {
    file: PropTypes.string.isRequired,
  };

  if (!openLoad) {
    return (
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Grid>
          <Grid style={{ textAlign: "center" }}>
            <CircularProgress color="primary" />
          </Grid>
          <span style={{ margin: "10px", color: "#333" }}>Loading HomePage...</span>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid>
      <MenuListCheckup />
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Box
            p={2}
            style={{
              backgroundColor: "#f5f5f5",
              minHeight: "calc(50vh - 56px - 32px)",
              marginBottom: "0px",
            }}
          >
            <Grid item container spacing={2} mt={2}>
              <Grid item xs={12} md={12}>
                <Card sx={{ marginBottom: "0px", maxWidth: "70%", mx: "auto" }}>
                  <MKBox>
                    <Banner slides={slides} />
                  </MKBox>
                </Card>
              </Grid>
              <Card sx={{ marginBottom: "0px", maxWidth: "70%", mx: "auto", width: "100%", mt: 3 }}>
                <Grid
                  item
                  sx={{
                    maxWidth: "100%",
                    mx: "auto",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Grid item sm={12} md={12} lg={12} sx={{ backgroundColor: "#ffffff" }}>
                    <CardContent>
                      <Typography variant="h6" color="primary">
                        {t("checkUP_result_transactions")}
                      </Typography>
                      <Divider style={{ margin: "10px 0" }} />
                      {filteredFiles.length === 0 ? (
                        <Typography variant="h6" color="textSecondary">
                          {t("no_information_found")}
                        </Typography>
                      ) : (
                        <table className="table table-striped">
                          <thead>
                            <tr className="text-center">
                              <th>{t("No")}</th>
                              <th>{t("date")}</th>
                              <th>{t("Download")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredFiles.map((file, index) => {
                              const dateMatch = file.match(/_(\d{2})(\d{2})(\d{4})/); // ค้นหาวันที่ในรูปแบบ DDMMYYYY

                              let listItemContent;
                              if (dateMatch) {
                                const day = dateMatch[1];
                                const month = dateMatch[2];
                                const year = dateMatch[3];

                                // แปลงเป็นรูปแบบวันที่ไทย
                                const thaiDate = `${day}/${month}/${parseInt(year, 10)}`;

                                listItemContent = (
                                  <React.Fragment>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{thaiDate}</td>
                                    <td className="text-center">
                                      <ButtonWithHover file={file} />
                                    </td>
                                  </React.Fragment>
                                );
                              } else {
                                // กรณีไม่พบวันที่ที่ถูกต้องในชื่อไฟล์
                                listItemContent = (
                                  <React.Fragment>
                                    <td colSpan="3">วันที่: ไม่สามารถระบุได้</td>
                                  </React.Fragment>
                                );
                              }

                              return <tr key={index}>{listItemContent}</tr>;
                            })}
                          </tbody>
                        </table>
                      )}
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Box>
          <MKBox pt={6} px={1} mt={6}>
            <DefaultFooter content={footerRoutes} stiky />
          </MKBox>
          <br />
          <br />
        </Hidden>
        {/* Mobile View */}
        <Hidden smUp>
          <Box
            p={2}
            style={{
              backgroundColor: "#f5f5f5",
              minHeight: "calc(50vh - 56px - 32px)",
              marginBottom: "0px",
            }}
          >
            <Typography variant="h4" style={{ margin: "0", color: "#3f51b5" }}>
              {t("checkUP_result_transactions")}
            </Typography>
            <Grid item container spacing={2} mt={2}>
              <Card sx={{ marginBottom: "0px", maxWidth: "100%", mx: "auto" }}>
                <MKBox>
                  <Banner slides={slides} />
                </MKBox>
              </Card>
              <Grid item xs={12} sx={{ backgroundColor: "#ffffff" }}>
                <CardContent>
                  {filteredFiles.length === 0 ? (
                    <Typography variant="h6" color="textSecondary">
                      {t("no_information_found")}
                    </Typography>
                  ) : (
                    <table className="table table-striped">
                      <thead>
                        <tr className="text-center" style={{ fontSize: "0.8rem" }}>
                          <th>{t("No")}</th>
                          <th>{t("date")}</th>
                          <th>{t("Download")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFiles.map((file, index) => {
                          const dateMatch = file.match(/_(\d{2})(\d{2})(\d{4})/); // ค้นหาวันที่ในรูปแบบ DDMMYYYY

                          let listItemContent;
                          if (dateMatch) {
                            const day = dateMatch[1];
                            const month = dateMatch[2];
                            const year = dateMatch[3];

                            // แปลงเป็นรูปแบบวันที่ไทย
                            const thaiDate = `${day}/${month}/${parseInt(year, 10)}`;

                            listItemContent = (
                              <React.Fragment>
                                <td
                                  className="text-center"
                                  style={{ fontSize: "0.8rem", width: "20%" }}
                                >
                                  {index + 1}
                                </td>
                                <td className="text-center" style={{ fontSize: "0.8rem" }}>
                                  {thaiDate}
                                </td>
                                <td className="text-center" style={{ fontSize: "0.8rem" }}>
                                  <ButtonWithHover file={file} />
                                </td>
                              </React.Fragment>
                            );
                          } else {
                            // กรณีไม่พบวันที่ที่ถูกต้องในชื่อไฟล์
                            listItemContent = (
                              <React.Fragment>
                                <td colSpan="3">วันที่: ไม่สามารถระบุได้</td>
                              </React.Fragment>
                            );
                          }

                          return <tr key={index}>{listItemContent}</tr>;
                        })}
                      </tbody>
                    </table>
                  )}
                </CardContent>
              </Grid>
            </Grid>
          </Box>
        </Hidden>
      </ThemeProvider>

      {/* <Foots /> */}
    </Grid>
  );
}

export default DashboardCheckup;
