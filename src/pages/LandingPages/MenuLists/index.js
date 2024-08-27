import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
} from "@mui/material";
import "./active.css";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import useTokenCheck from "hooks/useTokenCheck";
import HistoryIcon from "@mui/icons-material/History";
import Popover from "@mui/material/Popover";
import { useTranslation } from "react-i18next";
import LanguageSelector from "LanguageSelector";

export default function MenuList() {
  const { t } = useTranslation();
  const [, HN] = useTokenCheck();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorPopover, setAnchorPopover] = React.useState(null);

  const handleClosePopover = () => {
    setAnchorPopover(null);
  };

  const open = Boolean(anchorPopover);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const hadleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/presentation";
  };
  return (
    <Grid>
      {isMobile ? (
        <BottomNavigation
          showLabels
          style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
          value={location.pathname}
        >
          <BottomNavigationAction
            label={`${t("home")}`}
            icon={<HomeIcon />}
            component={Link}
            to="/dashboard"
            value="/dashboard"
          />
          <BottomNavigationAction
            label={`${t("checkup")}`}
            icon={<HomeIcon />}
            component={Link}
            to="/dashboardCheckup"
            value="/dashboardCheckup"
          />
          {HN !== "-" ? (
            <BottomNavigation showLabels>
              <BottomNavigationAction
                label={`${t("appointment")}`}
                icon={<EventNoteIcon />}
                component={Link}
                to="/appointments"
                value="/appointments"
                style={{
                  fontSize: location.pathname === "/appointments" ? "1.2rem" : "1rem", // ปรับขนาดตัวอักษร
                  color: location.pathname === "/appointments" ? "#ff0000" : "#6c757d;", // เปลี่ยนสีข้อความ
                }}
                className={location.pathname === "/appointments" ? "active-bottom-nav" : ""}
              />
              <BottomNavigationAction
                label={`${t("history")}`}
                icon={<HistoryIcon />}
                component={Link}
                to="/bookinghistory"
                value="/bookinghistory"
                style={{
                  fontSize: location.pathname === "/bookinghistory" ? "1.2rem" : "1rem", // ปรับขนาดตัวอักษร
                  color: location.pathname === "/bookinghistory" ? "#ff0000" : "#6c757d;", // เปลี่ยนสีข้อความ
                }}
                className={location.pathname === "/bookinghistory" ? "active-bottom-nav" : ""}
              />
            </BottomNavigation>
          ) : null}

          <BottomNavigationAction
            label={`${t("doctor")}`}
            icon={<LocalHospitalIcon />}
            component={Link}
            to="/doctorList"
            value="/doctorList"
          />
          <BottomNavigationAction
            label={`${t("setting")}`}
            icon={<SettingsIcon />}
            component={Link}
            to="/userprofile"
            value="/userprofile"
          />
        </BottomNavigation>
      ) : (
        <Grid>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                Smart Appointments
              </Typography>
              <LanguageSelector />
            </Toolbar>
          </AppBar>
          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose} component={Link} to="/">
              {t("home")}
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/dashboardCheckup">
              {t("sriburin_checkup_center")}
            </MenuItem>
            {HN !== "-" && (
              <MenuItem
                key="appointments"
                onClick={handleClose}
                component={Link}
                to="/appointments"
              >
                {t("appointment")}
              </MenuItem>
            )}
            {HN !== "-" && (
              <MenuItem key="history" onClick={handleClose} component={Link} to="/bookinghistory">
                {t("history")}
              </MenuItem>
            )}
            <MenuItem
              selected={window.location.pathname === "/doctorList"}
              onClick={handleClose}
              component={Link}
              to="/doctorList"
            >
              {t("doctor_list")}
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/userprofile">
              {t("personal_information")}
            </MenuItem>
            <MenuItem onClick={hadleLogout}>{t("logout")}</MenuItem>
          </Menu>
        </Grid>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem component={Link} to="/userprofile" style={{ backgroundColor: "#fff" }}>
          {t("personal_information")}
        </MenuItem>
      </Popover>
      <br />
    </Grid>
  );
}
