// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import { useTranslation } from "react-i18next";

function DefaultFooter({ content }) {
  const { socials = [], menus = [], copyright = "" } = content || {};
  const { t } = useTranslation();

  // brand,
  return (
    <MKBox component="footer">
      <Container>
        <Grid container spacing={1}>
          {menus.map(({ name: title, items }) => (
            <Grid
              key={title}
              item
              xs={6}
              md={2}
              sx={{ mb: 3, alignItems: "center", justifyItems: "center" }}
            >
              <MKTypography
                display="block"
                variant="button"
                fontWeight="bold"
                textTransform="capitalize"
                mb={1}
                sx={{ fontSize: "16px" }}
              >
                {t(title)}

                <MKTypography
                  sx={{ borderBottom: "2px solid #562170", width: "40px" }}
                ></MKTypography>
              </MKTypography>
              <MKBox component="ul" p={0} m={0} sx={{ listStyle: "none" }}>
                {items.map(({ name, route, href }) => (
                  <MKBox key={name} component="li" p={0} m={0} lineHeight={1.25}>
                    {href ? (
                      <MKTypography
                        component="a"
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        variant="button"
                        fontWeight="regular"
                        textTransform="capitalize"
                        sx={{ fontSize: "14px" }}
                      >
                        {t(name)}
                      </MKTypography>
                    ) : (
                      <MKTypography
                        component={Link}
                        to={route}
                        variant="button"
                        fontWeight="regular"
                        textTransform="capitalize"
                      >
                        {t(name)}
                      </MKTypography>
                    )}
                  </MKBox>
                ))}
              </MKBox>
            </Grid>
          ))}
          <MKTypography sx={{ borderBottom: "4px solid #0bb288", width: "100%" }}></MKTypography>
          <Grid item xs={12} sx={{ textAlign: "center", my: 1 }}>
            {copyright}
            <MKBox alignItems="center" mt={0}>
              {socials.map(({ icon, link }, key) => (
                <MKTypography
                  key={link}
                  component="a"
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  variant="h5"
                  color="dark"
                  opacity={0.8}
                  mr={key === socials.length - 1 ? 0 : 2.5}
                >
                  {icon}
                </MKTypography>
              ))}
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

// Typechecking props for the DefaultFooter
DefaultFooter.propTypes = {
  content: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])).isRequired,
};

export default DefaultFooter;
