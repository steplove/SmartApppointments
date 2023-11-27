import React from "react";
import { Card, CardContent, Grid, CardMedia, Button } from "@mui/material";
import "./HealthBlog.css";
import Blog1 from "../../../../assets/images/Blog1.png";
import Blog2 from "../../../../assets/images/Blog2.jpg";
import MKTypography from "components/MKTypography";

const HealthBlog = () => {
  const Blog = [
    {
      Blog_Name: "ทำความรู้จักกับโรคทางพันธุกรรรมที่ถ่ายทอดสู่ลูกได้",
      Blog_Detail:
        "ในแต่ละปี มีผู้ป่วยจำนวนมากมายที่ได้รับการวินิจฉัยว่าเป็นโรคเรื้อรัง รวมถึงโรคหายากอื่นๆ โรคเหล่านี้อาจเป็นโรคที่ถ่ายทอดทางพันธุกรรม ที่บางครั้งพ่อแม่ไม่มีอาการ แต่มียีนผิดปกติแฝงอยู่ในร่างกายและเป็น “พาหะ” ถ่ายทอดไปยังลูก ทำให้ลูกสามารถเป็นโรคได้",
      Blog_Image: Blog1,
    },
    {
      Blog_Name: "โรคพันธุกรรมของกล้ามเนื้อ หนึ่งในโรคที่เกิดจากพันธุกรรม",
      Blog_Detail:
        "ในการศึกษาวิจัยพบว่าคนประมาณ 22 คนใน 100,000 คนทั่วโลกเป็นโรคกล้ามเนื้อที่มาจากพันธุกรรม ถึงแม้เป็นโรคที่หายากแต่หากนับจำนวนผู้ป่วยทั่วโลกก็ถือว่าไม่น้อยเลย โรคพันธุกรรมของกล้ามเนื้อมีหลากหลายชนิด หลายร้อยโรค โดยแบ่งออกได้ เป็น 4 กลุ่มใหญ่ๆ",
      Blog_Image: Blog2,
    },
    {
      Blog_Name: "Pharmacogenomics ในผู้ป่วยลมชัก",
      Blog_Detail:
        "ในผู้ป่วยโรคลมชักการใช้ยากันชักเพื่อคุมอาการเป็นวิธีการรักษาที่สะดวกและได้ผลลัพธ์ที่อย่างไรก็ตามแม้จะมีการใช้ยากันชักที่มีประสิทธิภาพดีแล้ว แต่ผู้ป่วยโรคลมชักบางรายอาจไม่ตอบสนองต่อการรักษาเลยและจำเป็นต้องเปลี่ยนไปใช้ยาตัวอื่นแทน",
      Blog_Image: Blog2,
    },
    // เพิ่มบทความต่อไปตามต้องการ
  ];

  return (
    <>
      <p
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
        บทความเกษมราษฎร์
        <p style={{ borderBottom: "2px solid #0bb288", width: "40px" }}></p>
      </p>
      <Grid
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
        {Blog.map((blog) => (
          <Card
            key={blog.id}
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
              image={blog.Blog_Image}
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
                }}
              >
                อ่านเพิ่มเพิม
              </MKTypography>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          xs={12}
          sx={{
            color: "#FFFFFF",
            background: "#0bb288",
            fontSize: "12px",
            minHeight: "20px", // ปรับขนาดตามที่คุณต้องการ
          }}
        >
          ดูบทความทั้งหมด
        </Button>
      </div>
    </>
  );
};

export default HealthBlog;
