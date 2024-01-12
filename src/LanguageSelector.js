// LanguageSelector.js
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
    <div>
      <p
        onClick={handleClick}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontSize: "0.9rem",
        }}
      >
        <FaGlobe style={{ marginRight: "8px", fill: "#344767" }} /> {t("changeLanguage")}
      </p>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        // anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        // transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => changeLanguage("th")}>
          <span role="img" aria-label="Thai Flag">
            🇹🇭
          </span>{" "}
          {t("ไทย")}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("en")}>
          <span role="img" aria-label="USA Flag">
            🇺🇸
          </span>{" "}
          {t("english")}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage("lo")}>
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
        </MenuItem>
        {/* Add more MenuItem components for other languages */}
      </Menu>
    </div>
  );
};

export default LanguageSelector;
