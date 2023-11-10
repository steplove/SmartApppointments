import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import reportWebVitals from "./reportWebVitals";
// import liff from "@line/liff";
const root = ReactDOM.createRoot(document.getElementById("root"));
// liff.init({ liffId: "2000414649-29Q1LMp4" }).then(() => {
//   // ตรวจสอบสถานะการเข้าสู่ระบบ
//   if (!liff.isLoggedIn()) {
//     liff.login();
//   }
// });
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
reportWebVitals();
