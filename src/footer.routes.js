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
        { name: "ผู้บริหาร", href: "#" },
        { name: "สาส์นจากประธานกรรมการ", href: "#" },
        { name: "สาส์นจากผู้อำนวยการโรงพยาบาล", href: "#" },
        { name: "ประวัติโรงพยาบาล", href: "#" },
        { name: "วิสัยทัศน์และพันธกิจ", href: "#" },
        { name: "รางวัลแห่งความสำเร็จ", href: "#" },
      ],
    },
    {
      name: "ศูนย์บริการทางการแพทย์",
      items: [{ name: "", href: "#" }],
    },
    {
      name: "บริการของเรา",
      items: [
        { name: "บริการห้องพัก/สิ่งอำนวยความสะดวก", href: "#" },
        { name: "แพ็คเกจ&โปรโมชั่น", href: "#" },
        { name: "บทความเพื่อสุขภาพ", href: "#" },
        { name: "ข่าวสาร", href: "#" },
      ],
    },
    {
      name: "ค้นหาแพทย์",
      items: [{ name: "", href: "#" }],
    },
    {
      name: "ติดต่อ/สมัครงาน",
      items: [{ name: "", href: "#" }],
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
