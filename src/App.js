import { useEffect } from "react";
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
import Dashboard from "pages/LandingPages/Dashboard";
import Appointments from "pages/LandingPages/Appointments";
import BookingHistory from "pages/LandingPages/BookingHistory";
import UserProfile from "pages/LandingPages/UserProfile";
import DoctorList from "pages/LandingPages/DoctorList";
import Main from "pages/LandingPages/Main";
import Agree from "pages/LandingPages/Agree";
// Material Kit 2 React routes
import routes from "routes";
import "./App.css";
// import LiffComponent from "./LiffComponent";
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
    <>
      {/* <LiffComponent /> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {getRoutes(routes)}
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/signInBasic" element={<SignInBasic />} />
          <Route path="/register" element={<Register />} />
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/bookinghistory" element={<BookingHistory />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/doctorList" element={<DoctorList />} />
          <Route path="/main" element={<Main />} />
          <Route path="/agree" element={<Agree />} />
          <Route path="*" element={<Navigate to="/presentation" />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}
