// LanguageSelector.js
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    console.log("LanguageSelector - handleClick"); // Debug statement
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("LanguageSelector - handleClose"); // Debug statement
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    console.log("LanguageSelector - changeLanguage", lng); // Debug statement
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    handleClose();
  };

  return (
    <Grid>
      <span
        onClick={handleClick}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontSize: "0.9rem",
        }}
      >
        <FaGlobe style={{ marginRight: "8px", fill: "#344767" }} /> {t("changeLanguage")}
      </span>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        // anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        // transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => changeLanguage("th")}>
          <img
            src="https://img.freepik.com/free-vector/illustration-thailand-flag_53876-27145.jpg?t=st=1723088704~exp=1723092304~hmac=47bf31062a4812a1b34656e8d7f7e4b3359f3adfd7fe5676c590b4368778f348&w=1480"
            alt="Thai Flag"
            style={{ width: "20px", height: "auto" }}
          />
          &nbsp;
          {t("ไทย")}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("en")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/800px-Flag_of_the_United_States.png"
            alt="USA Flag"
            style={{ width: "20px", height: "auto" }}
          />
          &nbsp;
          {t("English")}
        </MenuItem>
        {/* <MenuItem onClick={() => changeLanguage("lo")}>
          <span role="img" aria-label="Laos Flag">
            🇱🇦
          </span>{" "}
          {t("ລາວ")}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("zh")}>
          <span role="img" aria-label="Chinese Flag">
            🇨🇳
          </span>{" "}
          {t("Chinese")}
        </MenuItem> */}
        {/* Add more MenuItem components for other languages */}
      </Menu>
    </Grid>
  );
};

export default LanguageSelector;
