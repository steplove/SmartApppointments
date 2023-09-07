import React, { useState } from "react";
import MenuList from "../MenuLists";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Card,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import MKBox from "components/MKBox";
import { useFormik } from "formik";
import * as yup from "yup";
import { styled } from "@mui/system";
import MKTypography from "components/MKTypography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  clinic: yup.string().required("Clinic is required"),
  doctor: yup.string().required("Doctor is required"),
  birthDate: yup
    .date()
    .required("Date is required")
    .max(dayjs().subtract(1, "day"), "Date cannot be in the future"),
  timeSlot: yup.string().required("Time slot is required"),
  symptoms: yup.string().required("อาการเบื้องต้น is required"),
});

function Appointments() {
  const [clinic, setClinic] = useState("");
  const [doctor, setDoctor] = useState("");
  const clinics = ["คลินิก A", "คลินิก B", "คลินิก C"];
  const doctors = ["แพทย์ ก", "แพทย์ ข", "แพทย์ ค"];

  const formik = useFormik({
    initialValues: {
      name: "",
      clinic: null,
      doctor: null,
      birthDate: null,
      timeSlot: "",
      symptoms: "",
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      <MenuList />
      <form onSubmit={formik.handleSubmit}>
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
                  backgroundColor: "#f5f5f5",
                  padding: "20px",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <TextField
                  label="ชื่อ"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <Box mt={2}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>คลินิก</InputLabel>
                    <Select
                      label="คลินิก"
                      value={clinic}
                      onChange={(event) => setClinic(event.target.value)}
                      style={{ height: "40px" }}
                      error={formik.touched.clinic && Boolean(formik.errors.clinic)}
                      helperText={formik.touched.clinic && formik.errors.clinic}
                    >
                      {clinics.map((clinicName) => (
                        <MenuItem key={clinicName} value={clinicName}>
                          {clinicName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <FormControl fullWidth variant="outlined" style={{ marginTop: "1rem" }}>
                    <InputLabel>แพทย์</InputLabel>
                    <Select
                      label="แพทย์"
                      value={doctor}
                      onChange={(event) => setDoctor(event.target.value)}
                      style={{ height: "40px" }}
                      error={formik.touched.doctor && Boolean(formik.errors.doctor)}
                      helperText={formik.touched.doctor && formik.errors.doctor}
                    >
                      {doctors.map((doctorName) => (
                        <MenuItem key={doctorName} value={doctorName}>
                          {doctorName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box mt={2} mb={2}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        label="วันที่นัด"
                        value={formik.values.birthDate}
                        onChange={(date) => formik.setFieldValue("birthDate", date)}
                        minDate={dayjs().add(1, "day")}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                            helperText={formik.touched.birthDate && formik.errors.birthDate}
                            fullWidth
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Box>
                <FormControl fullWidth>
                  <ToggleButtonGroup
                    color="primary"
                    value={formik.values.timeSlot}
                    exclusive
                    onChange={(_, newValue) => formik.setFieldValue("timeSlot", newValue)}
                    fullWidth
                  >
                    <StyledToggleButton
                      value="09:00-10:00"
                      style={{
                        borderRadius: "20px",
                        margin: "5px",
                      }}
                      fullWidth
                    >
                      09:00-10:00
                    </StyledToggleButton>
                    <StyledToggleButton
                      value="10:00-11:00"
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
                    value={formik.values.timeSlot}
                    exclusive
                    onChange={(_, newValue) => formik.setFieldValue("timeSlot", newValue)}
                    fullWidth
                  >
                    <StyledToggleButton
                      value="11:00-12:00"
                      style={{
                        borderRadius: "20px",
                        margin: "5px",
                      }}
                      fullWidth
                    >
                      11:00-12:00
                    </StyledToggleButton>
                    <StyledToggleButton
                      value="13:00-14:00"
                      style={{
                        borderRadius: "20px",
                        margin: "5px",
                      }}
                      fullWidth
                    >
                      13:00-14:00
                    </StyledToggleButton>
                    <StyledToggleButton
                      value="14:00-15:00"
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

                {formik.touched.timeSlot && (
                  <Typography color="error">{formik.errors.timeSlot}</Typography>
                )}
                <TextField
                  label="อาการเบื้องต้น"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="symptoms"
                  value={formik.values.symptoms}
                  onChange={formik.handleChange}
                  error={formik.touched.symptoms && Boolean(formik.errors.symptoms)}
                  helperText={formik.touched.symptoms && formik.errors.symptoms}
                  multiline
                  rows={4}
                />
                <Button
                  variant="contained"
                  type="submit"
                  style={{
                    marginTop: "20px",
                    color: "white",
                    marginBottom: "20px",
                    backgroundColor: "#3f51b5",
                    boxShadow: "0px 3px 5px rgba(0,0,0,0.2)",
                  }}
                >
                  ยืนยันการจอง
                </Button>
                <Button
                  variant="outlined"
                  type="reset"
                  style={{
                    color: "white",
                    marginBottom: "20px",
                    backgroundColor: "#3f51b5",
                    border: "1px solid white",
                  }}
                  onClick={formik.handleReset}
                >
                  Reset
                </Button>
              </Card>
            </Grid>
          </Grid>
        </MKBox>
      </form>
    </>
  );
}

export default Appointments;
