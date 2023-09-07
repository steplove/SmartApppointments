import React, { useState } from "react";
import { Button, TextField, Paper, Typography, Avatar, Grid, Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import MenuList from "../MenuLists";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Barcode from "react-barcode";
// Material Kit 2 React components
import MKBox from "components/MKBox";
// import MKTypography from "components/MKTypography";
import Container from "@mui/material/Container";
// import Icon from "@mui/material/Icon";
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  mobile: yup.string().required("Mobile Number is required"),
});

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false); // 1. Add state for editing mode

  const toggleEditing = () => {
    // 2. Add function to toggle editing mode
    setIsEditing(!isEditing);
    setIsEditing(true);
  };
  // จำลองข้อมูลของผู้ใช้
  const userData = {
    name: "พรชัย สุขสันต์",
    congenitalDisease: "I10 : Essential (primary) hypertension",
    drugAllergy: "-",
    email: "porchai@example.com",
    address: "123 ถ.เจริญ กรุงเทพ",
    mobile: "0812345678",
    profilePicture: "",
  };

  const formik = useFormik({
    initialValues: userData,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <MenuList />
      <div style={{ backgroundColor: "#EDE7F6", padding: "50px 0" }}>
        <Paper
          elevation={3}
          style={{
            padding: "48px",
            maxWidth: "900px",
            margin: "0 auto",
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4} style={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                style={{
                  width: "120px",
                  height: "120px",
                  backgroundColor: "#673AB7",
                  marginBottom: "16px",
                }}
              >
                {/* User's profile picture */}
                {userData.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: "flex", justifyContent: "center" }}>
              <Barcode
                format="CODE39"
                value="123456"
                style={{ width: "auto", height: "auto", marginLeft: "10px" }}
              />
            </Grid>
            <MKBox component="section" py={{ xs: 6, sm: 12 }}>
              <Container>
                <Grid container item xs={12} justifyContent="center" mx="auto">
                  <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
                    {/* <MKAvatar src={profilePicture} alt="Burce Mars" size="xxl" shadow="xl" /> */}
                  </MKBox>
                  <Grid item xs={12} sm={8}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Typography
                        variant="h5"
                        gutterBottom
                        style={{ color: "#673AB7", flexGrow: 1 }}
                      >
                        ข้อมูลส่วนตัว
                      </Typography>
                      <EditIcon style={{ cursor: "pointer" }} onClick={toggleEditing} />
                    </Box>
                    <form onSubmit={formik.handleSubmit}>
                      <TextField
                        disabled
                        label="ชื่อ"
                        fullWidth
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        style={{ marginBottom: "16px" }}
                        variant="outlined"
                      />{" "}
                      <TextField
                        disabled
                        label="โรคประจำตัว"
                        fullWidth
                        name="congenitalDisease"
                        value={formik.values.congenitalDisease}
                        onChange={formik.handleChange}
                        style={{ marginBottom: "16px" }}
                        variant="outlined"
                      />
                      <TextField
                        disabled
                        label="แพ้ยา"
                        fullWidth
                        name="drugAllergy"
                        value={formik.values.drugAllergy}
                        onChange={formik.handleChange}
                        style={{ marginBottom: "16px" }}
                        variant="outlined"
                      />
                      <TextField
                        disabled={!isEditing}
                        label="อีเมล"
                        fullWidth
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        style={{ marginBottom: "16px" }}
                        variant="outlined"
                      />
                      <TextField
                        disabled={!isEditing}
                        label="ที่อยู่"
                        fullWidth
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        style={{ marginBottom: "24px" }}
                        variant="outlined"
                      />
                      <TextField
                        disabled={!isEditing}
                        label="เบอร์โทรศัพท์"
                        fullWidth
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                        helperText={formik.touched.mobile && formik.errors.mobile}
                        style={{ marginBottom: "24px" }}
                        variant="outlined"
                      />
                      {isEditing && (
                        <>
                          <Button
                            startIcon={<SaveIcon />}
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{
                              marginRight: "16px",
                              padding: "8px 24px",
                              fontSize: "16px",
                              color: "#fff",
                              marginBottom: "16px",
                            }}
                          >
                            บันทึกการเปลี่ยนแปลง
                          </Button>
                          <Button
                            startIcon={<CancelIcon />}
                            variant="contained"
                            style={{
                              backgroundColor: "#f44336",
                              padding: "8px 24px",
                              fontSize: "16px",
                              color: "#fff",
                              marginBottom: "16px",
                            }}
                            onClick={() => setIsEditing(false)}
                          >
                            ยกเลิก
                          </Button>
                        </>
                      )}
                    </form>

                    {/* <MKTypography variant="body1" fontWeight="light" color="text">
                        Decisions: If you can&apos;t decide, the answer is no. If two equally
                        difficult paths, choose the one more painful in the short term (pain
                        avoidance is creating an illusion of equality). Choose the path that leaves
                        you more equanimous.
                        <MKTypography
                          component="a"
                          href="#"
                          variant="body1"
                          fontWeight="light"
                          color="info"
                          mt={3}
                          sx={{
                            width: "max-content",
                            display: "flex",
                            alignItems: "center",
                            "& .material-icons-round": {
                              transform: `translateX(3px)`,
                              transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                            },
                            "&:hover .material-icons-round, &:focus .material-icons-round": {
                              transform: `translateX(6px)`,
                            },
                          }}
                        >
                          More about me <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                        </MKTypography>
                      </MKTypography> */}
                  </Grid>
                </Grid>
              </Container>
            </MKBox>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

export default UserProfile;
