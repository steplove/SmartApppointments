import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Hidden,
  Box,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  // Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getStatusColor } from "components/StatusColor/getStatusColor";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ListAltIcon from "@mui/icons-material/ListAlt";
// import CalendarComponent from "components/CalendarComponent";
// import Foots from "components/Foot";
import MenuList from "../MenuLists";
import { BASE_URL } from "constants/constants";
import useFetch from "hooks/useFetch";
import useTokenCheck from "hooks/useTokenCheck";
import CircularProgress from "@mui/material/CircularProgress";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import Barcode from "react-barcode";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardSlideComponent from "components/Card";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import Banner from "components/Banner";
import MKTypography from "components/MKTypography";

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
function Dashboard() {
  const [, HN] = useTokenCheck();
  console.log(HN, "IdenNumber", "HN");
  const { data: fetchAllAppointment = [] } = useFetch(
    `${BASE_URL}/api/AllAppointmentsLastDay7/${HN}`
  );
  const { data: fetchNotify = [] } = useFetch(`${BASE_URL}/api/NotifyAppointments/${HN}`);
  const [dialogShow, setDialogShow] = useState([]);
  useEffect(() => {
    if (fetchAllAppointment && Array.isArray(fetchAllAppointment)) {
      setAllAppointment(fetchAllAppointment);
    }
  }, [fetchAllAppointment]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (UID) => {
    const foundBooking = fetchAllAppointment.find((booking) => booking.UID === UID);
    setDialogShow(foundBooking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const [allAppointments, setAllAppointment] = useState([]);
  // ตรวจสอบว่า fetchNotify มีข้อมูลหรือไม่
  if (!fetchNotify || !fetchAllAppointment) {
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
          <p style={{ margin: "10px", color: "#333" }}>Loading HomePage...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <MenuList />
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
            <Typography variant="h4" style={{ margin: "0", color: "#3f51b5" }}></Typography>
            <Grid item container spacing={2} mt={2}>
              <Card sx={{ marginBottom: "0px", maxWidth: "70%", mx: "auto" }}>
                <MKBox>
                  <Banner slides={slides} />
                </MKBox>
              </Card>
              <Card sx={{ maxWidth: "70%", mx: "auto", marginTop: "10px" }}>
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
                  <Grid item xs={12} md={6}>
                    <Card style={{ backgroundColor: "#ffffff" }}>
                      <CardContent>
                        <Typography variant="h6" color="primary">
                          <NotificationsIcon style={{ verticalAlign: "middle", marginRight: 10 }} />
                          การแจ้งเตือน
                        </Typography>
                        <Divider style={{ margin: "10px 0" }} />
                        <List style={{ padding: 0 }}>
                          {fetchNotify.length > 0 ? (
                            fetchNotify.slice(0, 3).map((notification) => {
                              let content;
                              if (notification.FinishStatus === 0) {
                                if (notification.StatusFlag === "3") {
                                  content = (
                                    <>
                                      <ListItem
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          padding: "10px 0",
                                          borderBottom: "1px solid #ccc",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            color: "#999",
                                          }}
                                        >
                                          {notification.EntryDatetime
                                            ? new Date(
                                                notification.EntryDatetime
                                              ).toLocaleDateString("th-TH", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                              })
                                            : ""}
                                        </span>
                                        <span
                                          style={{
                                            fontSize: "16px",
                                          }}
                                        >
                                          นัดหมายกับ {notification.Doctor_Name}
                                        </span>
                                        <span style={{ color: "#d0b134" }}>รอยืนยัน</span>
                                      </ListItem>
                                    </>
                                  );
                                } else if (notification.StatusFlag === "4") {
                                  content = (
                                    <>
                                      <ListItem
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          padding: "10px 0",
                                          borderBottom: "1px solid #ccc",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            color: "#999",
                                          }}
                                        >
                                          {notification.EntryDatetime
                                            ? new Date(
                                                notification.EntryDatetime
                                              ).toLocaleDateString("th-TH", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                              })
                                            : ""}
                                        </span>
                                        <span
                                          style={{
                                            fontSize: "16px",
                                          }}
                                        >
                                          นัดหมายกับ {notification.Doctor_Name}
                                        </span>
                                        <span style={{ color: "green" }}>ถูกยืนยัน</span>
                                      </ListItem>
                                    </>
                                  );
                                } else if (notification.StatusFlag === "5") {
                                  content = (
                                    <>
                                      <ListItem
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          padding: "10px 0",
                                          borderBottom: "1px solid #ccc",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            color: "#999",
                                          }}
                                        >
                                          {notification.EntryDatetime
                                            ? new Date(
                                                notification.EntryDatetime
                                              ).toLocaleDateString("th-TH", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                              })
                                            : ""}
                                        </span>
                                        <span
                                          style={{
                                            fontSize: "16px",
                                          }}
                                        >
                                          นัดหมายกับ {notification.Doctor_Name}
                                        </span>
                                        <span style={{ color: "red" }}>ถูกยกเลิก</span>
                                      </ListItem>
                                    </>
                                  );
                                } else {
                                  content = "";
                                }
                              } else if (notification.StatusFlag === "6") {
                                content = (
                                  <>
                                    <ListItem
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        padding: "10px 0",
                                        borderBottom: "1px solid #ccc",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "#999",
                                        }}
                                      >
                                        {notification.EntryDatetime
                                          ? new Date(notification.EntryDatetime).toLocaleDateString(
                                              "th-TH",
                                              {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                              }
                                            )
                                          : ""}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "16px",
                                        }}
                                      >
                                        นัดหมายกับ {notification.Doctor_Name}
                                      </span>
                                      <span style={{ color: "blue" }}>เสร็จสมบูรณ์</span>
                                    </ListItem>
                                  </>
                                );
                              } else {
                                content = "";
                              }
                              return content;
                            })
                          ) : (
                            <ListItem
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "10px 0",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#999",
                                  fontWeight: 600, // ทำให้ข้อความหนาขึ้น
                                }}
                              >
                                ยังไม่มีการแจ้งเตือน
                              </span>
                            </ListItem>
                          )}
                        </List>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card style={{ backgroundColor: "#ffffff" }}>
                      <CardContent>
                        <Typography variant="h6" color="primary">
                          <ListAltIcon style={{ verticalAlign: "middle", marginRight: 10 }} />
                          รายการนัดหมายล่าสุด
                        </Typography>
                        <Divider style={{ margin: "10px 0" }} />
                        <div>
                          {allAppointments.length > 0 ? (
                            allAppointments.map((booking) => (
                              <Box
                                key={booking.UID}
                                sx={{
                                  marginBottom: "20px",
                                  border: `1px solid ${theme.palette.primary.main}`,
                                  borderRadius: "8px",
                                  padding: "12px",
                                  boxShadow: "0 4px 8px rgba(106, 13, 173, 0.1)",
                                }}
                              >
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                    <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                                      {new Date(booking.Appointment_Date).toLocaleDateString()}{" "}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body2">
                                      <HomeIcon
                                        fontSize="small"
                                        color="primary"
                                        style={{ verticalAlign: "middle" }}
                                      />{" "}
                                      คลินิก: {booking.Clinic_Name}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography variant="body2">
                                      <PersonIcon
                                        fontSize="small"
                                        color="primary"
                                        style={{ verticalAlign: "middle" }}
                                      />{" "}
                                      แพทย์: {booking.Doctor_Name}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography
                                      variant="body2"
                                      style={{
                                        color: getStatusColor(booking.status),
                                        fontWeight: 300,
                                        textAlign: "center",
                                      }}
                                    >
                                      <div
                                        className={`status-${booking.StatusFlag}`}
                                        style={{ justifyItems: "center", alignItems: "center" }}
                                      >
                                        {" "}
                                        สถานะ:{" "}
                                        {booking.StatusFlag === "3"
                                          ? "รอยืนยัน"
                                          : booking.StatusFlag === "4"
                                          ? "ยืนยันนัดหมาย"
                                          : booking.StatusFlag === "5"
                                          ? "ยกเลิกนัดหมาย"
                                          : booking.StatusFlag === "6"
                                          ? "เสร็จสมบูรณ์"
                                          : "unknown"}{" "}
                                      </div>
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6} sx={{ textAlign: "center" }}>
                                    <Button onClick={() => handleOpenDialog(booking.UID)}>
                                      ดูรายละเอียด
                                    </Button>
                                    <Dialog
                                      open={openDialog}
                                      onClose={handleCloseDialog}
                                      maxWidth="sm"
                                      fullWidth
                                    >
                                      <DialogTitle>รายละเอียดเพิ่มเติม</DialogTitle>
                                      <DialogContent style={{ textAlign: "center" }}>
                                        <div>
                                          ชื่อ: {dialogShow.FirstName} {dialogShow.LastName}
                                        </div>
                                        <div>
                                          วันที่นัด:{" "}
                                          {new Date(
                                            dialogShow.Appointment_Date
                                          ).toLocaleDateString()}
                                        </div>
                                        {dialogShow.Appointment_Time ? (
                                          <p>
                                            เวลา: {dialogShow.Appointment_Time.substring(11, 16)}
                                          </p>
                                        ) : (
                                          <p>ไม่มีข้อมูลเวลาการนัดหมาย</p>
                                        )}

                                        {/* เพิ่มข้อมูลอื่น ๆ ตามที่คุณต้องการ */}
                                        {dialogShow.StatusFlag > 3 ? (
                                          <Barcode value={dialogShow.APM_No} />
                                        ) : (
                                          ""
                                        )}
                                      </DialogContent>

                                      <DialogActions>
                                        <Button onClick={handleCloseDialog} color="primary">
                                          ปิด
                                        </Button>
                                      </DialogActions>
                                    </Dialog>
                                  </Grid>
                                </Grid>
                              </Box>
                            ))
                          ) : (
                            <ListItem
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "10px 0",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#999",
                                  fontWeight: 600, // ทำให้ข้อความหนาขึ้น
                                }}
                              >
                                ยังไม่มีรายการนัดหมาย
                              </span>
                            </ListItem>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <MKTypography sx={{ borderBottom: "2px solid #0bb288" }}></MKTypography>
                {/* หมอ */}
                <Grid item>
                  <CardSlideComponent />
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
                      <NotificationsIcon style={{ verticalAlign: "middle", marginRight: 10 }} />
                      การแจ้งเตือน
                    </Typography>
                    <Divider style={{ margin: "10px 0" }} />
                    <List style={{ padding: 0 }}>
                      {fetchNotify.length > 0 ? (
                        fetchNotify.slice(0, 3).map((notification) => {
                          let content;
                          if (notification.FinishStatus === 0) {
                            if (notification.StatusFlag === "3") {
                              content = (
                                <>
                                  <ListItem
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      padding: "10px 0",
                                      borderBottom: "1px solid #ccc",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "#999",
                                      }}
                                    >
                                      {notification.EntryDatetime
                                        ? new Date(notification.EntryDatetime).toLocaleDateString(
                                            "th-TH",
                                            {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            }
                                          )
                                        : ""}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "16px",
                                      }}
                                    >
                                      นัดหมายกับ {notification.Doctor_Name}
                                    </span>
                                    <span style={{ color: "#d0b134" }}>รอยืนยัน</span>
                                  </ListItem>
                                </>
                              );
                            } else if (notification.StatusFlag === "4") {
                              content = (
                                <>
                                  <ListItem
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      padding: "10px 0",
                                      borderBottom: "1px solid #ccc",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "#999",
                                      }}
                                    >
                                      {notification.EntryDatetime
                                        ? new Date(notification.EntryDatetime).toLocaleDateString(
                                            "th-TH",
                                            {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            }
                                          )
                                        : ""}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "16px",
                                      }}
                                    >
                                      นัดหมายกับ {notification.Doctor_Name}
                                    </span>
                                    <span style={{ color: "green" }}>ถูกยืนยัน</span>
                                  </ListItem>
                                </>
                              );
                            } else if (notification.StatusFlag === "5") {
                              content = (
                                <>
                                  <ListItem
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      padding: "10px 0",
                                      borderBottom: "1px solid #ccc",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "#999",
                                      }}
                                    >
                                      {notification.EntryDatetime
                                        ? new Date(notification.EntryDatetime).toLocaleDateString(
                                            "th-TH",
                                            {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            }
                                          )
                                        : ""}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "16px",
                                      }}
                                    >
                                      นัดหมายกับ {notification.Doctor_Name}
                                    </span>
                                    <span style={{ color: "red" }}>ถูกยกเลิก</span>
                                  </ListItem>
                                </>
                              );
                            } else {
                              content = "";
                            }
                          } else if (notification.StatusFlag === "6") {
                            content = (
                              <>
                                <ListItem
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    padding: "10px 0",
                                    borderBottom: "1px solid #ccc",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "#999",
                                    }}
                                  >
                                    {notification.EntryDatetime
                                      ? new Date(notification.EntryDatetime).toLocaleDateString(
                                          "th-TH",
                                          {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          }
                                        )
                                      : ""}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "16px",
                                    }}
                                  >
                                    นัดหมายกับ {notification.Doctor_Name}
                                  </span>
                                  <span style={{ color: "blue" }}>เสร็จสมบูรณ์</span>
                                </ListItem>
                              </>
                            );
                          } else {
                            content = "";
                          }
                          return content;
                        })
                      ) : (
                        <ListItem
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "10px 0",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#999",
                              fontWeight: 600, // ทำให้ข้อความหนาขึ้น
                            }}
                          >
                            ยังไม่มีการแจ้งเตือน
                          </span>
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card style={{ backgroundColor: "#ffffff" }}>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      <ListAltIcon style={{ verticalAlign: "middle", marginRight: 10 }} />
                      รายการนัดหมายล่าสุด
                    </Typography>
                    <Divider style={{ margin: "10px 0" }} />
                    <ThemeProvider theme={theme}>
                      <div>
                        {allAppointments.length > 0 ? (
                          allAppointments.map((booking) => (
                            <Box
                              key={booking.UID}
                              sx={{
                                marginBottom: "20px",
                                border: `1px solid ${theme.palette.primary.main}`,
                                borderRadius: "8px",
                                padding: "12px",
                                boxShadow: "0 4px 8px rgba(106, 13, 173, 0.1)",
                              }}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                                    {new Date(booking.Appointment_Date).toLocaleDateString()}{" "}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="body2">
                                    <HomeIcon
                                      fontSize="small"
                                      color="primary"
                                      style={{ verticalAlign: "middle" }}
                                    />{" "}
                                    คลินิก: {booking.Clinic_Name}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="body2">
                                    <PersonIcon
                                      fontSize="small"
                                      color="primary"
                                      style={{ verticalAlign: "middle" }}
                                    />{" "}
                                    แพทย์: {booking.Doctor_Name}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography
                                    variant="body2"
                                    style={{
                                      color: getStatusColor(booking.status),
                                      fontWeight: 300,
                                      textAlign: "center",
                                    }}
                                  >
                                    <div
                                      className={`status-${booking.StatusFlag}`}
                                      style={{ justifyItems: "center", alignItems: "center" }}
                                    >
                                      {" "}
                                      สถานะ:{" "}
                                      {booking.StatusFlag === "3"
                                        ? "รอยืนยัน"
                                        : booking.StatusFlag === "4"
                                        ? "ยืนยันนัดหมาย"
                                        : booking.StatusFlag === "5"
                                        ? "ยกเลิกนัดหมาย"
                                        : booking.StatusFlag === "6"
                                        ? "เสร็จสมบูรณ์"
                                        : "unknown"}{" "}
                                    </div>
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ textAlign: "center" }}>
                                  <Button onClick={() => handleOpenDialog(booking.UID)}>
                                    ดูรายละเอียด
                                  </Button>
                                  <Dialog
                                    open={openDialog}
                                    onClose={handleCloseDialog}
                                    maxWidth="sm"
                                    fullWidth
                                  >
                                    <DialogTitle>รายละเอียดเพิ่มเติม</DialogTitle>
                                    <DialogContent style={{ textAlign: "center" }}>
                                      <div>
                                        ชื่อ: {dialogShow.FirstName} {dialogShow.LastName}
                                      </div>
                                      <div>
                                        วันที่นัด:{" "}
                                        {new Date(dialogShow.Appointment_Date).toLocaleDateString()}
                                      </div>
                                      {dialogShow.Appointment_Time ? (
                                        <p>เวลา: {dialogShow.Appointment_Time.substring(11, 16)}</p>
                                      ) : (
                                        <p>ไม่มีข้อมูลเวลาการนัดหมาย</p>
                                      )}

                                      {/* เพิ่มข้อมูลอื่น ๆ ตามที่คุณต้องการ */}
                                      {dialogShow.StatusFlag > 3 ? (
                                        <Barcode value={dialogShow.APM_No} />
                                      ) : (
                                        ""
                                      )}
                                    </DialogContent>

                                    <DialogActions>
                                      <Button onClick={handleCloseDialog} color="primary">
                                        ปิด
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </Grid>
                              </Grid>
                            </Box>
                          ))
                        ) : (
                          <Typography
                            variant="body1"
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#999",
                              textAlign: "center",
                            }}
                          >
                            ยังไม่มีรายการนัดหมาย
                          </Typography>
                        )}
                      </div>
                    </ThemeProvider>
                  </CardContent>
                </Card>
              </Grid>
              <CardSlideComponent />
            </Grid>
          </Box>
        </Hidden>
      </ThemeProvider>

      {/* <Foots /> */}
    </>
  );
}

export default Dashboard;
