import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, CardMedia, Button, Typography } from "@mui/material";
import "./HealthBlog.css";
import useFetch from "hooks/useFetch";
import { BASE_URL } from "constants/constants";
import { useTranslation } from "react-i18next";

const HealthBlog = () => {
  const { t } = useTranslation();

  const HealthBlogAll = () => {
    window.location.href = "/HealthBlogList";
  };
  const { data: fetchedBlogs = [] } = useFetch(`${BASE_URL}/api/showRandomBlogs`);
  const [BlogData, setBlogData] = useState([]);

  useEffect(() => {
    if (fetchedBlogs && Array.isArray(fetchedBlogs)) {
      setBlogData(fetchedBlogs);
    } else {
      console.error("Error fetching packages");
    }
  }, [fetchedBlogs]);
  const BlogsDetail = (codeID) => {
    window.location.href = `/HealthBlogListDetail/${codeID}`;
  };
  return (
    <Grid>
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
                width: "93%", // กำหนดความกว้างของรูป
                height: "100%", // กำหนดความสูงของรูป
                objectFit: "cover", // ให้รูปทำการ scale เพื่อให้เต็มพื้นที่ที่กำหนด
              }}
              image={`${BASE_URL}/${blog.Blog_ImageBanner}`}
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
                  WebkitLineClamp: 4, // จำนวนบรรทัดที่ต้องการแสดง
                  textOverflow: "ellipsis",
                  whiteSpace: "normal",
                  maxWidth: "100%",
                }}
              >
                <Grid dangerouslySetInnerHTML={{ __html: blog.Blog_Detail }} />
              </Typography>

              <Typography
                sx={{
                  color: "#0bb288",
                  fontSize: "15px",
                  textAlign: "center",
                  textDecoration: "underline",
                  alignSelf: "flex-end", // ทำให้อยู่ล่าง
                }}
                onClick={() => BlogsDetail(blog.Blog_ID)}
              >
                {t("read_more")}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <Grid style={{ textAlign: "center", marginTop: "20px" }}>
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
