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
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { useTranslation } from "react-i18next";
import LanguageSelector from "LanguageSelector";

export default function MenuListCheckup() {
  const { t } = useTranslation();

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
    window.location.href = "/";
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
            to="/dashboardCheckup"
            value="/dashboardCheckup"
          />
          <BottomNavigationAction
            label={`${t("logout")}`}
            icon={<LogoutIcon />}
            component={Link}
            onClick={hadleLogout}
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
                Sriburin Checkup Center
              </Typography>
              <LanguageSelector />
            </Toolbar>
          </AppBar>
          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose} component={Link} to="/dashboardCheckup">
              {t("home")}
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
