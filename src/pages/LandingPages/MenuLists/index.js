import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  // Button,
  Menu,
  MenuItem,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

// import SettingsIcon from "@mui/icons-material/Settings";
// import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import Popover from "@mui/material/Popover";
// import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "LanguageSelector";

export default function MenuList() {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorPopover, setAnchorPopover] = React.useState(null);

  // const handleClickPopover = (event) => {
  //   setAnchorPopover(event.currentTarget);
  // };

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
    window.location.href = "/";
  };
  // const location = useLocation(); // <-- เพิ่ม hook นี้

  // const isCurrentPage = (path) => location.pathname === path; // <-- ฟังก์ชันนี้จะเป็น true เมื่ออยู่ที่หน้านั้น
  return (
    <div>
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
            label={`${t("appointment")}`}
            icon={<EventNoteIcon />}
            component={Link}
            to="/appointments"
            value="/appointments"
          />
          <BottomNavigationAction
            label={`${t("history")}`}
            icon={<HistoryIcon />}
            component={Link}
            to="/bookinghistory"
            value="/bookinghistory"
          />
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
        <>
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
            <MenuItem onClick={handleClose} component={Link} to="/dashboard">
              {t("home")}
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/appointments">
              {t("appointment")}
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/bookinghistory">
              {t("history")}
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/doctorList">
              {t("doctor_list")}
            </MenuItem>

            <MenuItem onClick={handleClose} component={Link} to="/userprofile">
              {t("personal_information")}
            </MenuItem>
            <MenuItem onClick={hadleLogout}>{t("logout")}</MenuItem>
          </Menu>
        </>
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
    </div>
  );
}
