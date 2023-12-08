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
      name: "เกี่ยวกับเรา",
      items: [
        { name: "ผู้บริหาร", href: "https://www.kasemrad.co.th/Sriburin/th/site/about_us/ceo" },
        {
          name: "สาส์นจากประธานกรรมการ",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/about_us/message_from_ceo",
        },
        {
          name: "สาส์นจากผู้อำนวยการโรงพยาบาล",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/about_us/message_from_hospital_director",
        },
        {
          name: "ประวัติโรงพยาบาล",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/about_us/history",
        },
        {
          name: "วิสัยทัศน์และพันธกิจ",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/about_us/vision_and_mission",
        },
        {
          name: "รางวัลแห่งความสำเร็จ",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/about_us/accreditation",
        },
      ],
    },
    {
      name: "ศูนย์บริการทางการแพทย์",
      items: [
        {
          name: "ศูนย์บริการทางการแพทย์",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/clinics_and_centers",
        },
      ],
    },
    {
      name: "บริการของเรา",
      items: [
        {
          name: "บริการห้องพัก/สิ่งอำนวยความสะดวก",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/services",
        },
        {
          name: "แพ็คเกจ&โปรโมชั่น",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/packages_and_promotions",
        },
        {
          name: "บทความเพื่อสุขภาพ",
          href: "https://www.kasemrad.co.th/Sriburin/th/site/health_articles",
        },
        { name: "ข่าวสาร", href: "https://www.kasemrad.co.th/Sriburin/th/site/news" },
      ],
    },
    {
      name: "ค้นหาแพทย์",
      items: [{ name: "แพทย์", href: "/doctorListHome" }],
    },
    {
      name: "ติดต่อ/สมัครงาน",
      items: [{ name: "ติดต่อ", href: "https://www.kasemrad.co.th/Sriburin/th/site/contact_us" }],
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
