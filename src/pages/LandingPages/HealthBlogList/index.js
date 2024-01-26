import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, CardMedia, Container, Hidden } from "@mui/material";
import useFetch from "hooks/useFetch";
import { BASE_URL } from "constants/constants";
import MKTypography from "components/MKTypography";
import DefaultFooter from "examples/Footers/DefaultFooter";
import MKBox from "components/MKBox";
import footerRoutes from "footer.routes";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1280,
      lg: 1920,
      xl: 2560,
    },
  },
  palette: {
    primary: {
      main: "#6A0DAD", // สีม่วงเข้ม
    },
    secondary: {
      main: "#D1C4E9", // สีม่วงอ่อน
    },
  },
});
function HealthBlogList() {
  const { t } = useTranslation();

  const { data: fetchedBlogs = [] } = useFetch(`${BASE_URL}/api/blogShow`);
  const [BlogData, setBlogData] = useState([]);

  useEffect(() => {
    if (fetchedBlogs && Array.isArray(fetchedBlogs)) {
      setBlogData(fetchedBlogs);
    } else {
      console.error("Error fetching packages");
    }
  }, [fetchedBlogs]);
  const blogDetail = (code) => {
    window.location.href = `/packagesdetail/${code}`;
  };
  return (
    <>
      <DefaultNavbar routes={routes} sticky relative />
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Container maxWidth="md" sx={{ paddingTop: "1%", paddingBottom: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <a href="/" style={{ color: "#808080", fontSize: "1.0rem" }}>
                  {t("home")} /
                </a>
                <a href="/HealthBlogList" style={{ color: "#0bb288", fontSize: "1.0rem" }}>
                  {t("all_articles")}
                </a>
              </Grid>
            </Grid>

            <Grid container spacing={2} style={{ margin: "0 auto" }}>
              {BlogData.map((blog) => {
                return (
                  <Grid item key={blog.Blog_ID} xs={11} md={4}>
                    <Card
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: 400,
                        minHeight: 400,
                        margin: "0 5px",
                        marginBottom: "20px",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="150"
                        image={`${BASE_URL}/${blog.Blog_ImageBanner}`}
                        alt="รายละเอียดรูปภาพ"
                      />
                      <CardContent>
                        <MKTypography
                          sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}
                        >
                          {blog.Blog_Name}
                        </MKTypography>
                        <MKTypography
                          sx={{
                            color: "#808080",
                            fontSize: "15px",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 4, // จำนวนบรรทัดที่ต้องการแสดง
                            textOverflow: "ellipsis",
                            whiteSpace: "normal",
                            maxWidth: "100%",
                          }}
                        >
                          <div dangerouslySetInnerHTML={{ __html: blog.Blog_Detail }} />
                        </MKTypography>

                        <MKTypography
                          sx={{
                            color: "#0bb288",
                            fontSize: "15px",
                            textAlign: "center",
                            textDecoration: "underline",
                            alignSelf: "flex-end", // ทำให้อยู่ล่าง
                          }}
                          onClick={() => blogDetail(blog.Blog_ID)}
                        >
                          {t("read_more")}
                        </MKTypography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <Container maxWidth="md" sx={{ paddingTop: "0%", paddingBottom: 4 }}>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <a href="/" style={{ color: "#808080", fontSize: "1.0rem" }}>
                  {t("home")} /
                </a>
                <a href="/HealthBlogList" style={{ color: "#0bb288", fontSize: "1.0rem" }}>
                  {t("all_articles")}
                </a>
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={12}
              md={6}
              lg={12}
              spacing={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
              }}
            >
              {BlogData.map((blog) => (
                <Card
                  key={blog.Blog_ID}
                  sx={{
                    width: "100%", // ทำให้ Card มีความกว้างเต็มตาม container
                    height: "80%",
                    maxWidth: 450, // หากต้องการกำหนดขนาดมากสุดสำหรับ Card
                    minHeight: 400,
                    margin: "0 5px",
                    marginBottom: "20px", // เพิ่มขีดเส้นระหว่าง Card
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: "100%", // กำหนดความกว้างของรูป
                      height: "100%", // กำหนดความสูงของรูป
                      objectFit: "cover", // ให้รูปทำการ scale เพื่อให้เต็มพื้นที่ที่กำหนด
                    }}
                    image={`${BASE_URL}/${blog.Blog_ImageBanner}`}
                  />
                  <CardContent>
                    <MKTypography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                      {blog.Blog_Name}
                    </MKTypography>
                    <MKTypography sx={{ color: "#808080", fontSize: "15px" }}>
                      {blog.Blog_Detail}
                    </MKTypography>
                    <MKTypography
                      sx={{
                        color: "#0bb288",
                        fontSize: "15px",
                        textAlign: "center",
                        textDecoration: "underline",
                        alignSelf: "flex-end", // ทำให้อยู่ล่าง
                        cursor: "pointer",
                      }}
                      onClick={() => blogDetail(blog.packageCode)}
                    >
                      {t("read_more")}
                    </MKTypography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Container>
        </Hidden>
      </ThemeProvider>

      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default HealthBlogList;
