import React from "react";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import CookieConsent from "react-cookie-consent";
import routes from "routes";
import Banner from "components/Banner";
import MKBox from "components/MKBox";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";

function Presentation() {
  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox
        position="relative"
        top={0}
        left={0}
        zIndex={2}
        width="100%"
        minHeight="10vh"
        sx={{
          backgroundColor: "#0fab84",
          filter: "blur(2px)", // คุณสามารถปรับค่าเบลอที่นี่
        }}
      ></MKBox>
      <MKBox sx={{ marginBottom: "20px" }}>
        <Banner />
      </MKBox>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
      <CookieConsent
        location="bottom"
        buttonText="อนุญาตคุกกี้ทั้งหมด"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#FFFFFF" }}
        buttonStyle={{ color: "#FFFFFF", fontSize: "13px", background: "#0bb288" }}
        expires={150}
      >
        <p style={{ fontSize: ".813rem", color: "#808080" }}>
          {" "}
          เมื่อคลิก “อนุญาตคุกกี้ทั้งหมด”
          หมายความว่าผู้ใช้งานยอมรับที่จะเปิดการใช้งานคุกกี้เพื่อวัตถุประสงค์ต่าง ๆ ดังต่อไปนี้
          เพื่อให้เว็บไซต์สามารถทำงานได้อย่างถูกต้องและเต็มประสิทธิภาพ
          เพื่อเปิดใช้คุณสมบัติของโซเชียลมีเดีย
          และเพื่อวิเคราะห์การเข้าใช้งานเพื่อนำข้อมูลไปใช้ในการทำการตลาดและการโฆษณา
          รวมถึงการแบ่งปันข้อมูลการใช้งานกับพาร์ทเนอร์โซเชียลมีเดีย
        </p>
      </CookieConsent>
    </>
  );
}

export default Presentation;
