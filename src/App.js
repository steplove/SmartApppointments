import { useEffect } from "react";
import { Route, Navigate, useLocation, Routes } from "react-router-dom";
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
import DoctorListHome from "pages/LandingPages/DoctorListHome";
import Main from "pages/LandingPages/Main";
import Agree from "pages/LandingPages/Agree";
import ForgotPassword from "pages/LandingPages/ForgotPassword";
import Packages from "pages/LandingPages/Packages";
import PackagesDetail from "pages/LandingPages/Packages/PackagesDetail";
import HealthBlogListDetail from "pages/LandingPages/HealthBlogList/HealthBlogListDetail";
import ResetPassword from "pages/LandingPages/ResetPassword";
import HealthBlogList from "pages/LandingPages/HealthBlogList";
import CEO from "pages/AboutUs/CEO";
import Message_From_Ceo from "pages/AboutUs/Message_From_Ceo";
import Message_From_Hospital_Director from "pages/AboutUs/Message_From_Hospital_Director";
import History from "pages/AboutUs/History";
import Vision_And_Mission from "pages/AboutUs/Vision_And_Mission";
import Accreditation from "pages/AboutUs/Accreditation";
import ServicesRooms from "pages/OurServices/ServicesRooms";
import ServicesRoomsDetail from "pages/OurServices/ServicesRooms/ServicesRoomsDetail";
import MedicalServiceCenter from "pages/MedicalServiceCenter/MedicalServiceCenter";
import Contact from "pages/Contact";
import MyMap from "pages/Map";
import "./i18n";
// Material Kit 2 React routes
import routes from "routes";
import "./App.css";
// import LiffComponent from "./LiffComponent";
export default function App() {
  const { pathname } = useLocation();
  // ตรวจสอบและอัปเดตภาษาเมื่อแอปโหลด

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
          <Route path="/packages" element={<Packages />} />
          <Route path="/packagesdetail/:code" element={<PackagesDetail />} />
          <Route path="/HealthBlogListDetail/:code" element={<HealthBlogListDetail />} />
          <Route path="/healthblogList" element={<HealthBlogList />} />
          <Route path="/doctorList" element={<DoctorList />} />
          <Route path="/doctorListHome" element={<DoctorListHome />} />
          <Route path="/main" element={<Main />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:UID" element={<ResetPassword />} />
          <Route path="/agree" element={<Agree />} />
          <Route path="/CEO" element={<CEO />} />
          <Route path="/history" element={<History />} />
          <Route path="/Message_From_Ceo" element={<Message_From_Ceo />} />
          <Route
            path="/Message_From_Hospital_Director"
            element={<Message_From_Hospital_Director />}
          />
          <Route path="/Vision_And_Mission" element={<Vision_And_Mission />} />
          <Route path="/Accreditation" element={<Accreditation />} />
          <Route path="/ServicesRooms" element={<ServicesRooms />} />
          <Route path="/ServicesRoomsDetail/:code" element={<ServicesRoomsDetail />} />
          <Route path="/MedicalServiceCenter" element={<MedicalServiceCenter />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/MyMap" element={<MyMap />} />
          <Route path="*" element={<Navigate to="/presentation" />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}
