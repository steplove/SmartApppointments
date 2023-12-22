import React, { useState, useEffect } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Kit 2 React components
import MKBox from "components/MKBox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
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
import { BASE_URL } from "constants/constants";
import Swal from "sweetalert2";
import Foots from "components/Foot";

function Register() {
  const [formData, setFormData] = useState({
    identificationType: "",
    identificationNumber: "",
    hospitalNumber: "",
    gender: "",
    prefix: "",
    firstName: "",
    lastName: "",
    birthDate: null,
    Address: "",
    villageNumber: "",
    district: "",
    amphure: "",
    province: "",
    postalCode: "",
    mobileNo: "",
    email: "",
    password: "",
  });
  // const [errors, setErrors] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(BASE_URL + "/api/provinces");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);
  const fetchAmphures = async (province_id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/amphurs/${province_id}`);
      const data = await response.json();
      setAmphures(data);
    } catch (error) {
      console.error("Error fetching amphures:", error);
    }
  };

  const fetchDistricts = async (amphure_id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/subdistricts/${amphure_id}`);
      const data = await response.json();
      setDistricts(data);
      // ตั้งค่า postalCode ด้วย zip_code จาก data แรก (ถ้ามี)
      if (data && data[0]) {
        setFormData((prev) => ({ ...prev, postalCode: data[0].zip_code }));
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // 1. ถ้าเปลี่ยน "จังหวัด", รีเซ็ท "อำเภอ" และ "ตำบล"
    if (name === "province") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        amphure: "", // รีเซ็ทค่าอำเภอ
        district: "", // รีเซ็ทค่าตำบล
        postalCode: "", // รีเซ็ทค่ารหัสไปรษณีย์
      }));
      fetchAmphures(value);
    }
    // 2. ถ้าเปลี่ยน "อำเภอ", รีเซ็ท "ตำบล"
    else if (name === "amphure") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        district: "", // รีเซ็ทค่าตำบล
      }));
      fetchDistricts(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      // ทำการส่งข้อมูลที่ป้อนจาก form เข้าไปใน API
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
      // Check if the email is in a valid format
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(formData.email)) {
        Swal.fire({
          title: "รูปแบบอีเมลไม่ถูกต้อง!",
          text: "กรุณากรอกอีเมลให้ถูกต้อง",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          title: "รหัสผ่านไม่ตรงกัน!",
          text: "กรุณายืนยันรหัสผ่านให้ตรงกัน",
          icon: "warning",
          confirmButtonText: "ตกลง",
        });
        return;
      }
      // ทำการเช็คค่าที่ต้องการอย่างอื่น (เช่นคอลัมน์ที่ไม่ต้องการให้ซ้ำ)

      fetch(`${BASE_URL}/api/CheckResultCustomer/${formData.identificationNumber}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            Swal.fire({
              title: "พบข้อมูลซ้ำ!",
              text: "ข้อมูลนี้ถูกใช้งานแล้ว",
              icon: "warning",
              confirmButtonText: "ตกลง",
            });
          } else {
            // ไม่พบข้อมูลที่ซ้ำ สามารถดำเนินการ insert ข้อมูลได้
            // ทำการส่งข้อมูลที่ป้อนจาก form เข้าไปใน API
            fetch(`${BASE_URL}/api/registerCustomer`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                identificationType: formData.identificationType,
                identificationNumber: formData.identificationNumber,
                hospitalNumber: formData.hospitalNumber,
                gender: formData.gender,
                prefix: formData.prefix,
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthDate: formData.birthDate,
                Address: formData.Address,
                villageNumber: formData.villageNumber,
                province: formData.province,
                amphure: formData.amphure,
                district: formData.district,
                postalCode: formData.postalCode,
                mobileNo: formData.mobileNo,
                email: formData.email,
                password: formData.password,
              }),
            })
              .then((response) => {
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
                    window.location = "/signIn";
                  }, 1500);
                } else {
                  // การร้องขอล้มเหลว
                  return response.json();
                }
              })
              .then((data) => {
                if (data) {
                  throw new Error(data);
                }
              })
              .catch((error) => {
                console.log("ไม่สำเร็จ", formData);
                console.error(error);
              });
          }
        });
    } catch (error) {
      console.log("ไม่สำเร็จ", formData);
      console.error(error);
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
            <Grid item xs={11} sm={9} md={10} lg={10} xl={9} sx={{ marginTop: "150px" }}>
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
                <MKBox pt={4} pb={5} px={1}>
                  <MKBox component="form" role="form">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <RadioGroup
                            row
                            aria-labelledby="id-passport-label"
                            name="identificationType"
                            onChange={handleInputChange}
                            defaultValue={"IDCard"}
                          >
                            <FormControlLabel
                              value="IDCard"
                              control={<Radio />}
                              label="เลขประจำตัวประชาชน"
                            />
                            <FormControlLabel
                              value="passport"
                              control={<Radio />}
                              label="พาสปอร์ต"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={
                            formData.identificationType === "passport"
                              ? "พาสปอร์ต"
                              : "เลขประจำตัวประชาชน"
                          }
                          name="identificationNumber"
                          variant="outlined"
                          value={formData.identificationNumber}
                          onChange={handleInputChange}
                          style={{ marginBottom: "1rem" }}
                          inputProps={{ maxLength: 13 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel sx={{ color: "red", marginBottom: "10px" }}>
                          * ไม่ทราบให้กรอก - *
                        </InputLabel>
                        <TextField
                          fullWidth
                          label="เลขที่โรงพยาบาล (HN)"
                          name="hospitalNumber"
                          variant="outlined"
                          value={formData.hospitalNumber}
                          onChange={handleInputChange}
                          style={{ marginBottom: "1rem" }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth>
                          <InputLabel id="prefix-label">คำนำหน้า</InputLabel>
                          <Select
                            label="คำนำหน้า"
                            name="prefix"
                            value={formData.prefix}
                            onChange={handleInputChange}
                            variant="outlined"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
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
                            <MenuItem key="นาย" value="นาย">
                              นาย
                            </MenuItem>
                            <MenuItem key="นาง" value="นาง">
                              นาง
                            </MenuItem>
                            <MenuItem key="นางสาว" value="นางสาว">
                              นางสาว
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            aria-label="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                          >
                            <FormControlLabel value="2" control={<Radio />} label="ชาย" />
                            <FormControlLabel value="1" control={<Radio />} label="หญิง" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            fullWidth
                            label="ชื่อ"
                            variant="outlined"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            fullWidth
                            label="นามสกุล"
                            variant="outlined"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                              label="วันเกิด"
                              value={formData.birthDate}
                              onAccept={(date) => {
                                setFormData((prevState) => ({
                                  ...prevState,
                                  birthDate: date || null,
                                }));
                              }}
                              maxDate={dayjs().subtract(1, "day")}
                              renderInput={(params) => (
                                <TextField {...params} name="birthDate" fullWidth />
                              )}
                            />
                          </LocalizationProvider>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            fullWidth
                            label="บ้านเลขที่"
                            variant="outlined"
                            name="Address"
                            value={formData.Address}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            fullWidth
                            label="หมู่"
                            variant="outlined"
                            name="villageNumber"
                            value={formData.villageNumber}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <InputLabel id="province-label">จังหวัด</InputLabel>
                          <Select
                            labelId="province-label"
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                            style={{ height: "40px" }}
                          >
                            {provinces &&
                              provinces.length > 0 &&
                              provinces.map((province) => (
                                <MenuItem key={province.id} value={province.id}>
                                  {province.name_th}{" "}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <InputLabel id="district-label">อำเภอ</InputLabel>
                          <Select
                            labelId="amphure-label"
                            name="amphure"
                            value={formData.amphure}
                            onChange={handleInputChange}
                            style={{ height: "40px" }}
                          >
                            {amphures &&
                              amphures.length > 0 &&
                              amphures.map((amphure) => (
                                <MenuItem key={amphure.id} value={amphure.id}>
                                  {amphure.name_th}{" "}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <InputLabel id="district-label">ตำบล</InputLabel>
                          <Select
                            labelId="district-label"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            style={{ height: "40px" }}
                          >
                            {districts &&
                              districts.length > 0 &&
                              districts.map((district) => (
                                <MenuItem key={district.id} value={district.id}>
                                  {district.name_th}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          {formData.postalCode !== "" && formData.postalCode !== "0" ? ( // เช็ครหัสไปรษณีย์เท่ากับ "0"
                            <TextField
                              label="รหัสไปรษณีย์"
                              value={formData.postalCode || ""}
                              disabled
                            />
                          ) : (
                            <TextField
                              label="รหัสไปรษณีย์"
                              value={formData.postalCode || ""}
                              // อื่น ๆ ที่คุณต้องการใส่ที่นี่
                            />
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            label="เบอร์โทรศัพท์"
                            variant="outlined"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleInputChange}
                            inputProps={{ maxLength: 10, inputMode: "numeric" }}
                            InputProps={{
                              inputMode: "numeric",
                            }}
                            pattern="[0-9]{9,10}"
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            label="อีเมล"
                            variant="outlined"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}></Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            label="รหัสผ่าน"
                            variant="outlined"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            label="ยืนยันรหัสผ่าน"
                            variant="outlined"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                          />
                          {formData.confirmPassword !== "" &&
                            formData.password !== formData.confirmPassword && (
                              <span style={{ color: "red" }}>
                                <h6>รหัสผ่านไม่ตรงกัน</h6>
                              </span>
                            )}
                        </FormControl>
                      </Grid>
                    </Grid>
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
      <Foots />
    </>
  );
}

export default Register;
