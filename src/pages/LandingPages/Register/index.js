import React, { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// Material Kit 2 React page layout routes
import routes from "routes";
// Images
import bgImage from "assets/images/hospital.png";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Button from "@mui/material/Button";
import MKTypography from "components/MKTypography";
import Divider from "@mui/material/Divider";
function Register() {
  const [formData, setFormData] = useState({
    selectedOption: "",
    identificationType: "",
    identificationNumber: "",
    hospitalNumber: "",
    prefix: "",
    gender: "",
    firstName: "",
    lastName: "",
    birthDate: null,
    houseNumber: "",
    villageNumber: "",
    province: "",
    district: "",
    subDistrict: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let validationErrors = {};
    console.log("aaaa");
    if (!formData.identificationNumber) {
      validationErrors.identificationNumber = "กรุณากรอกเลขประจำตัวประชาชนหรือพาสปอร์ต";
    }
    if (!formData.hospitalNumber) {
      validationErrors.hospitalNumber = "กรุณากรอกเลขที่โรงพยาบาล (HN)";
    }
    if (!formData.prefix) {
      validationErrors.prefix = "กรุณาเลือกคำนำหน้า";
    }
    if (!formData.gender) {
      validationErrors.gender = "กรุณาเลือกเพศ";
    }
    if (!formData.firstName) {
      validationErrors.firstName = "กรุณากรอกชื่อ";
    }
    if (!formData.lastName) {
      validationErrors.lastName = "กรุณากรอกนามสกุล";
    }
    if (!formData.birthDate) {
      validationErrors.birthDate = "กรุณาเลือกวันเกิด";
    }
    if (!formData.houseNumber) {
      validationErrors.houseNumber = "กรุณากรอกบ้านเลขที่";
    }
    if (!formData.villageNumber) {
      validationErrors.villageNumber = "กรุณากรอกหมู่";
    }
    if (!formData.province) {
      validationErrors.province = "กรุณาเลือกจังหวัด";
    }
    if (!formData.district) {
      validationErrors.district = "กรุณาเลือกอำเภอ";
    }
    if (!formData.subDistrict) {
      validationErrors.subDistrict = "กรุณาเลือกตำบล";
    }
    if (!formData.postalCode) {
      validationErrors.postalCode = "กรุณากรอกรหัสไปรษณีย์";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // ทำการบันทึกหรือส่งข้อมูลไปยังเซิร์ฟเวอร์ที่นี่
    }
  };

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflowY: "auto",
        }}
      >
        <MKBox px={1} width="100%" position="relative" zIndex={2}>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={3} sx={{ marginTop: "150px" }}>
              <Card sx={{ backgroundColor: "rgba(255, 255, 255, 1)" }}>
                <MKBox
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={2}
                  sx={{
                    backgroundColor: "#01817a",
                    borderTopLeftRadius: "0.7rem",
                    borderTopRightRadius: "0.7rem",
                  }}
                >
                  <MKTypography variant="h5" style={{ color: "white" }}>
                    ลงทะเบียน
                  </MKTypography>
                </MKBox>

                <Divider sx={{ my: 0 }} />
                <MKBox pt={4} pb={3} px={3}>
                  <MKBox component="form" role="form">
                    <FormControl fullWidth>
                      <RadioGroup
                        row
                        aria-labelledby="id-passport-label"
                        name="identificationType"
                        value={formData.identificationType}
                        onChange={handleInputChange}
                      >
                        <FormControlLabel
                          value="idCard"
                          control={<Radio />}
                          label="เลขประจำตัวประชาชน"
                        />
                        <FormControlLabel value="passport" control={<Radio />} label="พาสปอร์ต" />
                      </RadioGroup>
                      <TextField
                        fullWidth
                        label={
                          formData.identificationType === "idCard"
                            ? "เลขประจำตัวประชาชน"
                            : "พาสปอร์ต"
                        }
                        name="identificationNumber"
                        variant="outlined"
                        value={formData.identificationNumber}
                        onChange={handleInputChange}
                        error={!!errors.identificationNumber}
                        helperText={errors.identificationNumber}
                        style={{ marginBottom: "1rem" }}
                      />
                      <TextField
                        fullWidth
                        label="เลขที่โรงพยาบาล (HN)"
                        name="hospitalNumber"
                        variant="outlined"
                        value={formData.hospitalNumber}
                        onChange={handleInputChange}
                        style={{ marginBottom: "1rem" }}
                        error={!!errors.hospitalNumber}
                        helperText={errors.hospitalNumber}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="prefix-label">คำนำหน้า</InputLabel>
                      <Select
                        select
                        label="คำนำหน้า"
                        name="prefix"
                        value={formData.prefix}
                        onChange={handleInputChange}
                        variant="outlined"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        error={!!errors.prefix}
                        helperText={errors.prefix}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ height: "40px", marginBottom: "1rem" }}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                        }}
                      >
                        <MenuItem value={"นาย"}>นาย</MenuItem>
                        <MenuItem value={"นาง"}>นาง</MenuItem>
                        <MenuItem value={"นางสาว"}>นางสาว</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl component="fieldset">
                      <FormLabel component="legend" style={{ color: "black" }}>
                        เพศ
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-label="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        error={!!errors.gender}
                        helperText={errors.gender}
                      >
                        <FormControlLabel value="male" control={<Radio />} label="ชาย" />
                        <FormControlLabel value="female" control={<Radio />} label="หญิง" />
                      </RadioGroup>
                    </FormControl>
                    <FormControl fullWidth style={{ marginTop: "1rem" }}>
                      <TextField
                        fullWidth
                        label="ชื่อ"
                        variant="outlined"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                      />
                    </FormControl>

                    <FormControl fullWidth style={{ marginTop: "1rem" }}>
                      <TextField
                        fullWidth
                        label="นามสกุล"
                        variant="outlined"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                      />
                    </FormControl>
                    <FormControl fullWidth style={{ marginTop: "1rem" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          label="วันเกิด"
                          value={formData.birthDate}
                          onChange={(date) =>
                            setFormData((prevState) => ({ ...prevState, birthDate: date }))
                          }
                          error={!!errors.birthDate}
                          helperText={errors.birthDate}
                          maxDate={dayjs().subtract(1, "day")}
                          renderInput={(params) => (
                            <TextField {...params} name="birthDate" fullWidth />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                    <FormControl fullWidth style={{ marginTop: "1rem" }}>
                      <TextField
                        fullWidth
                        label="บ้านเลขที่"
                        variant="outlined"
                        name="houseNumber"
                        value={formData.houseNumber}
                        onChange={handleInputChange}
                        error={!!errors.houseNumber}
                        helperText={errors.houseNumber}
                      />
                    </FormControl>

                    <FormControl fullWidth style={{ marginTop: "1rem" }}>
                      <TextField
                        fullWidth
                        label="หมู่"
                        variant="outlined"
                        name="villageNumber"
                        value={formData.villageNumber}
                        onChange={handleInputChange}
                        error={!!errors.villageNumber}
                        helperText={errors.villageNumber}
                      />
                    </FormControl>
                    <FormControl fullWidth style={{ marginTop: "1rem" }}>
                      <InputLabel id="province-label">จังหวัด</InputLabel>
                      <Select
                        labelId="province-label"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        style={{ height: "40px" }}
                        error={!!errors.province}
                        helperText={errors.province}
                      >
                        {/* แทรกรายการจังหวัดที่คุณมีที่นี่ */}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginTop: "1rem" }}>
                      <InputLabel id="district-label">อำเภอ</InputLabel>
                      <Select
                        labelId="district-label"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        style={{ height: "40px" }}
                        error={!!errors.district}
                        helperText={errors.district}
                      >
                        {/* แทรกรายการอำเภอที่คุณมีที่นี่ */}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginTop: "1rem" }}>
                      <InputLabel id="subDistrict-label">ตำบล</InputLabel>
                      <Select
                        labelId="subDistrict-label"
                        name="subDistrict"
                        value={formData.subDistrict}
                        onChange={handleInputChange}
                        style={{ height: "40px" }}
                        error={!!errors.subDistrict}
                        helperText={errors.subDistrict}
                      >
                        {/* แทรกรายการตำบลที่คุณมีที่นี่ */}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginTop: "1rem" }}>
                      <TextField
                        label="รหัสไปรษณีย์"
                        variant="outlined"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        error={!!errors.postalCode}
                        helperText={errors.postalCode}
                      />
                    </FormControl>
                  </MKBox>
                  <MKBox pt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      style={{ color: "white" }}
                    >
                      บันทึก
                    </Button>
                  </MKBox>
                </MKBox>
              </Card>
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
    </>
  );
}

export default Register;
