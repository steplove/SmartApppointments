import React from "react";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import MKBoxRoot from "components/MKBox/MKBoxRoot";

const MKBox = forwardRef(
  (
    { variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow, children, ...rest },
    ref
  ) => {
    const hasChildren = React.Children.count(children) > 0;

    return (
      <MKBoxRoot
        {...rest}
        ref={ref}
        ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
      >
        {hasChildren ? children : null}
      </MKBoxRoot>
    );
  }
);

MKBox.defaultProps = {
  variant: "contained",
  bgColor: "transparent",
  color: "dark",
  opacity: 1,
  borderRadius: "none",
  shadow: "none",
  coloredShadow: "none",
};

MKBox.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  coloredShadow: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "none",
  ]),
  children: PropTypes.node,
};

export default MKBox;
