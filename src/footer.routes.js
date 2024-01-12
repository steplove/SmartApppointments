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
    route: "/",
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
        { name: "director", href: "/CEO" },
        {
          name: "message_from_the_director",
          href: "/Message_From_Ceo",
        },
        {
          name: "message_from_hospital_director",
          href: "/Message_From_Hospital_Director",
        },
        {
          name: "hospital_history",
          href: "/history",
        },
        {
          name: "vision_and_mission",
          href: "/Vision_And_Mission",
        },
        {
          name: "accreditation",
          href: "/Accreditation",
        },
      ],
    },
    {
      name: "medical_service_center",
      items: [
        {
          name: "medical_service_center",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/clinics_and_centers",
        },
      ],
    },
    {
      name: "our_services",
      items: [
        {
          name: "room_services",
          href: "/ServicesRooms",
        },
        {
          name: "packages",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/packages_and_promotions",
        },
        {
          name: "health_articles",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/health_articles",
        },
        { name: "news", href: "https://www.kasemrad.co.th/Sriburin/th/site/news" },
      ],
    },
    {
      name: "search_for_a_doctor",
      items: [{ name: "search_for_a_doctor", href: "/doctorListHome" }],
    },
    {
      name: "contact",
      items: [{ name: "contact", href: "https://www.kasemrad.co.th/Sriburin/th/site/contact_us" }],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Kasemrad{" "}
      <MKTypography
        component="a"
        href="#"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        Sriburin Hospital
      </MKTypography>
      .
    </MKTypography>
  ),
};
