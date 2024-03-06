import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Hidden,
  Box,
  Divider,
  // Paper,
} from "@mui/material";
import PropTypes from "prop-types";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ListAltIcon from "@mui/icons-material/ListAlt";
// import CalendarComponent from "components/CalendarComponent";
// import Foots from "components/Foot";
import MenuListCheckup from "../MenuListCheckup";
import { BASE_URL } from "constants/constants";
// import useFetch from "hooks/useFetch";
import useTokenCheck from "hooks/useTokenCheck";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import Banner from "components/Banner";
// import MKTypography from "components/MKTypography";
import { useTranslation } from "react-i18next";
// import DownloadPDFButton from "../DownloadPDFButton";
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
  // const [openDialog, setOpenDialog] = useState(false);

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };
  // const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);

  useEffect(() => {
    // เรียก API เพื่อดึงรายชื่อไฟล์ทั้งหมด
    axios
      .get(BASE_URL + "/api/get-all-pdfs")
      .then((response) => {
        // setFiles(response.data.files);
        // กรองไฟล์ที่ตรงกับเงื่อนไข
        const filtered = response.data.files.filter((file) => file.startsWith(HN));
        setFilteredFiles(filtered);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, []);

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
      <li key={file} style={{ marginTop: 2 }}>
        {file}{" "}
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundColor: hovered ? "purple" : "red",
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
          Download
        </button>
      </li>
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
              <Card sx={{ maxWidth: "100%", mx: "auto", marginTop: "10px" }}>
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
                  <Grid item xs={12} md={12}>
                    <Card style={{ backgroundColor: "#ffffff" }}>
                      <CardContent>
                        <Typography variant="h6" color="primary">
                          {t("checkUP_result_transactions")}
                        </Typography>
                        <Divider style={{ margin: "10px 0" }} />
                        {filteredFiles.length === 0 ? (
                          <Typography variant="body2" color="textSecondary">
                            {t("no_information_found")}
                          </Typography>
                        ) : (
                          <ul>
                            {filteredFiles.map((file, index) => (
                              <ButtonWithHover key={index} file={file} />
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                  {/* <Grid item xs={12} md={12}>
                    <h1>{t("checkUP_result_transactions")}</h1>
                    <ul>
                      {filteredFiles.map((file, index) => (
                        <ButtonWithHover key={index} file={file} />
                      ))}
                    </ul>
                  </Grid> */}
                </Grid>
              </Card>
            </Grid>
            {/* <DownloadPDFButton /> */}
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
            <Typography variant="h4" style={{ margin: "0", color: "#3f51b5" }}></Typography>
            <Grid item container spacing={2} mt={2}>
              <Card>
                <MKBox sx={{ marginBottom: "0px", maxWidth: "100%", mx: "auto" }}>
                  <Banner slides={slides} />
                </MKBox>
              </Card>
              <Grid item xs={12} md={6}>
                <Card style={{ backgroundColor: "#ffffff" }}>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      <ListAltIcon style={{ verticalAlign: "middle", marginRight: 10 }} />
                      {t("latest_appointment_list")}
                    </Typography>
                    <Divider style={{ margin: "10px 0" }} />
                    {filteredFiles.length === 0 ? (
                      <Typography variant="body2" color="textSecondary">
                        {t("no_information_found")}
                      </Typography>
                    ) : (
                      <ul>
                        {filteredFiles.map((file, index) => (
                          <ButtonWithHover key={index} file={file} />
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
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
