import HomeIcon from "@mui/icons-material/Home";
import PersonAddAlt1SharpIcon from "@mui/icons-material/PersonAddAlt1Sharp";
import LoginIcon from "@mui/icons-material/Login";
import PresentationPage from "layouts/pages/presentation";
import Agreement from "lineliff_files/pages/LandingPages/Agreement";
import CEO from "lineliff_files/pages/AboutUs/CEO";
import Message_From_Ceo from "lineliff_files/pages/AboutUs/Message_From_Ceo";
import Message_From_Hospital_Director from "lineliff_files/pages/AboutUs/Message_From_Hospital_Director";
import Vision_And_Mission from "lineliff_files/pages/AboutUs/Vision_And_Mission";
import ServicesRooms from "lineliff_files/pages/OurServices/ServicesRooms";
import Accreditation from "lineliff_files/pages/AboutUs/Accreditation";
import History from "lineliff_files/pages/AboutUs/History";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InfoIcon from "@material-ui/icons/Info";
import ServicesIcon from "@material-ui/icons/Build";
import MedicalServicesIcon from "@material-ui/icons/LocalHospital";
import SearchDoctorIcon from "@material-ui/icons/Search";
import ContactJobIcon from "@material-ui/icons/Work";
import PackageAll from "lineliff_files/pages/LandingPages/Packages";
import HealthBlogList from "lineliff_files/pages/LandingPages/HealthBlogList";
import SignIn from "lineliff_files/pages/LandingPages/SignIn";
import DoctorListHome from "lineliff_files/pages/LandingPages/DoctorListHome";
import Contact from "lineliff_files/pages/Contact";
// import MedicalServiceCenter from "pages/MedicalServiceCenter/MedicalServiceCenter";

const routes = [
  {
    name: "home",
    icon: <HomeIcon />,
    route: "/liff/presentation",
    component: <PresentationPage />,
    dropdown: true,
  },
  {
    name: "register",
    icon: <PersonAddAlt1SharpIcon />,
    route: "/liff/agreement",
    component: <Agreement />,
    dropdown: true,
  },
  {
    name: "about",
    icon: <DashboardIcon />,
    collapse: [
      {
        name: "about_us",
        description: "view_all",
        icon: <InfoIcon />,
        dropdown: true,
        collapse: [
          {
            name: "director",
            route: "/liff/CEO",
            component: <CEO />,
          },
          {
            name: "message_from_the_director",
            route: "/liff/Message_From_Ceo",
            component: <Message_From_Ceo />,
          },
          {
            name: "message_from_hospital_director",
            route: "/liff/Message_From_Hospital_Director",
            component: <Message_From_Hospital_Director />,
          },
          {
            name: "hospital_history",
            route: "/liff/history",
            component: <History />,
          },
          {
            name: "vision_and_mission",
            route: "/liff/Vision_And_Mission",
            component: <Vision_And_Mission />,
          },
          {
            name: "accreditation",
            route: "/liff/Accreditation",
            component: <Accreditation />,
          },
        ],
      },
      {
        name: "our_services",
        description: "view_all",
        icon: <ServicesIcon />, // เพิ่ม icon ที่เกี่ยวข้อง
        dropdown: true,
        collapse: [
          {
            name: "room_services",
            route: "/liff/ServicesRooms",
            component: <ServicesRooms />,
          },
          {
            name: "packages",
            route: "/liff/packages",
            component: <PackageAll />,
          },
          {
            name: "health_articles",
            route: "/liff/HealthBlogList",
            component: <HealthBlogList />,
          },
          // {
          //   name: "news",
          //   route: "/liff/sections/input-areas/inputs",
          //   component: <CEO />,
          // },
        ],
      },
      {
        name: "medical_service_center",
        description: "view_all",
        icon: <MedicalServicesIcon />,
        dropdown: true,
        collapse: [
          // {
          //   name: "medical_service_center",
          //   route: "/liff/MedicalServiceCenter",
          //   component: <MedicalServiceCenter />,
          // },
        ],
      },
      {
        name: "search_for_a_doctor",
        description: "view_all",
        icon: <SearchDoctorIcon />,
        dropdown: true,
        collapse: [
          {
            name: "search_for_a_doctor",
            route: "/liff/doctorListHome",
            component: <DoctorListHome />,
          },
        ],
      },
      {
        name: "contact",
        description: "view_all",
        icon: <ContactJobIcon />,
        dropdown: true,
        collapse: [
          {
            name: "contact",
            route: "/liff/Contact",
            component: <Contact />,
          },
        ],
      },
    ],
  },
  {
    name: "login",
    icon: <LoginIcon />,
    route: "/liff/signInBasic",
    component: <SignIn />,
    dropdown: true,
  },
];

export default routes;
