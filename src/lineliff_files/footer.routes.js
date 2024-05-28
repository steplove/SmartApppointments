// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/logo200.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Smart Appointments",
    image: logoCT,
    route: "/liff/presentation",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/Sriburin.KSBR",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/Sriburin_Cr",
    },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/channel/UCNR77-R1cdCwD2MYncGpF-w/videos",
    },
  ],
  menus: [
    {
      name: "about",
      items: [
        { name: "director", route: "/liff/CEO" },
        {
          name: "message_from_the_director",
          route: "/liff/Message_From_Ceo",
        },
        {
          name: "message_from_hospital_director",
          route: "/liff/Message_From_Hospital_Director",
        },
        {
          name: "hospital_history",
          route: "/liff/history",
        },
        {
          name: "vision_and_mission",
          route: "/liff/Vision_And_Mission",
        },
        {
          name: "accreditation",
          route: "/liff/Accreditation",
        },
      ],
    },
    {
      name: "medical_service_center",
      items: [
        // {
        //   name: "medical_service_center",
        //   route: "/liff/MedicalServiceCenter",
        // },
      ],
    },
    {
      name: "our_services",
      items: [
        {
          name: "room_services",
          route: "/liff/ServicesRooms",
        },
        {
          name: "packages",
          route: "/liff/packages",
        },
        {
          name: "health_articles",
          route: "/liff/HealthBlogList",
        },
        // { name: "news", route: "/liffhttps://www.kasemrad.co.th/Sriburin/th/site/news" },
      ],
    },
    {
      name: "search_for_a_doctor",
      items: [{ name: "search_for_a_doctor", route: "/liff/doctorListHome" }],
    },
    {
      name: "contact",
      items: [{ name: "contact", route: "/liff/Contact" }],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Kasemrad{" "}
      <MKTypography
        component="a"
        route="#"
        // target="_blank"
        // rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Sriburin Hospital
      </MKTypography>
      .
    </MKTypography>
  ),
};
