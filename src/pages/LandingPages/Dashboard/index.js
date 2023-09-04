import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ListAltIcon from "@mui/icons-material/ListAlt";
// import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarComponent from "components/CalendarComponent";
import MenuList from "../MenuLists";
// import AppointmentsCalendar from "components/Calendars";
// ข้อมูลจำลอง
const notifications = [
  "นัดหมายกับ Dr.Smith ในวันพรุ่งนี้",
  "การนัดหมายกับ Dr.Johnson ถูกยืนยัน",
  "การนัดหมายกับ Dr.Carter ถูกยกเลิก",
];

function Dashboard() {
  return (
    <>
      <MenuList />
      <Box
        p={4}
        style={{
          backgroundColor: "#f5f5f5",
          minHeight: "calc(100vh - 56px - 32px)",
          marginBottom: "56px",
        }}
      >
        <Typography variant="h4" style={{ margin: "20px 0", color: "#3f51b5" }}>
          แดชบอร์ด
        </Typography>

        <Grid item xs={12} md={6}>
          <Card elevation={5} style={{ width: "100%", backgroundColor: "#ffffff" }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                <CalendarTodayIcon style={{ verticalAlign: "middle", marginRight: 10 }} />
                ปฎิทินการนัดหมาย
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Paper elevation={0} style={{ height: "auto", backgroundColor: "#e0e0e0" }}>
                <CalendarComponent sx={{ minWidth: "auto" }} />
              </Paper>
            </CardContent>
          </Card>
        </Grid>
        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={5} style={{ backgroundColor: "#ffffff" }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  <NotificationsIcon style={{ verticalAlign: "middle", marginRight: 10 }} />
                  การแจ้งเตือน
                </Typography>
                <Divider style={{ margin: "10px 0" }} />
                <List>
                  {notifications.map((notification, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={notification} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={5} style={{ backgroundColor: "#ffffff" }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  <ListAltIcon style={{ verticalAlign: "middle", marginRight: 10 }} />
                  รายการนัดหมายล่าสุด
                </Typography>
                <Divider style={{ margin: "10px 0" }} />
                <List>
                  {notifications.map((appointment, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={appointment} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* <Grid item xs={12} md={6}>
            <Card elevation={5} style={{ backgroundColor: "#ffffff" }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  <ListAltIcon style={{ verticalAlign: "middle", marginRight: 10 }} />
                  รายการนัดหมายล่าสุด
                </Typography>
                <Divider style={{ margin: "10px 0" }} />
                <List>
                  {notifications.map((appointment, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={appointment} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid> */}

          {/* <Grid item xs={12} md={6}>
            <Card elevation={5} style={{ backgroundColor: "#ffffff" }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  <BarChartIcon style={{ verticalAlign: "middle", marginRight: 10 }} />
                  สถิติการนัดหมาย
                </Typography>
                <Divider style={{ margin: "10px 0" }} />
                <Paper elevation={0} style={{ height: 200, backgroundColor: "#e0e0e0" }}></Paper>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
