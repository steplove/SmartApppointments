import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, CardMedia, Button, Typography } from "@mui/material";
import "./HealthBlog.css";
import axios from "axios";
import { BASE_URL, token } from "constants/constants";
import { useTranslation } from "react-i18next";

const HealthBlog = () => {
  const { t } = useTranslation();

  const HealthBlogAll = () => {
    window.location.href = "/HealthBlogList";
  };
  const [BlogData, setBlogData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/showRandomBlogs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && Array.isArray(response.data)) {
        setBlogData(response.data);
      } else {
        console.error("Error: Unexpected response format", response);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error.message, error.response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const BlogsDetail = (codeID) => {
    window.location.href = `/HealthBlogListDetail/${codeID}`;
  };
  return (
    <Grid item>
      <span
        style={{
          variant: "button",
          fontWeight: "bold",
          textTransform: "capitalize",
          marginBottom: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "25px",
        }}
      >
        {t("kasemrad_article")}
        <span style={{ borderBottom: "2px solid #0bb288", width: "40px" }}></span>
      </span>
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
          marginTop: "2%",
        }}
      >
        {BlogData.map((blog) => (
          <Grid item key={BlogData.packageCode} xs={11} md={3}>
            <Card
              key={blog.Blog_ID}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: 450,
                minWidth: 100,
                minHeight: 400,
                margin: "0 5px",
                marginBottom: "20px",
              }}
            >
              <CardMedia
                component="img"
                height="150"
                sx={{
                  objectFit: "fill",
                }}
                image={`${blog.Blog_ImageBanner}`}
              />
              <CardContent>
                <Typography sx={{ color: "#0bb288", fontSize: "17px", fontWeight: "bold" }}>
                  {blog.Blog_Name}
                </Typography>
                <Typography
                  sx={{
                    color: "#808080",
                    fontSize: "15px",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 4,
                    textOverflow: "ellipsis",
                    whiteSpace: "normal",
                    maxWidth: "100%",
                  }}
                  dangerouslySetInnerHTML={{ __html: blog.Blog_Detail }}
                />

                <Typography
                  sx={{
                    color: "#0bb288",
                    fontSize: "15px",
                    textAlign: "center",
                    textDecoration: "underline",
                    alignSelf: "flex-end", // ทำให้อยู่ล่าง
                    cursor: "pointer",
                  }}
                  onClick={() => BlogsDetail(blog.Blog_ID)}
                >
                  {t("read_more")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid item style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          xs={12}
          sx={{
            color: "#FFFFFF",
            background: "#0bb288",
            fontSize: "12px",
            minHeight: "20px", // ปรับขนาดตามที่คุณต้องการ
          }}
          onClick={HealthBlogAll}
        >
          {t("view_all_articles")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default HealthBlog;
