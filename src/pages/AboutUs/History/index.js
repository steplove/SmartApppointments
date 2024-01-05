import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
} from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
function History() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "เกี่ยวกับเรา", link: "/CEO" },
    { label: "ศูนย์บริการทางการแพทย์", link: "/History" },
    { label: "บริการของเรา", link: "/our-services" },
    { label: "ค้นหาแพทย์", link: "/find-doctor" },
    { label: "ติดต่อ/สมัครงาน", link: "/contact-us" },
  ];

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <AppBar position="static" style={{ padding: "10px 0" }}>
            <Toolbar>
              <Grid container justify="space-between" alignItems="center">
                {/* Row 1 */}
                <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                  {menuItems.map((item) => (
                    <Grid item key={item.label}>
                      <Button color="inherit" component={Link} to={item.link}>
                        {item.label}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Hidden>
        {/* Mobile View */}
        <Hidden smUp>
          {/* Hamburger icon for mobile */}
          <Button color="inherit" onClick={toggleDrawer(true)}>
            ☰
          </Button>
          {/* Drawer for mobile */}
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.label}
                  component={Link}
                  to={item.link}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Hidden>
      </ThemeProvider>
    </>
  );
}

export default History;
