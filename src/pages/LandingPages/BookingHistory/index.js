import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Hidden,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getStatusColor } from "components/StatusColor/getStatusColor";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuList from "../MenuLists";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { BASE_URL } from "constants/constants";
import useFetch from "hooks/useFetch";
import Barcode from "react-barcode";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import useTokenCheck from "hooks/useTokenCheck";
import CircularProgress from "@mui/material/CircularProgress";
import MKBox from "components/MKBox";

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

function BookingHistory() {
  const [, HN] = useTokenCheck();
  const [allAppointments, setAllAppointment] = useState([]);
  const [dialogShow, setDialogShow] = useState([]);
  const { data: fetchAllAppointment = [] } = useFetch(
    `${BASE_URL}/api/AllAppointmentsWhereHN/${HN}`
  );
  useEffect(() => {
    if (fetchAllAppointment && Array.isArray(fetchAllAppointment)) {
      setAllAppointment(fetchAllAppointment);
    }
  }, [fetchAllAppointment]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (UID) => {
    const foundBooking = allAppointments.find((booking) => booking.UID === UID);
    setDialogShow(foundBooking);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  if (!fetchAllAppointment) {
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
    <>
      <MenuList />
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Paper
            style={{
              padding: "16px",
              marginTop: "16px",
              overflowX: "auto",
              maxWidth: "70%",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              style={{ color: theme.palette.primary.main, marginBottom: "20px" }}
            >
              ประวัตินัดหมาย
            </Typography>
            <Table>
              <TableHead style={{ backgroundColor: theme.palette.secondary.main }}>
                <TableRow>
                  <TableCell style={{ textAlign: "center" }}>วันที่</TableCell>
                  <TableCell style={{ textAlign: "center" }}>เวลา</TableCell>
                  <TableCell style={{ textAlign: "center" }}>คลินิก</TableCell>
                  <TableCell style={{ textAlign: "center" }}>แพทย์</TableCell>
                  <TableCell style={{ textAlign: "center" }}>สถานะ</TableCell>
                  <TableCell style={{ textAlign: "center" }}>เครื่องมือ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allAppointments.map((booking) => (
                  <TableRow key={booking.UID} hover style={{ cursor: "pointer" }}>
                    <TableCell style={{ textAlign: "center" }}>
                      {new Date(booking.Appointment_Date).toLocaleDateString()}{" "}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {new Date(booking.Appointment_Time).toLocaleTimeString()}
                    </TableCell>

                    <TableCell style={{ textAlign: "center" }}>{booking.Clinic_Name}</TableCell>
                    <TableCell style={{ textAlign: "center" }}>{booking.Doctor_Name}</TableCell>
                    <TableCell
                      style={{
                        color: getStatusColor(booking.StatusFlag),
                        fontWeight: 600,
                        textAlign: "center",
                      }}
                    >
                      <h6 className={`status-${booking.StatusFlag}`}>
                        {booking.StatusFlag === "3"
                          ? "pending"
                          : booking.StatusFlag === "4"
                          ? "confirmed"
                          : booking.StatusFlag === "5"
                          ? "cancelled"
                          : booking.StatusFlag === "6"
                          ? "complete"
                          : "unknown"}{" "}
                      </h6>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <Button onClick={() => handleOpenDialog(booking.UID)}>ดูรายละเอียด</Button>
                      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                        <DialogTitle>รายละเอียดเพิ่มเติม</DialogTitle>
                        <DialogContent style={{ textAlign: "center" }}>
                          <p>
                            ชื่อ: {dialogShow.FirstName} {dialogShow.LastName}
                          </p>
                          <p>
                            วันที่นัด: {new Date(dialogShow.Appointment_Date).toLocaleDateString()}
                          </p>
                          <p>เวลา: {new Date(dialogShow.Appointment_Time).toLocaleTimeString()}</p>
                          {/* เพิ่มข้อมูลอื่น ๆ ตามที่คุณต้องการ */}
                          {dialogShow.APM_No && <Barcode value={dialogShow.APM_No} />}
                        </DialogContent>

                        <DialogActions>
                          <Button onClick={handleCloseDialog} color="primary">
                            ปิด
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>

          <MKBox pt={6} px={1} mt={25}>
            <DefaultFooter content={footerRoutes} stiky />
          </MKBox>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
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
                          color: "white",
                          fontWeight: 300,
                          textAlign: "center",
                        }}
                        className={`status-${booking.StatusFlag}`}
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
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Button onClick={() => handleOpenDialog(booking.UID)}>ดูรายละเอียด</Button>
                      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                        <DialogTitle>รายละเอียดเพิ่มเติม</DialogTitle>
                        <DialogContent style={{ textAlign: "center" }}>
                          <p>
                            ชื่อ: {dialogShow.FirstName} {dialogShow.LastName}
                          </p>
                          <p>
                            วันที่นัด: {new Date(dialogShow.Appointment_Date).toLocaleDateString()}
                          </p>
                          <p>
                            เวลา:{" "}
                            {dialogShow.Appointment_Time
                              ? dialogShow.Appointment_Time.substring(11, 16)
                              : ""}
                          </p>
                          <p>รายละเอียดการนัด : {dialogShow.Apm_Des}</p>
                          {/* เพิ่มข้อมูลอื่น ๆ ตามที่คุณต้องการ */}
                          {dialogShow.StatusFlag > 3 ? <Barcode value={dialogShow.APM_No} /> : ""}
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
                style={{ fontWeight: 600, color: "#999", textAlign: "center" }}
              >
                ไม่มีประวัตินัดหมาย
              </Typography>
            )}
          </div>
        </Hidden>
      </ThemeProvider>
      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Foots /> */}
    </>
  );
}

export default BookingHistory;
