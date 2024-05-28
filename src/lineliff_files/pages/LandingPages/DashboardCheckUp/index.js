import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Hidden, Box, Divider } from "@mui/material";
import MenuListCheckup from "../../../../../src/lineliff_files/pages/LandingPages/MenuListCheckup";
import { BASE_URL, token } from "constants/constants";
import useTokenCheck from "hooks/useTokenCheck";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DefaultFooter from "../../../../../src/lineliff_files/examples/Footers/DefaultFooter";
import footerRoutes from "../../../../../src/lineliff_files/footer.routes";
import MKBox from "components/MKBox";
import Banner from "components/Banner";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ButtonWithHover from "./ButtonWithHover";
import iconPDF from "assets/images/iconPDF.png";
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
  const [filteredFilesRec, setFilteredFilesRec] = useState([]);
  const fetchData = async () => {
    try {
      // เรียก API เพื่อดึงรายชื่อไฟล์ทั้งหมด
      const response = await axios.get(
        BASE_URL + "/api/get-all-pdfs",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
        {
          timeout: 10000, // 10 วินาที timeout (ปรับตามความเหมาะสม)
        }
      );

      // กรองไฟล์ที่ตรงกับเงื่อนไข
      const filtered = response.data.files.filter((file) => {
        // ตรวจสอบว่าไฟล์เริ่มต้นด้วยชื่อไฟล์และไม่มีคำว่า rec
        return file.startsWith(`${filename}_`) && !file.includes("rec");
      });

      const filteredRec = response.data.files.filter((file) => {
        // ตรวจสอบว่าไฟล์เริ่มต้นด้วยชื่อไฟล์และมีคำว่า rec
        return file.startsWith(`${filename}_`) && file.includes("rec");
      });

      setFilteredFiles(filtered);
      setFilteredFilesRec(filteredRec);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error("คำขอถูกยกเลิก:", error.message);
      } else {
        console.error("ข้อผิดพลาด:", error.message);
      }
    }
  };
  useEffect(() => {
    if (HN) {
      setopenLoad(true);
    }
    fetchData();
  }, [HN]);

  const [openLoad, setopenLoad] = useState(false);
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
                      {filteredFiles && filteredFiles.length === 0 ? (
                        <Typography variant="h6" color="textSecondary">
                          {t("no_information_found")}
                        </Typography>
                      ) : (
                        <table className="table table-striped">
                          <thead>
                            <tr className="text-center">
                              <th>{t("No")}</th>
                              <th>{t("date")}</th>
                              <th>ชนิดไฟล์</th>
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
                                  <React.Fragment key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{thaiDate}</td>
                                    <td className="text-center">
                                      <img
                                        src={iconPDF}
                                        alt="iconPDF"
                                        style={{
                                          width: "50px", // ปรับขนาดของรูปภาพตามที่คุณต้องการ
                                          height: "auto", // คุณสามารถปรับแต่งความสูงตามที่คุณต้องการ
                                          margin: "0 auto", // จัดให้อยู่ตรงกลางแนวนอน
                                        }}
                                      />
                                    </td>
                                    <td className="text-center">
                                      <ButtonWithHover file={file} />
                                    </td>
                                  </React.Fragment>
                                );
                              } else {
                                // กรณีไม่พบวันที่ที่ถูกต้องในชื่อไฟล์
                                listItemContent = (
                                  <React.Fragment key={index}>
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
            <Grid item container spacing={2} mt={2}>
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
                        {t("recommend")}
                      </Typography>
                      <Divider style={{ margin: "10px 0" }} />
                      {filteredFilesRec && filteredFilesRec.length === 0 ? (
                        <Typography variant="h6" color="textSecondary">
                          {t("no_information_found")}
                        </Typography>
                      ) : (
                        <table className="table table-striped">
                          <thead>
                            <tr className="text-center">
                              <th>{t("No")}</th>
                              <th>{t("date")}</th>
                              <th>ชนิดไฟล์</th>
                              <th>{t("Download")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredFilesRec.map((file, index) => {
                              const dateMatch = file.match(/_(\d{2})(\d{2})(\d{4})/); // ค้นหาวันที่ในรูปแบบ DDMMYYYY
                              let listItemContent;
                              if (dateMatch) {
                                const day = dateMatch[1];
                                const month = dateMatch[2];
                                const year = dateMatch[3];

                                // แปลงเป็นรูปแบบวันที่ไทย
                                const thaiDate = `${day}/${month}/${parseInt(year, 10)}`;

                                listItemContent = (
                                  <React.Fragment key={index}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{thaiDate}</td>
                                    <td className="text-center">
                                      <img
                                        src={iconPDF}
                                        alt="iconPDF"
                                        style={{
                                          width: "50px", // ปรับขนาดของรูปภาพตามที่คุณต้องการ
                                          height: "auto", // คุณสามารถปรับแต่งความสูงตามที่คุณต้องการ
                                          margin: "0 auto", // จัดให้อยู่ตรงกลางแนวนอน
                                        }}
                                      />
                                    </td>
                                    <td className="text-center">
                                      <ButtonWithHover file={file} />
                                    </td>
                                  </React.Fragment>
                                );
                              } else {
                                // กรณีไม่พบวันที่ที่ถูกต้องในชื่อไฟล์
                                listItemContent = (
                                  <React.Fragment key={index}>
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
            <Grid item container spacing={2} mt={2}>
              <Card sx={{ marginBottom: "0px", maxWidth: "100%", mx: "auto" }}>
                <MKBox>
                  <Banner slides={slides} />
                </MKBox>
              </Card>
              <Grid item xs={12} sx={{ backgroundColor: "#ffffff" }}>
                <Typography variant="h6" style={{ margin: "0", color: "#3f51b5" }}>
                  {t("checkUP_result_transactions")}
                </Typography>
                <CardContent>
                  <Grid>
                    {filteredFiles.length > 0 ? (
                      <Box
                        sx={{
                          marginBottom: "20px",
                          border: `1px solid ${theme.palette.primary.main}`,
                          borderRadius: "8px",
                          padding: "12px",
                          boxShadow: "0 4px 8px rgba(106, 13, 173, 0.1)",
                        }}
                      >
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
                              <React.Fragment key={index}>
                                <div
                                  className="container"
                                  style={{
                                    fontSize: "0.8rem",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                      <div style={{ flex: "0 0 20%" }}>
                                        รายการที่ :<span>{index + 1}</span>
                                      </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                      {" "}
                                      <div style={{ flex: "1" }}>วันที่ :{thaiDate}</div>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <div style={{ flex: "1" }}>
                                      ชนิดไฟล์ :
                                      <img
                                        src={iconPDF}
                                        alt="iconPDF"
                                        style={{
                                          width: "50px", // ปรับขนาดของรูปภาพตามที่คุณต้องการ
                                          height: "auto", // คุณสามารถปรับแต่งความสูงตามที่คุณต้องการ
                                          margin: "0 auto", // จัดให้อยู่ตรงกลางแนวนอน
                                        }}
                                      />
                                    </div>
                                  </Grid>

                                  <div style={{ margin: "auto" }}>
                                    <ButtonWithHover file={file} />
                                  </div>
                                </div>
                              </React.Fragment>
                            );
                          } else {
                            // กรณีไม่พบวันที่ที่ถูกต้องในชื่อไฟล์
                            listItemContent = (
                              <React.Fragment key={index}>
                                <div colSpan="3">วันที่: ไม่สามารถระบุได้</div>
                              </React.Fragment>
                            );
                          }

                          return listItemContent;
                        })}
                      </Box>
                    ) : (
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 600, color: "#999", textAlign: "center" }}
                      >
                        {t("no_information_found")}
                        {t("appointment_history")}
                      </Typography>
                    )}
                  </Grid>

                  {/* {filteredFiles.length === 0 ? (
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
                  )} */}
                </CardContent>
              </Grid>
            </Grid>
            <Grid item container spacing={2} mt={2}>
              <Grid item xs={12} sx={{ backgroundColor: "#ffffff" }}>
                <Typography variant="h6" style={{ margin: "0", color: "#3f51b5" }}>
                  {t("recommend")}
                </Typography>
                <CardContent>
                  <Grid>
                    {filteredFilesRec.length > 0 ? (
                      <Box
                        sx={{
                          marginBottom: "20px",
                          border: `1px solid ${theme.palette.primary.main}`,
                          borderRadius: "8px",
                          padding: "12px",
                          boxShadow: "0 4px 8px rgba(106, 13, 173, 0.1)",
                        }}
                      >
                        {filteredFilesRec.map((file, index) => {
                          const dateMatch = file.match(/_(\d{2})(\d{2})(\d{4})/); // ค้นหาวันที่ในรูปแบบ DDMMYYYY

                          let listItemContent;
                          if (dateMatch) {
                            const day = dateMatch[1];
                            const month = dateMatch[2];
                            const year = dateMatch[3];

                            // แปลงเป็นรูปแบบวันที่ไทย
                            const thaiDate = `${day}/${month}/${parseInt(year, 10)}`;

                            listItemContent = (
                              <React.Fragment key={index}>
                                <div
                                  className="container"
                                  style={{
                                    fontSize: "0.8rem",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end",
                                  }}
                                >
                                  <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                      <div style={{ flex: "0 0 20%" }}>
                                        รายการที่ :<span>{index + 1}</span>
                                      </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                      {" "}
                                      <div style={{ flex: "1" }}>วันที่ :{thaiDate}</div>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <div style={{ flex: "1" }}>
                                      ชนิดไฟล์ :
                                      <img
                                        src={iconPDF}
                                        alt="iconPDF"
                                        style={{
                                          width: "50px", // ปรับขนาดของรูปภาพตามที่คุณต้องการ
                                          height: "auto", // คุณสามารถปรับแต่งความสูงตามที่คุณต้องการ
                                          margin: "0 auto", // จัดให้อยู่ตรงกลางแนวนอน
                                        }}
                                      />
                                    </div>
                                  </Grid>

                                  <div style={{ margin: "auto" }}>
                                    <ButtonWithHover file={file} />
                                  </div>
                                </div>
                              </React.Fragment>
                            );
                          } else {
                            // กรณีไม่พบวันที่ที่ถูกต้องในชื่อไฟล์
                            listItemContent = (
                              <React.Fragment key={index}>
                                <div colSpan="3">วันที่: ไม่สามารถระบุได้</div>
                              </React.Fragment>
                            );
                          }

                          return listItemContent;
                        })}
                      </Box>
                    ) : (
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 600, color: "#999", textAlign: "center" }}
                      >
                        {t("no_information_found")}
                        {t("appointment_history")}
                      </Typography>
                    )}
                  </Grid>

                  {/* {filteredFiles.length === 0 ? (
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
                  )} */}
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
