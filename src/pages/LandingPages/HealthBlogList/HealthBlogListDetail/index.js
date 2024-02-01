import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, CardMedia, Grid, Hidden } from "@mui/material";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import MKBox from "components/MKBox";
import { useParams } from "react-router-dom";
import { BASE_URL } from "constants/constants";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import routes from "routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
function HealthBlogListDetail() {
  const { code } = useParams();
  const [selectedBlog, setSelectedBlog] = useState(null);
  console.log(code);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/searchBlogsDetail/${code}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();

        // อัพเดต state ด้วยข้อมูลที่แปลงแล้ว
        setSelectedBlog(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, [code]);

  return (
    <Grid>
      <DefaultNavbar routes={routes} />
      <ThemeProvider theme={theme}>
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <Container maxWidth="md" sx={{ paddingTop: "5%", paddingBottom: 4 }}>
            {selectedBlog ? (
              <Grid>
                <Typography sx={{ marginBottom: 2, fontSize: "1.5rem" }}>
                  {selectedBlog.Blog_Name}
                </Typography>
                <Grid container justifyContent="center">
                  <Grid item lg={12}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="auto"
                        image={`${BASE_URL}/${selectedBlog.Blog_Image}`}
                        alt="รูปภาพแพ็คเกจ"
                      />
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item lg={12}>
                            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                              {selectedBlog.Blog_Name}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ marginBottom: 2, color: "#808080" }}
                            >
                              <Grid
                                dangerouslySetInnerHTML={{ __html: selectedBlog.Blog_Detail }}
                              />
                            </Typography>
                          </Grid>
                          <Grid item lg={6}>
                            {/* ส่วนอื่น ๆ ที่ต้องการแสดง เช่น รายละเอียดเพิ่มเติม */}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="h4">Loading...</Typography>
            )}
          </Container>
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <Container maxWidth="md" sx={{ paddingTop: "25%", paddingBottom: 4 }}>
            {selectedBlog ? (
              <Grid>
                <Typography sx={{ marginBottom: 2, fontSize: "1.2rem" }}>
                  {selectedBlog.Blog_Name}
                </Typography>
                <Grid container justifyContent="center">
                  <Grid item lg={12}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="auto"
                        image={`${BASE_URL}/${selectedBlog.Blog_Image}`}
                        alt="รูปภาพแพ็คเกจ"
                      />
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item lg={6}>
                            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                              {selectedBlog.Blog_Name}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ marginBottom: 2, color: "#808080" }}
                            >
                              <Grid
                                dangerouslySetInnerHTML={{ __html: selectedBlog.Blog_Detail }}
                              />
                            </Typography>
                          </Grid>
                          <Grid item lg={6}>
                            {/* ส่วนอื่น ๆ ที่ต้องการแสดง เช่น รายละเอียดเพิ่มเติม */}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="h4">Loading...</Typography>
            )}
          </Container>
        </Hidden>
      </ThemeProvider>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </Grid>
  );
}

export default HealthBlogListDetail;
