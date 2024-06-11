import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, CardMedia, Container, Hidden } from "@mui/material";
import axios from "axios";
import { BASE_URL, token } from "constants/constants";
import MKTypography from "components/MKTypography";
import MKBox from "components/MKBox";
import DefaultFooter from "../../../../../src/lineliff_files/examples/Footers/DefaultFooter";
import footerRoutes from "../../../../../src/lineliff_files/footer.routes";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "../../../../../src/lineliff_files/routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
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

  const [BlogData, setBlogData] = useState([]);
  const [openLoad, setopenLoad] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/blogShow`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedBlogs = response.data;

        if (fetchedBlogs && Array.isArray(fetchedBlogs)) {
          setBlogData(fetchedBlogs);
          setopenLoad(true);
        } else {
          console.error("Error fetching packages");
          // Use Swal to show an error message and then reload the page
          await Swal.fire({
            icon: "error",
            title: "Error fetching packages",
            text: "An error occurred while fetching packages. Please try again.",
          });

          // Reload the page
          window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const blogDetail = (code) => {
    window.location.href = `/liff/HealthBlogListDetail/${code}`;
  };
  // ตรวจสอบสถานะการโหลด หากกำลังโหลดข้อมูล แสดงข้อความ "Loading..."
  if (!openLoad) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div>
          <div style={{ textAlign: "center" }}>
            <CircularProgress color="primary" />
          </div>
          <p style={{ margin: "10px", color: "#333" }}>Loading ...</p>
        </div>
      </div>
    );
  }
  return (
    <Grid>
      <DefaultNavbar routes={routes} sticky relative />
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Container maxWidth="md" sx={{ paddingTop: "1%", paddingBottom: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <a href="/liff/presentation" style={{ color: "#808080", fontSize: "1.0rem" }}>
                  {t("home")} /
                </a>
                <a href="/liff/HealthBlogList" style={{ color: "#0bb288", fontSize: "1.0rem" }}>
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
                        image={`${blog.Blog_ImageBanner}`}
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
                          dangerouslySetInnerHTML={{ __html: blog.Blog_Detail }}
                        />

                        <MKTypography
                          sx={{
                            color: "#0bb288",
                            fontSize: "15px",
                            textAlign: "center",
                            textDecoration: "underline",
                            alignSelf: "flex-end",
                            cursor: "pointer",
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
                <a href="/liff/presentation" style={{ color: "#808080", fontSize: "1.0rem" }}>
                  {t("home")} /
                </a>
                <a href="/liff/HealthBlogList" style={{ color: "#0bb288", fontSize: "1.0rem" }}>
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
                    image={`${blog.Blog_ImageBanner}`}
                  />
                  <CardContent>
                    <MKTypography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                      {blog.Blog_Name}
                    </MKTypography>
                    <MKTypography
                      sx={{ color: "#808080", fontSize: "15px" }}
                      dangerouslySetInnerHTML={{ __html: blog.Blog_Detail }}
                    />
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
    </Grid>
  );
}

export default HealthBlogList;
