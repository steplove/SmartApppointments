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
import Select from "react-select";
import InputLabel from "@mui/material/InputLabel";

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
import { useTranslation } from "react-i18next";
import axios from "axios";
function Register() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    identificationType: "IDCard",
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
  console.log(formData, "formData");
  // const [errors, setErrors] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [amphures, setAmphures] = useState([]);
  const [districts, setDistricts] = useState([]);
  let surveyid, refText, otpSender, keyauth, phoneforsend;
  const MyConfig = {
    refText: "BCH01",
    otpSender: "BCHGROUP",
    keyauth: "520038d76befc773f2e5cebfe0285945",
    otpVarifyURL: "https://secure.etracker.cc/MobileOTPAPI/OTPVerifyAPI.aspx",
    otpReqURL: "https://secure.etracker.cc/MobileOTPAPI/OTPGenerateAPI.aspx",
  };
  const gotoOTP = async () => {
    let countryCode = "66";

    const telephoneForSend = formData.mobileNo.replace(/^0/, countryCode);

    const now = new Date();
    const formatter =
      now.getFullYear().toString() +
      now.getMonth().toString() +
      now.getDate().toString() +
      now.getHours().toString() +
      now.getMinutes().toString() +
      now.getSeconds().toString();
    console.log(formatter, "formatterformatter");
    surveyid = formatter;
    refText = MyConfig.refText;
    otpSender = MyConfig.otpSender;
    keyauth = MyConfig.keyauth;
    phoneforsend = telephoneForSend;

    const values = {
      survey_id: surveyid,
      refText: refText,
      otpSender: otpSender,
      phone_for_send: phoneforsend,
    };

    const url = MyConfig.otpReqURL;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <REQ_DATA>
        <TRANSID>${surveyid}</TRANSID>
        <KEYAUTHEN>${keyauth}</KEYAUTHEN>
        <RefText>${refText}</RefText>
        <Sender>${otpSender}</Sender>
        <Recipient>${phoneforsend}</Recipient>
      </REQ_DATA>`;
    console.log(xml, "xml");
    const body = { xml: xml, url: url, values: values };

    try {
      const response = await axios.post("https://apicon.bangkokchainhospital.com/sendotp", body, {
        headers: { Authorization: MyConfig.keyToken },
      });

      if (response.status === 200) {
        // routeToOTP(surveyid, phoneforsend);
        console.log("success");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
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
  const handleInputChange1 = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "identificationType") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleInputChange = (selectedOption, { name }) => {
    // const { name, value } = event.target;
    // 1. ถ้าเปลี่ยน "จังหวัด", รีเซ็ท "อำเภอ" และ "ตำบล"
    if (name === "province") {
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption,
        amphure: "", // Reset amphure to null
        district: "", // Reset district to null
        postalCode: "", // Reset postalCode to null
      }));
      fetchAmphures(selectedOption.value);
    }
    // 2. ถ้าเปลี่ยน "อำเภอ", รีเซ็ท "ตำบล"
    else if (name === "amphure") {
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption,
        district: "", // รีเซ็ทค่าตำบล
      }));
      fetchDistricts(selectedOption.value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: selectedOption }));
    }

    if (name === "prefix") {
      let selectedGender = "";
      if (selectedOption.value === "นาย") {
        selectedGender = "2";
      } else if (selectedOption.value === "นาง" || selectedOption.value === "นางสาว") {
        selectedGender = "1";
      }
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOption,
        gender: selectedGender,
      }));
    }
    console.log(selectedOption.value);
  };
  const handleSubmit = async () => {
    try {
      // ทำการส่งข้อมูลที่ป้อนจาก form เข้าไปใน API
      for (let key in formData) {
        if (!formData[key]) {
          Swal.fire({
            title: t("incomplete_information"),
            text: `${t("please_fill_in")} ${t(key)} ${t("completely")}`,
            icon: "warning",
            confirmButtonText: `${t("ok")}`,
          });
          return;
        }
      }
      // Check if the email is in a valid format
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(formData.email)) {
        Swal.fire({
          title: `${t("invalid_email_format")}!`,
          text: `${t("please_enter_your_email_address_correctly")}!`,
          icon: "warning",
          confirmButtonText: `${t("ok")}`,
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          title: `${t("passwords_dont_match")}!`,
          text: `${t("please_confirm_your_passwords_match")}!`,
          icon: "warning",
          confirmButtonText: `${t("ok")}`,
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
              title: `${t("found_duplicate_information")}!`,
              text: `${t("this_information_is_already_in_use")}!`,
              icon: "warning",
              confirmButtonText: `${t("ok")}`,
            });
          } else {
            Swal.fire({
              title: "กำลังดำเนินการ...",
              allowOutsideClick: false,
              showConfirmButton: false,
              willOpen: () => {
                Swal.showLoading();
              },
              timer: 10000, // 10 วินาที
              didClose: () => {
                // หาก SweetAlert ถูกปิดจากการเกินเวลา 10 วินาที
                // ทำอะไรก็ตามที่คุณต้องการทำหลังจาก SweetAlert ถูกปิดจากการเกินเวลา
                // เช่น นำผู้ใช้ไปยังหน้าอื่น ๆ, แสดงข้อความเตือน, ฯลฯ
              },
            });
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
                prefix: formData.prefix.value,
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthDate: formData.birthDate,
                Address: formData.Address,
                villageNumber: formData.villageNumber,
                province: formData.province.value,
                amphure: formData.amphure.value,
                district: formData.district.value,
                postalCode: formData.postalCode,
                mobileNo: formData.mobileNo,
                email: formData.email,
                password: formData.password,
              }),
            })
              .then((response) => {
                if (response.status === 200) {
                  // แสดง sweetalert2 เพื่อแจ้งเตือนว่าเพิ่มข้อมูลพนักงานสำเร็จ
                  Swal.close();
                  Swal.fire({
                    title: `${t("successfully_registered")}!`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  let countryCode = "66";
                  const telephoneForSend = formData.mobileNo.replace(/^0/, countryCode);
                  gotoOTP();
                  setTimeout(() => {
                    window.location.href = `/OTP/${telephoneForSend}/${surveyid}`;
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
                console.error(error);
              });
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  const prefixOptions = [
    { value: "นาย", label: t("mr") },
    { value: "นาง", label: t("mrs") },
    { value: "นางสาว", label: t("miss") },
  ];

  const options = provinces.map((province) => ({
    value: province.id,
    label: province.name_th,
  }));
  const options2 = amphures.map((amphure) => ({
    value: amphure.id,
    label: amphure.name_th,
  }));
  const options3 = districts.map((district) => ({
    value: district.id,
    label: district.name_th,
  }));
  return (
    <Grid>
      <DefaultNavbar routes={routes} sticky />
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
                    {t("register")}
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
                            onChange={handleInputChange1}
                            value={formData.identificationType}
                          >
                            <FormControlLabel
                              value="IDCard"
                              control={<Radio />}
                              label={`${t("national_identification_number")}`}
                            />
                            <FormControlLabel
                              value="passport"
                              control={<Radio />}
                              label={`${t("passport")}`}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={
                            formData.identificationType === "passport"
                              ? `${t("passport")}`
                              : `${t("national_identification_number")}`
                          }
                          name="identificationNumber"
                          variant="outlined"
                          value={formData.identificationNumber}
                          onChange={handleInputChange1}
                          style={{ marginBottom: "1rem" }}
                          inputProps={{ maxLength: 13 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel sx={{ color: "red", marginBottom: "10px", marginTop: "-22px" }}>
                          {t("unknown")}
                        </InputLabel>
                        <TextField
                          fullWidth
                          label={`${t("hospital_number")}`}
                          name="hospitalNumber"
                          variant="outlined"
                          value={formData.hospitalNumber}
                          onChange={handleInputChange1}
                          style={{ marginBottom: "1rem" }}
                        />
                      </Grid>

                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth>
                          {/* <InputLabel id="prefix-label">{t("prefix")}</InputLabel> */}
                          <Select
                            label="คำนำหน้า"
                            name="prefix"
                            value={formData.prefix}
                            onChange={handleInputChange}
                            options={prefixOptions}
                            isSearchable={false} // Disable search
                            placeholder="เลือกคำนำหน้า..."
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                height: "40px",
                                marginBottom: "1rem",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                zIndex: 3, // Ensure the dropdown menu has a higher z-index
                              }),
                            }}
                          />
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
                            <FormControlLabel
                              value="2"
                              control={<Radio />}
                              label={`${t("male")}`}
                            />
                            <FormControlLabel
                              value="1"
                              control={<Radio />}
                              label={`${t("female")}`}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            fullWidth
                            label={`${t("name")}`}
                            variant="outlined"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange1}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            fullWidth
                            label={`${t("last_name")}`}
                            variant="outlined"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange1}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <MobileDatePicker
                              label={`${t("birthday")}`}
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
                            label={`${t("house_numbe")}`}
                            variant="outlined"
                            name="Address"
                            value={formData.Address}
                            onChange={handleInputChange1}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            fullWidth
                            label={`${t("village_no")}`}
                            variant="outlined"
                            name="villageNumber"
                            value={formData.villageNumber}
                            onChange={handleInputChange1}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          {/* <InputLabel id="province-label">{t("province")}</InputLabel> */}
                          <Select
                            labelId="province-label"
                            name="province"
                            value={formData.province}
                            onChange={(selectedOption) =>
                              handleInputChange(selectedOption, { name: "province" })
                            }
                            options={options}
                            placeholder="จังหวัด..."
                            styles={{
                              // Use styles prop to customize the height
                              control: (provided) => ({
                                ...provided,
                                height: "40px",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                zIndex: 3, // Ensure the dropdown menu has a higher z-index
                              }),
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          {/* <InputLabel id="district-label">{t("district")}</InputLabel> */}
                          <Select
                            labelId="amphure-label"
                            name="amphure"
                            value={formData.amphure}
                            onChange={handleInputChange}
                            options={options2}
                            placeholder="อำเภอ..."
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                height: "40px",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                zIndex: 3, // Ensure the dropdown menu has a higher z-index
                              }),
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          {/* <InputLabel id="district-label">{t("sub_district")}</InputLabel> */}
                          <Select
                            labelId="district-label"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            options={options3}
                            placeholder="ตำบล..."
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                height: "40px",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                zIndex: 3, // Ensure the dropdown menu has a higher z-index
                              }),
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          {formData.postalCode !== "" && formData.postalCode !== "0" ? ( // เช็ครหัสไปรษณีย์เท่ากับ "0"
                            <TextField
                              label={`${t("postal_code")}`}
                              value={formData.postalCode || ""}
                              disabled
                            />
                          ) : (
                            <TextField
                              label={`${t("postal_code")}`}
                              value={formData.postalCode || ""}
                              // อื่น ๆ ที่คุณต้องการใส่ที่นี่
                            />
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            label={`${t("telephone_numbe")}`}
                            variant="outlined"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleInputChange1}
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
                            label={`${t("email")}`}
                            variant="outlined"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange1}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}></Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            label={`${t("password")}`}
                            variant="outlined"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange1}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <FormControl fullWidth style={{ marginTop: "1rem" }}>
                          <TextField
                            label={`${t("confirm_password")}`}
                            variant="outlined"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange1}
                          />
                          {formData.confirmPassword !== "" &&
                            formData.password !== formData.confirmPassword && (
                              <span style={{ color: "red" }}>
                                <h6>{t("passwords_dont_match")}</h6>
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
                      onClick={() => handleSubmit(formData.mobileNo)}
                      style={{ color: "white" }}
                    >
                      {t("save")}
                    </Button>
                  </MKBox>
                </MKBox>
              </Card>
            </Grid>
          </Grid>
        </MKBox>
      </MKBox>
      <Foots />
    </Grid>
  );
}

export default Register;
