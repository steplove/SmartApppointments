import React from "react";
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
} from "@mui/material";
import { getStatusColor } from "components/StatusColor/getStatusColor";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuList from "../MenuLists";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
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
  const bookings = [
    {
      date: "2023-01-01",
      time: "09:00-10:00",
      clinic: "คลินิก A",
      doctor: "แพทย์ ก",
      status: "confirmed",
    },
    {
      date: "2023-01-05",
      time: "10:00-11:00",
      clinic: "คลินิก B",
      doctor: "แพทย์ ข",
      status: "pending",
    },
  ];

  return (
    <>
      <MenuList />
      <ThemeProvider theme={theme}>
        <Paper elevation={3} style={{ padding: "16px", marginTop: "16px", overflowX: "auto" }}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ color: theme.palette.primary.main, marginBottom: "20px" }}
          >
            ประวัตินัดหมาย
          </Typography>

          {/* Desktop/Tablet View */}
          <Hidden smDown>
            <Table>
              <TableHead style={{ backgroundColor: theme.palette.secondary.main }}>
                <TableRow>
                  <TableCell>วันที่</TableCell>
                  <TableCell>เวลา</TableCell>
                  <TableCell>คลินิก</TableCell>
                  <TableCell>แพทย์</TableCell>
                  <TableCell>สถานะ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking, index) => (
                  <TableRow key={index} hover style={{ cursor: "pointer" }}>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{booking.time}</TableCell>
                    <TableCell>{booking.clinic}</TableCell>
                    <TableCell>{booking.doctor}</TableCell>
                    <TableCell style={{ color: getStatusColor(booking.status), fontWeight: 600 }}>
                      {booking.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Hidden>

          {/* Mobile View */}
          <Hidden smUp>
            <div>
              {bookings.map((booking, index) => (
                <Box
                  key={index}
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
                        {booking.date} {booking.time}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <HomeIcon
                          fontSize="small"
                          color="primary"
                          style={{ verticalAlign: "middle" }}
                        />{" "}
                        คลินิก: {booking.clinic}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <PersonIcon
                          fontSize="small"
                          color="primary"
                          style={{ verticalAlign: "middle" }}
                        />{" "}
                        แพทย์: {booking.doctor}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        style={{ color: getStatusColor(booking.status), fontWeight: 600 }}
                      >
                        สถานะ: {booking.status}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </div>
          </Hidden>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default BookingHistory;
