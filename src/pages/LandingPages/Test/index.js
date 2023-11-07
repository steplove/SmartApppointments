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
import MenuList from "../MenuLists";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonIcon from "@mui/icons-material/Person";
import { BASE_URL } from "../../../constants/constants";
import Pagination from "@mui/material/Pagination";
import Foots from "components/Foot";

// import PaginationItem from "@mui/material/PaginationItem";
import CircularProgress from "@mui/material/CircularProgress";

import useFetch from "../../../hooks/useFetch";
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
  const { data: fetchedDoctor = [] } = useFetch(`${BASE_URL}/api/doctors`);
  const { data: fetchedClinics = [] } = useFetch(`${BASE_URL}/api/showClinics`);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [formData, setFormData] = useState({
    Clinic: "",
    Doctor: "",
  });
  useEffect(() => {
    if (fetchedClinics && Array.isArray(fetchedClinics)) {
      setClinics(fetchedClinics);
      if (fetchedDoctor && Array.isArray(fetchedDoctor) && fetchDoctors !== null) {
        setDoctors(fetchedDoctor);
      } else {
        console.log("error");
      }
    } else {
      console.log("error");
    }
  }, [fetchedDoctor, fetchedClinics]);
  const fetchDoctors = async (ClinicID) => {
    try {
      const response = await fetch(`${BASE_URL}/api/searchDoctorClinic/${ClinicID}`);
      const data = await response.json();
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
    const doctor = fetchedDoctor.find((doctor) => doctor.DoctorID === DoctorID);
    setSelectedDoctor({
      ...doctor,
      Doctor_IMG: imageUrl, // เพิ่ม URL รูปภาพในข้อมูลที่จะแสดงในไดอล็อก
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // รายการแพทย์ (doctors) อยู่ใน State อื่น ๆ ที่คุณมีอยู่แล้ว

  // ฟังก์ชันสำหรับการค้นหา
  // const handleSearch = () => {
  //   handleInputChange();
  //   const requestData = {
  //     Doctor_Name: formData.Doctor,
  //     Clinic_ID: formData.Clinic,
  //   };

  //   const apiUrl = "http://localhost:3000/api/searchDoctor";

  //   fetch(apiUrl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(requestData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setSearchResults(data);
  //     })
  //     .catch((error) => {
  //       console.error("An error occurred while searching:", error);
  //     });
  // };
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5; // จำนวนรายการต่อหน้า
  const defaultDoctor = ["12943", "เเพทย์หญิงกชกร สันติมาลาพงษ์", "KOTCHAKORN SANTIMALAPONG"];
  let dataToPaginate = doctors || defaultDoctor; // กำหนดตัวแปรเริ่มต้นให้มีข้อมูลจาก doctors
  const paginatedData = dataToPaginate.slice(currentPage * perPage, (currentPage + 1) * perPage);
  //------------------------------------------------------------------------------------//
  // ตรวจสอบสถานะการโหลด หากกำลังโหลดข้อมูล แสดงข้อความ "Loading..."
  if (!fetchedDoctor || !fetchedClinics) {
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
      <ThemeProvider theme={theme}>
        <Typography
          variant="h5"
          gutterBottom
          style={{ color: theme.palette.primary.main, marginBottom: "20px", textAlign: "center" }}
        >
          รายชื่อแพทย์
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
            <InputLabel>คลินิก</InputLabel>
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
        </Grid>

        {/* Mobile View */}
        <Hidden smUp>
          {doctors.length === 0 ? (
            <Typography variant="h6" color="textSecondary" align="center">
              ไม่พบข้อมูลแพทย์ในรายการ
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
                    src={`${BASE_URL}/${doctor.Doctor_IMG}`}
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
                    <Typography variant="h6" style={{ fontSize: "15px" }}>
                      {doctor.Doctor_Name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {doctor.Clinic_Name}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "20px", margin: "10px 0" }}
                    onClick={() => handleDialogOpen(doctor.DoctorID, `${doctor.Doctor_IMG}`)}
                  >
                    <Typography style={{ fontSize: "10px" }}>ดูรายละเอียด</Typography>
                  </Button>
                </Box>
              </Card>
            ))
          )}
        </Hidden>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>รายละเอียดแพทย์</DialogTitle>
          <DialogContent>
            <img
              src={`${BASE_URL}/${selectedDoctor.Doctor_IMG}`}
              alt={selectedDoctor.Doctor_Name}
              style={{
                width: "200px", // ปรับขนาดของรูปภาพตามที่คุณต้องการ
                height: "auto", // คุณสามารถปรับแต่งความสูงตามที่คุณต้องการ
                display: "block",
                margin: "0 auto", // จัดให้อยู่ตรงกลางแนวนอน
              }}
            />

            <p>ชื่อ: {selectedDoctor.Doctor_Name}</p>
            <p>ความชำนาญ: {selectedDoctor.Doctor_Specialty}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              ปิด
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
      </ThemeProvider>
      <br />
      <br />
      <br />
      <br />
      <Foots />
    </>
  );
}

export default DoctorList;
