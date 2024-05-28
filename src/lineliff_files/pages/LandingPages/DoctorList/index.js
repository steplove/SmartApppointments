import React, { useState, useEffect } from "react";
import {
  Typography,
  Hidden,
  Grid,
  Box,
  Button,
  Avatar,
  Card,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
// import { getStatusColor } from "components/StatusColor/getStatusColor";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuList from "../../../../../src/lineliff_files/pages/LandingPages/MenuLists";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonIcon from "@mui/icons-material/Person";
import { BASE_URL, token } from "../../../constants/constants";
import Pagination from "@mui/material/Pagination";
// import Foots from "components/Foot";

// import PaginationItem from "@mui/material/PaginationItem";
import CircularProgress from "@mui/material/CircularProgress";
import MKBox from "components/MKBox";
import DefaultFooter from "../../../../../src/lineliff_files/examples/Footers/DefaultFooter";
import footerRoutes from "../../../../../src/lineliff_files/footer.routes";
import axios from "axios";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1280,
      lg: 1920,
      xl: 2560,
    },
  },
  palette: {
    primary: {
      main: "#6A0DAD", // สีม่วงเข้ม
    },
    secondary: {
      main: "#D1C4E9", // สีม่วงอ่อน
    },
  },
});

function DoctorList() {
  const { t } = useTranslation();

  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [formData, setFormData] = useState({
    Clinic: "",
    Doctor: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseDoctor = await axios.get(`${BASE_URL}/api/doctors`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const responseClinics = await axios.get(`${BASE_URL}/api/showClinics`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (responseClinics.data && Array.isArray(responseClinics.data)) {
          setClinics(responseClinics.data);

          if (responseDoctor.data && Array.isArray(responseDoctor.data)) {
            setDoctors(responseDoctor.data);
          } else {
            console.error("Error fetching doctors");
          }
        } else {
          console.error("Error fetching clinics");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const fetchDoctors = async (ClinicID) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/searchDoctorClinic/${ClinicID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching Doctors:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "Clinic") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        Doctor: "",
        Date: null,
      }));
      fetchDoctors(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleDialogOpen = (DoctorID, imageUrl) => {
    const doctor = doctors.find((doctor) => doctor.DoctorID === DoctorID);
    setSelectedDoctor({
      ...doctor,
      Doctor_IMG: imageUrl, // เพิ่ม URL รูปภาพในข้อมูลที่จะแสดงในไดอล็อก
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5; // จำนวนรายการต่อหน้า
  const defaultDoctor = ["12943", "เเพทย์หญิงกชกร สันติมาลาพงษ์", "KOTCHAKORN SANTIMALAPONG"];
  let dataToPaginate = doctors || defaultDoctor; // กำหนดตัวแปรเริ่มต้นให้มีข้อมูลจาก doctors
  const paginatedData = dataToPaginate.slice(currentPage * perPage, (currentPage + 1) * perPage);
  //------------------------------------------------------------------------------------//
  const [openLoad, setopenLoad] = useState(false);
  useEffect(() => {
    if (doctors && clinics) {
      // ทำการ render หน้าเว็บใหม่
      setopenLoad(true);
    }
  }, [doctors, clinics]);
  // ตรวจสอบสถานะการโหลด หากกำลังโหลดข้อมูล แสดงข้อความ "Loading..."
  if (!openLoad) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div>
          <div style={{ textAlign: "center" }}>
            <CircularProgress color="primary" />
          </div>
          <p style={{ margin: "10px", color: "#333" }}>Loading ...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <MenuList />
      <Grid>
        <ThemeProvider theme={theme}>
          {/* Desktop/Tablet View */}
          <Hidden smDown>
            <Typography
              variant="h5"
              gutterBottom
              style={{
                color: theme.palette.primary.main,
                marginBottom: "20px",
                textAlign: "center",
                paddingTop: "0%",
              }}
            >
              {t("doctor_list")}
            </Typography>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              item
              lg={8}
              md={8}
              xs={8}
              sx={{ marginBottom: "20px", marginInline: "20%" }}
            >
              {/* คลินิก */}
              <FormControl fullWidth variant="outlined">
                <InputLabel>{t("clinic")}</InputLabel>
                <Select
                  label="คลินิก"
                  name="Clinic"
                  value={formData.Clinic}
                  style={{ height: "40px" }}
                  onChange={handleInputChange}
                >
                  {clinics &&
                    clinics.length > 0 &&
                    clinics.map((clinicName) => (
                      <MenuItem key={clinicName.Clinic_ID} value={clinicName.Clinic_ID}>
                        {clinicName.Clinic_Name}{" "}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {/* แพทย์ */}
            </Grid>
            {doctors.length === 0 ? (
              <Typography variant="h6" color="textSecondary" align="center">
                {t("no_information_found")}
              </Typography>
            ) : (
              <Grid container spacing={0} justifyContent="center">
                {paginatedData.map((doctor) => (
                  <Grid item key={doctor.DoctorID} xs={12} sm={6} md={4} lg={3}>
                    <Card
                      sx={{
                        textAlign: "center",
                        marginBottom: "20px",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "400px",
                        height: "700px",
                        marginInline: "10%",
                      }}
                    >
                      <Avatar
                        src={`${doctor.Doctor_IMG}`}
                        alt={doctor.Doctor_Name}
                        style={{
                          width: "300px",
                          height: "500px",
                          objectFit: "cover",
                          objectPosition: "center center",
                          borderRadius: "10px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          display: "flex",
                          marginLeft: "15%",
                          marginTop: "10px",
                        }}
                      />

                      <Grid item>
                        <Typography variant="h6">{doctor.Doctor_Name}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" color="textSecondary">
                          {doctor.Clinic_Name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1" color="textSecondary">
                          {t("doctor_expertise")}: {doctor.Doctor_Specialty}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={() => handleDialogOpen(doctor.DoctorID, `${doctor.Doctor_IMG}`)}
                          variant="contained"
                          color="primary"
                          style={{ borderRadius: "20px" }}
                        >
                          {t("view_details")}
                        </Button>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            <Dialog open={openDialog} onClose={handleDialogClose}>
              <DialogTitle>{t("doctor_details")}</DialogTitle>
              <DialogContent>
                <img
                  src={`${selectedDoctor.Doctor_IMG}`}
                  alt={selectedDoctor.Doctor_Name}
                  style={{
                    width: "200px", // ปรับขนาดของรูปภาพตามที่คุณต้องการ
                    height: "auto", // คุณสามารถปรับแต่งความสูงตามที่คุณต้องการ
                    display: "block",
                    margin: "0 auto", // จัดให้อยู่ตรงกลางแนวนอน
                  }}
                />

                <p>
                  {t("name")}: {selectedDoctor.Doctor_Name}
                </p>
                <p>
                  {" "}
                  {t("doctor_expertise")}: {selectedDoctor.Doctor_Specialty}
                </p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  {t("close")}
                </Button>
              </DialogActions>
            </Dialog>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={Math.ceil(doctors.length / perPage)}
                page={currentPage + 1}
                onChange={(event, page) => setCurrentPage(page - 1)}
                style={{ color: "red" }} // Change the color to red
              />
            </div>
            <MKBox pt={6} px={1} mt={6}>
              <DefaultFooter content={footerRoutes} />
            </MKBox>
          </Hidden>

          {/* Mobile View */}
          <Hidden smUp>
            <Typography
              variant="h5"
              gutterBottom
              style={{
                color: theme.palette.primary.main,
                marginBottom: "20px",
                textAlign: "center",
                marginTop: "-30px",
                paddingTop: "5%",
              }}
            >
              {t("doctor_list")}
            </Typography>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
              item
              lg={8}
              md={8}
              xs={8}
              sx={{ marginBottom: "20px", marginInline: "20%" }}
            >
              {/* คลินิก */}
              <FormControl fullWidth variant="outlined">
                <InputLabel>{t("clinic")}</InputLabel>
                <Select
                  label="คลินิก"
                  name="Clinic"
                  value={formData.Clinic}
                  style={{ height: "40px" }}
                  onChange={handleInputChange}
                >
                  {clinics &&
                    clinics.length > 0 &&
                    clinics.map((clinicName) => (
                      <MenuItem key={clinicName.Clinic_ID} value={clinicName.Clinic_ID}>
                        {clinicName.Clinic_Name}{" "}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {/* แพทย์ */}
            </Grid>
            {doctors.length === 0 ? (
              <Typography variant="h6" color="textSecondary" align="center">
                {t("no_information_found")}
              </Typography>
            ) : (
              paginatedData.map((doctor) => (
                <Card
                  key={doctor.DoctorID}
                  doctor={doctor}
                  style={{
                    maxWidth: "100%",
                    marginBottom: "20px",
                    borderRadius: "15px",
                  }}
                >
                  <Box display="flex" alignItems="center" p={2}>
                    <Avatar
                      src={`${doctor.Doctor_IMG}`}
                      alt={doctor.Doctor_Name}
                      style={{
                        objectFit: "scale-down",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        width: "80px",
                        height: "100px",
                      }}
                    />

                    <Box flexGrow={1} style={{ marginLeft: "10px" }}>
                      <Typography style={{ fontSize: "15px" }}>{doctor.Doctor_Name}</Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        style={{ fontSize: "12px" }}
                      >
                        {doctor.Clinic_Name}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: "20px", margin: "10px 0" }}
                        onClick={() => handleDialogOpen(doctor.DoctorID, `${doctor.Doctor_IMG}`)}
                      >
                        <Typography style={{ fontSize: "10px" }}>{t("view_details")}</Typography>
                      </Button>
                    </Box>
                  </Box>
                </Card>
              ))
            )}
            <Dialog open={openDialog} onClose={handleDialogClose}>
              <DialogTitle>{t("doctor_details")}</DialogTitle>
              <DialogContent>
                <img
                  src={`${selectedDoctor.Doctor_IMG}`}
                  alt={selectedDoctor.Doctor_Name}
                  style={{
                    width: "200px", // ปรับขนาดของรูปภาพตามที่คุณต้องการ
                    height: "auto", // คุณสามารถปรับแต่งความสูงตามที่คุณต้องการ
                    display: "block",
                    margin: "0 auto", // จัดให้อยู่ตรงกลางแนวนอน
                  }}
                />

                <p>
                  {t("name")}: {selectedDoctor.Doctor_Name}
                </p>
                <p>
                  {t("doctor_expertise")}: {selectedDoctor.Doctor_Specialty}
                </p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                  {t("close")}
                </Button>
              </DialogActions>
            </Dialog>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={Math.ceil(doctors.length / perPage)}
                page={currentPage + 1}
                onChange={(event, page) => setCurrentPage(page - 1)}
                style={{ color: "red" }} // Change the color to red
              />
            </div>
            <br />
            <br />
            <br />
          </Hidden>
        </ThemeProvider>
      </Grid>
      {/* <br />
      <br />
      <br />
      <br />
      <Foots /> */}
    </>
  );
}

export default DoctorList;
