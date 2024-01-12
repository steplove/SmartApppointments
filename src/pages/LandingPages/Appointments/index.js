import React, { useState, useEffect } from "react";
import MenuList from "../MenuLists";
import {
  // Hidden,
  Button,
  TextField,
  // Typography,
  FormControlLabel,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Card,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Hidden,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import MKBox from "components/MKBox";
// import { useFormik } from "formik";
// import * as yup from "yup";
import { styled } from "@mui/system";
import MKTypography from "components/MKTypography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { BASE_URL } from "../../../constants/constants";
import useFetch from "../../../hooks/useFetch";
import useTokenCheck from "../../../hooks/useTokenCheck";
import Swal from "sweetalert2";
// import Foots from "components/Foot";
import CircularProgress from "@mui/material/CircularProgress";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
const StyledToggleButton = styled(ToggleButton)({
  borderRadius: "20px",
  margin: "5px 10px",
  backgroundColor: "#f2f2f2",
  color: "#333",
  "&.Mui-selected": {
    backgroundColor: "#3f51b5",
    color: "#fff",
  },
});
function Appointments() {
  const { t } = useTranslation();
  const [IdenNumber, HN, FirstName, LastName, Customer_Status] = useTokenCheck();
  const nameCustomer = `${FirstName} ${LastName}`;
  const HNCustomer = `${HN} `;
  console.log(IdenNumber, HN, useTokenCheck(), Customer_Status, "IdenNumber", "HN");
  const { data: fetchedClinics = [] } = useFetch(`${BASE_URL}/api/showClinics`);
  //stateเก็บข้อมูลจากฐานข้อมูลเอามาแสดง
  const [clinics, setClinics] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [isChecked, setChecked] = useState(false);

  // const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    HN: HNCustomer,
    Clinic: "",
    Doctor: "",
    Date: null, // เริ่มต้นเป็น null
    timeSlot: "",
    symptoms: "",
  });
  const handleFormSubmit = async () => {
    // นำค่าที่ป้อนในฟอร์มจากตัวแปร formData ไปทำอะไรต่อ
    try {
      for (let key in formData) {
        if (!formData[key]) {
          console.log(`Field ${key} is missing`);
          Swal.fire({
            title: "ข้อมูลไม่ครบถ้วน!",
            text: `กรุณากรอก ${key} ให้ครบถ้วน`,
            icon: "warning",
            confirmButtonText: "ตกลง",
          });
          return;
        }
      }
      const response = await fetch(`${BASE_URL}/api/registerAppointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({
          HN: HNCustomer,
          Clinic: formData.Clinic,
          Doctor: formData.Doctor,
          Appointment_Date: formData.Date,
          Appointment_Time: formData.timeSlot,
          APM_Des: formData.symptoms,
        }),
      });

      if (response.status === 200) {
        // แสดง sweetalert2 เพื่อแจ้งเตือนว่าเพิ่มข้อมูลพนักงานสำเร็จ
        Swal.fire({
          title: "ลงทะเบียนสำเร็จ!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("สำเร็จ");
        setTimeout(() => {
          window.location = "/dashboard";
        }, 1500);
      } else {
        const data = await response.json();
        throw new Error(data);
      }
    } catch (error) {
      // กรณีเกิดข้อผิดพลาดในการเรียก API
      console.error("เกิดข้อผิดพลาดในการเรียก API:", error);
      // แสดงข้อผิดพลาดให้ผู้ใช้เห็น
      Swal.fire({
        title: "เกิดข้อผิดพลาด!",
        text: "ไม่สามารถลงทะเบียนได้ในขณะนี้ กรุณาลองใหม่ภายหลัง",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
    console.log(formData, "formData"); // ตัวอย่างการลง log ค่า formData
    setFormData((prevData) => ({
      ...prevData,
      HN: HNCustomer,
      Date: null,
    }));

    // ทำงานอื่น ๆ ตามที่คุณต้องการ
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
  const handleTimeSlotChange = (event, newTimeSlot) => {
    if (newTimeSlot !== null) {
      setFormData((prev) => ({
        ...prev,
        timeSlot: newTimeSlot,
      }));
    }
  };

  useEffect(() => {
    console.log("fetchedClinics", fetchedClinics);
    if (fetchedClinics && Array.isArray(fetchedClinics)) {
      setClinics(fetchedClinics);
    }
  }, [fetchedClinics]);
  const fetchDoctors = async (ClinicID) => {
    try {
      const response = await fetch(`${BASE_URL}/api/searchDoctorClinic/${ClinicID}`);
      const data = await response.json();
      setDoctor(data);
      console.log(data, "data");
    } catch (error) {
      console.error("Error fetching Doctors:", error);
    }
  };

  const resetForm = () => {
    const initialFormValues = {
      Clinic: "",
      Doctor: "",
      Date: null,
      timeSlot: [],
      symptoms: "",
    };

    // Reset the form fields to their initial values
    setFormData(initialFormValues);
  };

  // Add this function inside your component
  if (!fetchedClinics) {
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
        {/* Desktop/Tablet View */}
        <Hidden smDown>
          <MKBox px={3} width="100%" position="relative" zIndex={2}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={10} md={8} lg={6} xl={4} sx={{ marginTop: "10px" }}>
                <MKBox
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  sx={{
                    backgroundColor: "#3f51b5",
                    borderTopLeftRadius: "0.7rem",
                    borderTopRightRadius: "0.7rem",
                  }}
                >
                  <MKTypography variant="h5" style={{ color: "white" }}>
                    <AddCircleOutlineIcon sx={{ marginRight: 1 }} /> {t("register")}{" "}
                    {t("appointment")}
                  </MKTypography>
                </MKBox>
                <Card
                  sx={{
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                    <p>{t("please_note")}</p>
                  </div>
                  <div style={{ fontSize: "13px", marginLeft: "12px", color: "#49494a" }}>
                    <p>{t("this_registration_will_record")} </p>
                  </div>
                  <div style={{ fontSize: "12px", color: "#49494a" }}>
                    <p>{t("and_information_in_your")}</p>
                  </div>
                  <TextField
                    label={`${t("hospital_number")}`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="HN"
                    value={HNCustomer}
                    disabled
                  />
                  <TextField
                    label={`${t("name")}`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="name"
                    value={nameCustomer}
                    disabled
                  />
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
                  <FormControl fullWidth variant="outlined" style={{ marginTop: "1rem" }}>
                    <InputLabel>{t("doctor")}</InputLabel>
                    <Select
                      label="แพทย์"
                      name="Doctor"
                      value={formData.Doctor}
                      style={{ height: "40px" }}
                      onChange={handleInputChange}
                    >
                      {doctor &&
                        doctor.length > 0 &&
                        doctor.map((doctors) => (
                          <MenuItem key={doctors.DoctorID} value={doctors.DoctorID}>
                            {doctors.Doctor_Name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <Box mt={2} mb={2}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          label={`${t("appointment_date")}`}
                          name="Date"
                          value={formData.Date}
                          minDate={dayjs().add(1, "day")}
                          onChange={(newDate) => {
                            setFormData((prevData) => ({
                              ...prevData,
                              Date: newDate,
                            }));
                          }}
                          format="D/MM/YYYY"
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Box>

                  <FormControl fullWidth>
                    <ToggleButtonGroup
                      color="primary"
                      value={formData.timeSlot}
                      onChange={handleTimeSlotChange}
                      exclusive
                      fullWidth
                    >
                      <StyledToggleButton
                        value="09:00"
                        style={{
                          borderRadius: "20px",
                          margin: "5px",
                        }}
                        fullWidth
                      >
                        09:00-10:00
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="10:00"
                        style={{
                          borderRadius: "20px",
                          margin: "5px",
                        }}
                        fullWidth
                      >
                        10:00-11:00
                      </StyledToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                      color="primary"
                      value={formData.timeSlot}
                      onChange={handleTimeSlotChange}
                      exclusive
                      fullWidth
                    >
                      <StyledToggleButton
                        value="11:00"
                        style={{
                          borderRadius: "20px",
                          margin: "5px",
                        }}
                        fullWidth
                      >
                        11:00-12:00
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="13:00"
                        style={{
                          borderRadius: "20px",
                          margin: "5px",
                        }}
                        fullWidth
                      >
                        13:00-14:00
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="14:00"
                        style={{
                          borderRadius: "20px",
                          margin: "5px",
                        }}
                        fullWidth
                      >
                        14:00-15:00
                      </StyledToggleButton>
                    </ToggleButtonGroup>
                  </FormControl>
                  <TextField
                    label={`${t("initial_symptoms")}`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="symptoms"
                    value={formData.symptoms} // กำหนดค่าจาก formData ให้แสดงใน TextField
                    onChange={handleInputChange} // เมื่อมีการเปลี่ยนค่าใน TextField ให้เรียกใช้ handleInputChange
                    multiline
                    rows={4}
                  />
                  <div>
                    <Card style={{ backgroundColor: "#fcf8e3" }}>
                      <div style={{ fontSize: "14px" }}>
                        <p
                          style={{
                            textDecoration: "underline",
                            textAlign: "center",
                            color: "#8a6d3b",
                          }}
                        >
                          {t("terms_and_conditions_of_service")}
                        </p>
                        <p style={{ marginLeft: "10px", color: "#8a6d3b" }}>
                          ข้าพเจ้าได้รับทราบข้อมูลเกี่ยวกับการรับบริการ Smart Appointments
                          (นัดหมายออนไลน์)
                        </p>
                        <p style={{ marginLeft: "10px", color: "#8a6d3b" }}>
                          การรับบริการเป็นการใช้เทคโนโลยีช่วยให้ผู้ป่วยและบุคลากร
                        </p>
                        <p style={{ marginLeft: "10px", color: "#8a6d3b" }}>
                          ข้อดีคือเพิ่มประสิทธิภาพในการเข้าถึงการรักษา ผู้ป่วยที่อยู่ห่างไกล
                          ไม่จําเป็นต้องเดินทางมาที่โรงพยาบาล สามารถเข้าถึงการตรวจรักษา
                          การปรึกษาและได้รับการวินิจฉัยจากแพทย์ผู้เชี่ยวชาญได้ทันท่วงที
                          และสามารถติดตามการรักษาผู้ป่วยโรคเรื้อรังที่อยู่ห่างไกลจากโรงพยาบาล
                          ช่วยลดระยะเวลาในการรักษาพยาบาลโดยรวม
                        </p>
                      </div>
                    </Card>
                  </div>
                  <Grid item lg={12}>
                    <FormControlLabel
                      sx={{ fontSize: "10px" }}
                      control={
                        <Checkbox
                          checked={isChecked}
                          onChange={(e) => setChecked(e.target.checked)}
                          name="checked"
                          color="primary"
                        />
                      }
                      label={`${t("read_and_agreed_to_the_terms")}`}
                    />
                  </Grid>

                  <Button
                    variant="contained"
                    disabled={!isChecked}
                    onClick={handleFormSubmit}
                    style={{
                      marginTop: "20px",
                      color: "white",
                      marginBottom: "20px",
                      backgroundColor: "#3f51b5",
                      boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
                    }}
                  >
                    {t("confirm_appointment")}
                  </Button>

                  <Button
                    variant="outlined"
                    type="reset"
                    style={{
                      marginTop: "20px",
                      color: "white",
                      marginBottom: "20px",
                      backgroundColor: "#3f51b5",
                      boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
                      marginLeft: "10px",
                    }}
                    onClick={resetForm}
                  >
                    {t("reset")}
                  </Button>

                  <div style={{ fontSize: "12px", color: "#8a6d3b" }}>
                    <p>*{t("after_registering")}</p>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </MKBox>
          <MKBox pt={6} px={1} mt={6}>
            <DefaultFooter content={footerRoutes} stiky />
          </MKBox>
          <br />
          <br />
        </Hidden>

        {/* Mobile View */}
        <Hidden smUp>
          <MKBox px={3} width="100%" position="relative" zIndex={2}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={10} md={8} lg={6} xl={4} sx={{ marginTop: "10px" }}>
                <MKBox
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  sx={{
                    backgroundColor: "#3f51b5",
                    borderTopLeftRadius: "0.7rem",
                    borderTopRightRadius: "0.7rem",
                  }}
                >
                  <MKTypography variant="h5" style={{ color: "white" }}>
                    <AddCircleOutlineIcon sx={{ marginRight: 1 }} /> ลงทะเบียนนัดหมาย
                  </MKTypography>
                </MKBox>
                <Card
                  sx={{
                    width: "100%",
                    backgroundColor: "#f5f5f5",
                    padding: "20px",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                    <p>โปรดทราบ</p>
                  </div>
                  <div style={{ fontSize: "13px", marginLeft: "12px", color: "#49494a" }}>
                    <p>{t("this_registration_will_record")} </p>
                  </div>
                  <div style={{ fontSize: "12px", color: "#49494a" }}>
                    <p>
                      และข้อมูลในการลงทะเบียนของท่าน เพื่อบันทึกเป็นประวัติไว้กับทางโรงพยาบาลฯ
                      โปรดระบุตามความเป็นจริง
                    </p>
                  </div>
                  <TextField
                    label={`${t("hospital_number")}`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="HN"
                    value={HNCustomer}
                    disabled
                  />
                  <TextField
                    label={`${t("name")}`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="name"
                    value={nameCustomer}
                    disabled
                  />
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
                  <FormControl fullWidth variant="outlined" style={{ marginTop: "1rem" }}>
                    <InputLabel>{t("doctor")}</InputLabel>
                    <Select
                      label="แพทย์"
                      name="Doctor"
                      value={formData.Doctor}
                      style={{ height: "40px" }}
                      onChange={handleInputChange}
                    >
                      {doctor &&
                        doctor.length > 0 &&
                        doctor.map((doctors) => (
                          <MenuItem key={doctors.DoctorID} value={doctors.DoctorID}>
                            {doctors.Doctor_Name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <Box mt={2} mb={2}>
                    <FormControl fullWidth>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          label={`${t("appointment_date")}`}
                          name="Date"
                          value={formData.Date}
                          minDate={dayjs().add(1, "day")}
                          onChange={(newDate) => {
                            setFormData((prevData) => ({
                              ...prevData,
                              Date: newDate,
                            }));
                          }}
                          format="D/MM/YYYY"
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Box>
                  <FormControl>
                    <ToggleButtonGroup
                      color="primary"
                      value={formData.timeSlot}
                      onChange={handleTimeSlotChange}
                      exclusive
                      fullWidth
                    >
                      <StyledToggleButton
                        value="09:00"
                        style={{
                          borderRadius: "20px",
                          margin: "5px",
                        }}
                        fullWidth
                      >
                        09:00-10:00
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="10:00"
                        style={{
                          borderRadius: "20px",
                          margin: "5px",
                        }}
                        fullWidth
                      >
                        10:00-11:00
                      </StyledToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                      color="primary"
                      value={formData.timeSlot}
                      onChange={handleTimeSlotChange}
                      exclusive
                      fullWidth
                    >
                      <StyledToggleButton
                        value="11:00"
                        style={{
                          borderRadius: "20px",
                          margin: "5px",
                        }}
                        fullWidth
                      >
                        11:00-12:00
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="13:00"
                        style={{
                          borderRadius: "20px",
                          margin: "5px",
                        }}
                        fullWidth
                      >
                        13:00-14:00
                      </StyledToggleButton>
                      <StyledToggleButton
                        value="14:00"
                        style={{
                          borderRadius: "20px",
                          margin: "5px",
                        }}
                        fullWidth
                      >
                        14:00-15:00
                      </StyledToggleButton>
                    </ToggleButtonGroup>
                  </FormControl>
                  <TextField
                    label={`${t("initial_symptoms")}`}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="symptoms"
                    value={formData.symptoms} // กำหนดค่าจาก formData ให้แสดงใน TextField
                    onChange={handleInputChange} // เมื่อมีการเปลี่ยนค่าใน TextField ให้เรียกใช้ handleInputChange
                    multiline
                    rows={4}
                  />
                  <div>
                    <Card style={{ backgroundColor: "#fcf8e3" }}>
                      <div style={{ fontSize: "14px" }}>
                        <p
                          style={{
                            textDecoration: "underline",
                            textAlign: "center",
                            color: "#8a6d3b",
                          }}
                        >
                          ข้อกำหนด และเงื่อนไขการใช้บริการ
                        </p>
                        <p style={{ marginLeft: "10px", color: "#8a6d3b" }}>
                          ข้าพเจ้าได้รับทราบข้อมูลเกี่ยวกับการรับบริการ Smart Appointments
                          (นัดหมายออนไลน์)
                        </p>
                        <p style={{ marginLeft: "10px", color: "#8a6d3b" }}>
                          การรับบริการเป็นการใช้เทคโนโลยีช่วยให้ผู้ป่วยและบุคลากร
                        </p>
                        <p style={{ marginLeft: "10px", color: "#8a6d3b" }}>
                          ข้อดีคือเพิ่มประสิทธิภาพในการเข้าถึงการรักษา ผู้ป่วยที่อยู่ห่างไกล
                          ไม่จําเป็นต้องเดินทางมาที่โรงพยาบาล สามารถเข้าถึงการตรวจรักษา
                          การปรึกษาและได้รับการวินิจฉัยจากแพทย์ผู้เชี่ยวชาญได้ทันท่วงที
                          และสามารถติดตามการรักษาผู้ป่วยโรคเรื้อรังที่อยู่ห่างไกลจากโรงพยาบาล
                          ช่วยลดระยะเวลาในการรักษาพยาบาลโดยรวม
                        </p>
                      </div>
                    </Card>
                  </div>
                  <Grid item lg={12}>
                    <FormControlLabel
                      sx={{ fontSize: "10px" }}
                      control={
                        <Checkbox
                          checked={isChecked}
                          onChange={(e) => setChecked(e.target.checked)}
                          name="checked"
                          color="primary"
                        />
                      }
                      label={`${t("read_and_agreed_to_the_terms")}`}
                    />
                  </Grid>

                  <Button
                    variant="contained"
                    disabled={!isChecked}
                    onClick={handleFormSubmit}
                    style={{
                      marginTop: "20px",
                      color: "white",
                      marginBottom: "20px",
                      backgroundColor: "#3f51b5",
                      boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
                    }}
                  >
                    {t("confirm_appointment")}
                  </Button>

                  <Button
                    variant="outlined"
                    type="reset"
                    style={{
                      marginTop: "20px",
                      color: "white",
                      marginBottom: "20px",
                      backgroundColor: "#3f51b5",
                      boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
                      marginLeft: "10px",
                    }}
                    onClick={resetForm}
                  >
                    {t("reset")}
                  </Button>
                  <div style={{ fontSize: "12px", color: "#8a6d3b" }}>
                    <p>*{t("after_registering")}</p>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </MKBox>
          <br />
          <br />
        </Hidden>
      </ThemeProvider>
      {/* <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Foots /> */}
    </>
  );
}

export default Appointments;
