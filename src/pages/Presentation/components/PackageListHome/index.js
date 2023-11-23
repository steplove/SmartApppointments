import React from "react";

function PackageListHome() {
  return (
    <>
      <p
        style={{
          variant: "button",
          fontWeight: "bold",
          textTransform: "capitalize",
          mb: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        แพ็กเกจแนะนำ
        <p style={{ borderBottom: "2px solid #0bb288", width: "40px" }}></p>
      </p>
    </>
  );
}

export default PackageListHome;
