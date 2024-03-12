import PropTypes from "prop-types";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import React, { useState } from "react";
import { BASE_URL } from "constants/constants";
import { useTranslation } from "react-i18next";

const ButtonWithHover = ({ file }) => {
  const [hovered, setHovered] = useState(false);
  const [isDownloading, setDownloading] = useState(false);
  const { t } = useTranslation();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleDownload = (filename) => {
    setDownloading(true);

    // หน่วงเวลา 2 วินาทีก่อนที่จะเริ่มดาวน์โหลด
    setTimeout(() => {
      const downloadLink = document.createElement("a");
      downloadLink.href = `${BASE_URL}/api/download-pdf/${filename}`;
      downloadLink.target = "_blank";
      downloadLink.download = filename;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setDownloading(false);
    }, 2000);
  };

  return (
    <div key={file} style={{ marginTop: 2 }}>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: isDownloading ? "#ccc" : hovered ? "purple" : "#0bb288",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: isDownloading ? "not-allowed" : "pointer",
          transition: "background-color 0.3s ease-in-out, transform 0.3s ease-in-out",
          transform: hovered && !isDownloading ? "scale(1.05)" : "scale(1)",
        }}
        onClick={() => !isDownloading && handleDownload(file)}
      >
        <span style={{ marginRight: "5px" }}>
          {isDownloading ? t("Downloading") : t("Download")}
        </span>
        <CloudDownloadIcon />
      </button>
    </div>
  );
};

ButtonWithHover.propTypes = {
  file: PropTypes.string.isRequired,
};

export default ButtonWithHover;
