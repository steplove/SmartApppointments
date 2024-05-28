import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  Button,
  // Drawer,
  // List,
  // ListItem,
  // ListItemText,
  Hidden,
  Menu,
  MenuItem,
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
function NavbarsAboutUs() {
  // const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // const toggleDrawer = (open) => (event) => {
  //   if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
  //     return;
  //   }

  //   setDrawerOpen(open);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuItems = [
    { label: "เกี่ยวกับเรา", link: "/CEO" },
    { label: "ศูนย์บริการทางการแพทย์", link: "/History" },
    { label: "บริการของเรา", link: "/our-services" },
    { label: "ค้นหาแพทย์", link: "/find-doctor" },
    { label: "ติดต่อ/สมัครงาน", link: "/contact-us" },
  ];

  const menuList = [
    { label: "ผู้บริหาร", link: "/CEO" },
    { label: "สาส์นจากประธานกรรมการ", link: "/" },
  ];
  return (
    <Grid>
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <AppBar
            position="static"
            style={{
              backgroundColor: "#f0f2f5",
              boxShadow: "none",
              maxWidth: "100%",
              margin: "auto",
            }}
          >
            <Toolbar style={{ justifyContent: "center", margin: "auto" }}>
              <Grid container justify="center" alignItems="center">
                {menuItems.map((item) => (
                  <Grid item key={item.label}>
                    <Button
                      style={{ color: "#808080" }}
                      onClick={handleClick}
                      aria-controls={`menu-${item.label}`}
                      aria-haspopup="true"
                    >
                      {item.label}
                    </Button>
                    <Menu
                      id={`menu-${item.label}`}
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          // Your logic to handle menu item click
                        }}
                        component={Link}
                        to={item.link}
                      >
                        {item.label}
                      </MenuItem>
                    </Menu>
                  </Grid>
                ))}
                {menuList.map((list) => (
                  <Menu
                    key={list.label}
                    id={`menu-${list.label}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        // Your logic to handle menu item click
                      }}
                      component={Link}
                      to={list.link}
                    >
                      {list.label}
                    </MenuItem>
                  </Menu>
                ))}
              </Grid>
            </Toolbar>
          </AppBar>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <AppBar
            position="static"
            style={{
              backgroundColor: "#f0f2f5",
              boxShadow: "none",
              maxWidth: "100%",
              margin: "auto",
            }}
          >
            <Toolbar style={{ justifyContent: "center", margin: "auto" }}>
              <Grid container justify="center" alignItems="center">
                {menuItems.map((item) => (
                  <Grid item key={item.label}>
                    <Button
                      style={{ color: "#808080" }}
                      onClick={handleClick}
                      aria-controls={`menu-${item.label}`}
                      aria-haspopup="true"
                    >
                      {item.label}
                    </Button>
                    <Menu
                      id={`menu-${item.label}`}
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();
                          // Your logic to handle menu item click
                        }}
                        component={Link}
                        to={item.link}
                      >
                        {item.label}
                      </MenuItem>
                    </Menu>
                  </Grid>
                ))}
                {menuList.map((list) => (
                  <Menu
                    key={list.label}
                    id={`menu-${list.label}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        // Your logic to handle menu item click
                      }}
                      component={Link}
                      to={list.link}
                    >
                      {list.label}
                    </MenuItem>
                  </Menu>
                ))}
              </Grid>
            </Toolbar>
          </AppBar>
        </Hidden>
        {/* Hamburger icon for mobile */}
        {/* <Button color="inherit" onClick={toggleDrawer(true)}>
            ☰
          </Button> */}
        {/* Drawer for mobile */}
        {/* <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
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
          </Drawer> */}
      </ThemeProvider>
    </Grid>
  );
}

export default NavbarsAboutUs;
