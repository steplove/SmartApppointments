/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import SignInBasic from "pages/LandingPages/SignIn";
import Register from "pages/LandingPages/Register";
import Agreement from "pages/LandingPages/Agreement";
import MenuList from "pages/LandingPages/MenuLists";
import Dashboard from "pages/LandingPages/Dashboard";
import MainPage from "pages/MainPage";
import Appointments from "pages/LandingPages/Appointments";
import BookingHistory from "pages/LandingPages/BookingHistory";
import UserProfile from "pages/LandingPages/UserProfile";
import Author from "pages/LandingPages/Author";
import DoctorList from "pages/LandingPages/DoctorList";
import WaitVerify from "pages/LandingPages/WaitVerify";
import Test from "pages/LandingPages/Test";
// Material Kit 2 React routes
import routes from "routes";
import "./App.css";
export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route key={route} exact path={route.route} element={route.component} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/signInBasic" element={<SignInBasic />} />
        <Route path="/register" element={<Register />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/menuList" element={<MenuList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/bookinghistory" element={<BookingHistory />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/doctorList" element={<DoctorList />} />
        <Route path="/waitverify" element={<WaitVerify />} />
        <Route path="/author" element={<Author />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<Navigate to="/presentation" />} />
      </Routes>
    </ThemeProvider>
  );
}
