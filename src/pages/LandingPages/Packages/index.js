import React from "react";
import bgImage from "assets/images/hospital.png";
import MKBox from "components/MKBox";

function Packages() {
  return (
    <>
      <MKBox component="header" position="relative">
        <MKBox
          display="flex"
          alignItems="center"
          minHeight="100vh"
          sx={{
            backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.5),
                rgba(gradients.dark.state, 0.5)
              )}, url(${bgImage})`,

            backgroundSize: "cover",

            backgroundPosition: "center",
          }}
        ></MKBox>
      </MKBox>
    </>
  );
}

export default Packages;
