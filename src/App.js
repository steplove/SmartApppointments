import { useEffect } from "react";
import { Route, useLocation, Routes } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import SignInBasic from "pages/LandingPages/SignIn";
import SigninCheckup from "pages/LandingPages/SigninCheckup";
import Register from "pages/LandingPages/Register";
import Agreement from "pages/LandingPages/Agreement";
import Dashboard from "pages/LandingPages/Dashboard";
import DashboardCheckup from "pages/LandingPages/DashboardCheckUp";
import Appointments from "pages/LandingPages/Appointments";
import BookingHistory from "pages/LandingPages/BookingHistory";
import UserProfile from "pages/LandingPages/UserProfile";
import UserProfileCheckup from "pages/LandingPages/UserProfileCheckup";
import DoctorList from "pages/LandingPages/DoctorList";
import DoctorListHome from "pages/LandingPages/DoctorListHome";
import DoctorListCheckUP from "pages/LandingPages/DoctorListCheckUP";
import Main from "pages/LandingPages/Main";
import Agree from "pages/LandingPages/Agree";
import ForgotPassword from "pages/LandingPages/ForgotPassword";
import ForgotOTP from "pages/OTP/ForGotOTP";
import ConfOTP from "pages/OTP/ConfOTP";
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
import OTP from "pages/OTP";
import PDFupload from "pages/LandingPages/Pdfupload";
import "i18n";
// Material Kit 2 React routes
import routes from "routes";
import "App.css";
import LIFFPresentation from "lineliff_files/layouts/pages/presentation";
import LIFFSignInBasic from "lineliff_files/pages/LandingPages/SignIn";
import LIFFSigninCheckup from "lineliff_files/pages/LandingPages/SigninCheckup";
import LIFFRegister from "lineliff_files/pages/LandingPages/Register";
import LIFFAgreement from "lineliff_files/pages/LandingPages/Agreement";
import LIFFDashboard from "lineliff_files/pages/LandingPages/Dashboard";
import LIFFDashboardCheckup from "lineliff_files/pages/LandingPages/DashboardCheckUp";
import LIFFAppointments from "lineliff_files/pages/LandingPages/Appointments";
import LIFFBookingHistory from "lineliff_files/pages/LandingPages/BookingHistory";
import LIFFUserProfile from "lineliff_files/pages/LandingPages/UserProfile";
import LIFFUserProfileCheckup from "lineliff_files/pages/LandingPages/UserProfileCheckup";
import LIFFDoctorList from "lineliff_files/pages/LandingPages/DoctorList";
import LIFFDoctorListHome from "lineliff_files/pages/LandingPages/DoctorListHome";
import LIFFDoctorListCheckUP from "lineliff_files/pages/LandingPages/DoctorListCheckUP";
import LIFFMain from "lineliff_files/pages/LandingPages/Main";
import LIFFAgree from "lineliff_files/pages/LandingPages/Agree";
import LIFFForgotPassword from "lineliff_files/pages/LandingPages/ForgotPassword";
import LIFFForgotOTP from "lineliff_files/pages/OTP/ForGotOTP";
import LIFFConfOTP from "lineliff_files/pages/OTP/ConfOTP";
import LIFFPackages from "lineliff_files/pages/LandingPages/Packages";
import LIFFPackagesDetail from "lineliff_files/pages/LandingPages/Packages/PackagesDetail";
import LIFFHealthBlogListDetail from "lineliff_files/pages/LandingPages/HealthBlogList/HealthBlogListDetail";
import LIFFResetPassword from "lineliff_files/pages/LandingPages/ResetPassword";
import LIFFHealthBlogList from "lineliff_files/pages/LandingPages/HealthBlogList";
import LIFFCEO from "lineliff_files/pages/AboutUs/CEO";
import LIFFMessage_From_Ceo from "lineliff_files/pages/AboutUs/Message_From_Ceo";
import LIFFMessage_From_Hospital_Director from "lineliff_files/pages/AboutUs/Message_From_Hospital_Director";
import LIFFHistory from "lineliff_files/pages/AboutUs/History";
import LIFFVision_And_Mission from "lineliff_files/pages/AboutUs/Vision_And_Mission";
import LIFFAccreditation from "lineliff_files/pages/AboutUs/Accreditation";
import LIFFServicesRooms from "lineliff_files/pages/OurServices/ServicesRooms";
import LIFFServicesRoomsDetail from "lineliff_files/pages/OurServices/ServicesRooms/ServicesRoomsDetail";
import LIFFMedicalServiceCenter from "lineliff_files/pages/MedicalServiceCenter/MedicalServiceCenter";
import LIFFContact from "lineliff_files/pages/Contact";
import LIFFMyMap from "lineliff_files/pages/Map";
import LIFFOTP from "lineliff_files/pages/OTP";
// import lineliff_files from "lineliff_files";
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
      {/* <lineliff_files /> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {getRoutes(routes)}
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/signInBasic" element={<SignInBasic />} />
          <Route path="/signinCheckup" element={<SigninCheckup />} />
          <Route path="/register" element={<Register />} />
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardcheckup" element={<DashboardCheckup />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/bookinghistory" element={<BookingHistory />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/userprofileCheckup" element={<UserProfileCheckup />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packagesdetail/:code" element={<PackagesDetail />} />
          <Route path="/HealthBlogListDetail/:code" element={<HealthBlogListDetail />} />
          <Route path="/healthblogList" element={<HealthBlogList />} />
          <Route path="/doctorList" element={<DoctorList />} />
          <Route path="/doctorListHome" element={<DoctorListHome />} />
          <Route path="/DoctorListCheckUP" element={<DoctorListCheckUP />} />
          <Route path="/main" element={<Main />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/forgototp" element={<ForgotOTP />} />
          <Route path="/confOTP/:mobileNo/:surveyid" element={<ConfOTP />} />
          <Route path="/resetpassword/:mobileNo/:surveyid" element={<ResetPassword />} />
          <Route path="/agree" element={<Agree />} />
          <Route path="/CEO" element={<CEO />} />
          <Route path="/history" element={<History />} />
          <Route path="/Message_From_Ceo" element={<Message_From_Ceo />} />
          <Route path="/PDFupload" element={<PDFupload />} />
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
          <Route path="/OTP/:mobileNo/:surveyid" element={<OTP />} />
          {/* <-----> */}
          <Route path="/liff/presentation" element={<LIFFPresentation />} />
          <Route path="/liff/signInBasic" element={<LIFFSignInBasic />} />
          <Route path="/liff/signinCheckup" element={<LIFFSigninCheckup />} />
          <Route path="/liff/register" element={<LIFFRegister />} />
          <Route path="/liff/agreement" element={<LIFFAgreement />} />
          <Route path="/liff/dashboard" element={<LIFFDashboard />} />
          <Route path="/liff/dashboardcheckup" element={<LIFFDashboardCheckup />} />
          <Route path="/liff/appointments" element={<LIFFAppointments />} />
          <Route path="/liff/bookinghistory" element={<LIFFBookingHistory />} />
          <Route path="/liff/userprofile" element={<LIFFUserProfile />} />
          <Route path="/liff/userprofileCheckup" element={<LIFFUserProfileCheckup />} />
          <Route path="/liff/packages" element={<LIFFPackages />} />
          <Route path="/liff/packagesdetail/:code" element={<LIFFPackagesDetail />} />
          <Route path="/liff/HealthBlogListDetail/:code" element={<LIFFHealthBlogListDetail />} />
          <Route path="/liff/healthblogList" element={<LIFFHealthBlogList />} />
          <Route path="/liff/doctorList" element={<LIFFDoctorList />} />
          <Route path="/liff/doctorListHome" element={<LIFFDoctorListHome />} />
          <Route path="/liff/DoctorListCheckUP" element={<LIFFDoctorListCheckUP />} />
          <Route path="/liff/main" element={<LIFFMain />} />
          <Route path="/liff/forgotpassword" element={<LIFFForgotPassword />} />
          <Route path="/liff/forgototp" element={<LIFFForgotOTP />} />
          <Route path="/liff/confOTP/:mobileNo/:surveyid" element={<LIFFConfOTP />} />
          <Route path="/liff/resetpassword/:mobileNo/:surveyid" element={<LIFFResetPassword />} />
          <Route path="/liff/agree" element={<LIFFAgree />} />
          <Route path="/liff/CEO" element={<LIFFCEO />} />
          <Route path="/liff/history" element={<LIFFHistory />} />
          <Route path="/liff/Message_From_Ceo" element={<LIFFMessage_From_Ceo />} />
          <Route
            path="/liff/Message_From_Hospital_Director"
            element={<LIFFMessage_From_Hospital_Director />}
          />
          <Route path="/liff/Vision_And_Mission" element={<LIFFVision_And_Mission />} />
          <Route path="/liff/Accreditation" element={<LIFFAccreditation />} />
          <Route path="/liff/ServicesRooms" element={<LIFFServicesRooms />} />
          <Route path="/liff/ServicesRoomsDetail/:code" element={<LIFFServicesRoomsDetail />} />
          <Route path="/liff/MedicalServiceCenter" element={<LIFFMedicalServiceCenter />} />
          <Route path="/liff/Contact" element={<LIFFContact />} />
          <Route path="/liff/MyMap" element={<LIFFMyMap />} />
          <Route path="/liff/OTP/:mobileNo/:surveyid" element={<LIFFOTP />} />
          {/* <Route path="*" element={<Navigate to="/presentation" />} /> */}
        </Routes>
      </ThemeProvider>
    </>
  );
}
