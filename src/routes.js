import HomeIcon from "@mui/icons-material/Home";
import PersonAddAlt1SharpIcon from "@mui/icons-material/PersonAddAlt1Sharp";
import LoginIcon from "@mui/icons-material/Login";
import PresentationPage from "layouts/pages/presentation";
import Agreement from "pages/LandingPages/Agreement";
import SignInBasic from "pages/LandingPages/SignIn";
const routes = [
  {
    name: "หน้าหลัก",
    icon: <HomeIcon />,
    route: "/presentation",
    component: <PresentationPage />,
    dropdown: false,
  },
  {
    name: "สมัครสมาชิก",
    icon: <PersonAddAlt1SharpIcon />,
    route: "/agreement",
    component: <Agreement />,
    dropdown: false,
  },
  {
    name: "เข้าสู่ระบบ",
    icon: <LoginIcon />,
    route: "/signIn",
    component: <SignInBasic />,
    dropdown: false,
  },
];

export default routes;
