import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Grid,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Hidden from "@mui/material/Hidden";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import "./userprofile.css";
import MenuList from "../MenuLists";
import Img from "../../../assets/images/profile.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Barcode from "react-barcode";
// import Foots from "components/Foot";
import useTokenCheck from "hooks/useTokenCheck";
import { BASE_URL } from "../../../constants/constants";
import Swal from "sweetalert2";
import useFetch from "../../../hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import LanguageSelector from "LanguageSelector";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600, // จาก 800 เป็น 600
      md: 960, // จาก 1280 เป็น 960
      lg: 1280, // จาก 1920 เป็น 1280
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#6A0DAD",
    },
    secondary: {
      main: "#D1C4E9",
    },
  },
});

function UserProfile() {
  const { t } = useTranslation();

  const [IdenNumber, HN, FirstName, LastName, , ,] = useTokenCheck();
  const { data: fetchedCustomerAddress = [] } = useFetch(
    `${BASE_URL}/api/ShowCustomer/${IdenNumber}`
  );
  console.log(fetchedCustomerAddress, "fetchedCustomerAddress");
  // const hasData = true;
  const [isEditing, setIsEditing] = useState(false);
  const [fetchedCustomerAddres, setFetchedCustomerAddress] = useState({});

  useEffect(() => {
    // ดึงข้อมูลเมื่อคอมโพเนนต์โหลดครั้งแรก
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/ShowCustomer/${IdenNumber}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setFetchedCustomerAddress(data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [IdenNumber]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsEditing(false);
    console.log("22");

    // สร้างตัวแปรสำหรับคำขอ PUT
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ IdenNumber, ...fetchedCustomerAddres }),
    };
    try {
      const response = await fetch(`${BASE_URL}/api/EditCustomer/${IdenNumber}`, requestOptions);
      const data = await response.json();
      if (data.message === "User updated successfully!") {
        Swal.fire({
          title: `${t("update_successful")}`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire(`${t("error_updating_information")}`, "", "error");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // จัดการข้อผิดพลาดที่เกิดขึ้น (เช่น แสดงข้อความข้อผิดพลาด)
      Swal.fire(`${t("error_updating_information")}`, "", "error");
    }
  };
  const hadleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  if (!fetchedCustomerAddress) {
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
        <Hidden smUp>
          <div
            style={{
              position: "absolute",
              right: 25,
              textAlign: "center",
              alignItems: "center",
              backgroundColor: "whitesmoke",
              borderRadius: 10,
              height: "2%",
            }}
          >
            <LanguageSelector />
          </div>
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: "30px", marginTop: "30px", marginLeft: "0px", width: "98%" }}
          >
            {/* private Data  */}
            <Grid>
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: "none",
                  display: "flex", // เพิ่มการใช้ flex
                  flexDirection: "column", // จัดให้อยู่ในแนวตั้ง
                  justifyContent: "center",
                }}
              >
                <CardContent sx={{ paddingBottom: 0 }}>
                  <div style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
                    <Typography variant="h6">{t("personal_information")}</Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 120, height: 120 }}
                    />
                  </div>
                  <TextField
                    label={`${t("name")}`}
                    variant="outlined"
                    value={`${FirstName} ${LastName}`}
                    fullWidth
                    sx={{
                      marginBottom: "10px",
                    }}
                    disabled
                  />

                  <TextField
                    label={`${t("congenital_disease")}`}
                    variant="outlined"
                    disabled
                    fullWidth
                    value={"" || t("no_information_found")}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {/* barCode */}
          <Grid>
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "left", // จัดให้อยู่ตรงกลางแนวตั้ง
                marginTop: "10px",
                width: "98%",
              }}
            >
              <CardContent>
                <div
                  style={{
                    borderBottom: "1px solid #ccc",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "left",
                  }}
                >
                  <Typography variant="h6" style={{ marginLeft: 0 }}>
                    Barcode HN
                  </Typography>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flex: "1" }}>
                  <Barcode value={`${HN}`} />
                </div>
              </CardContent>
            </Card>
          </Grid>
          {/* </Grid> */}
          {/* Address  */}
          <Grid>
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <CardContent sx={{ paddingBottom: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <div>
                    <Typography variant="h6">{t("address")}</Typography>
                  </div>
                  <div>
                    {isEditing ? (
                      <>
                        <IconButton
                          aria-label="บันทึก"
                          onClick={handleSave}
                          style={{ color: "green" }}
                        >
                          <SaveIcon style={{ color: "green" }} />
                        </IconButton>
                        <IconButton
                          aria-label="ยกเลิก"
                          onClick={handleCancel}
                          style={{ color: "red" }}
                        >
                          <CancelIcon style={{ color: "red" }} />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton aria-label="แก้ไข" onClick={handleEdit} style={{ color: "blue" }}>
                        <EditIcon style={{ color: "#c68e28" }} />
                      </IconButton>
                    )}
                  </div>
                </div>

                {fetchedCustomerAddress && (
                  <>
                    <TextField
                      label={`${t("email")}`}
                      variant="outlined"
                      fullWidth
                      sx={{ marginBottom: "10px" }}
                      disabled={!isEditing}
                      value={fetchedCustomerAddres.Email}
                      onChange={(e) =>
                        setFetchedCustomerAddress({
                          ...fetchedCustomerAddres,
                          Email: e.target.value,
                        })
                      }
                    />

                    <TextField
                      label={`${t("telephone_numbe")}`}
                      variant="outlined"
                      fullWidth
                      disabled={!isEditing}
                      sx={{ marginBottom: "10px" }}
                      value={fetchedCustomerAddres.MobileNo}
                      onChange={(e) =>
                        setFetchedCustomerAddress({
                          ...fetchedCustomerAddres,
                          MobileNo: e.target.value,
                        })
                      }
                    />
                  </>
                )}

                <TextField
                  label={`${t("address")}`}
                  variant="outlined"
                  fullWidth
                  disabled
                  value={`บ้านเลขที่ ${fetchedCustomerAddres.Address} ม. ${fetchedCustomerAddres.Moo} ต. ${fetchedCustomerAddres.District} อ. ${fetchedCustomerAddres.Amphure} จ. ${fetchedCustomerAddres.Province}`}
                />
              </CardContent>
            </Card>
          </Grid>
        </Hidden>

        <Hidden smDown>
          <Grid
            container
            spacing={2}
            sx={{ marginBottom: "30px", marginTop: "30px", marginLeft: "20px" }}
          >
            <Grid item lg={5}>
              <Card
                sx={{
                  borderRadius: 5, // ทำให้มุมเป็นแบบไม่มีมุม
                  boxShadow: "none", // ไม่มีเงา
                }}
              >
                <div className="left" style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar
                    src={Img}
                    sx={{
                      width: 300,
                      height: 300,
                      borderRadius: 0,
                      objectFit: "cover",
                    }}
                  />
                </div>
                <CardContent sx={{ paddingBottom: 0 }}>
                  {" "}
                  {/* ลดระยะห่างด้านล่างของCardContent */}
                  <Typography variant="h6">{t("personal_information")}</Typography>
                  <TextField
                    label={`${t("name")}`}
                    variant="outlined"
                    value={`${FirstName} ${LastName}`}
                    fullWidth
                    sx={{ marginBottom: "10px" }}
                    disabled
                  />
                  <TextField
                    label={`${t("congenital_disease")}`}
                    variant="outlined"
                    fullWidth
                    value={"" || t("no_information_found")}
                    disabled
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={6} sx={{ marginRight: "0px", marginBottom: "10px" }}>
              <div>
                <Card
                  sx={{
                    borderRadius: 5, // ทำให้มุมเป็นแบบไม่มีมุม
                    boxShadow: "none", // ไม่มีเงา
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">BarCode</Typography>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Barcode value={`${HN}`} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Card
                  sx={{
                    borderRadius: 5, // ทำให้มุมเป็นแบบไม่มีมุม
                    boxShadow: "none", // ไม่มีเงา
                  }}
                >
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">{t("address")}</Typography>
                      <div>
                        {isEditing ? (
                          <>
                            <IconButton
                              aria-label="บันทึก"
                              onClick={handleSave}
                              style={{ color: "green" }}
                            >
                              <SaveIcon style={{ color: "green" }} />
                            </IconButton>
                            <IconButton
                              aria-label="ยกเลิก"
                              onClick={handleCancel}
                              style={{ color: "red" }}
                            >
                              <CancelIcon style={{ color: "red" }} />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            aria-label="แก้ไข"
                            onClick={handleEdit}
                            style={{ color: "blue" }}
                          >
                            <EditIcon style={{ color: "#c68e28" }} />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <Grid
                    container
                    spacing={2}
                    sx={{ marginLeft: "10px", marginBottom: "10px", marginRight: "10px" }}
                  >
                    {fetchedCustomerAddress && (
                      <>
                        <TextField
                          label={`${t("email")}`}
                          variant="outlined"
                          fullWidth
                          sx={{ marginBottom: "10px" }}
                          disabled={!isEditing}
                          value={fetchedCustomerAddres.Email}
                          onChange={(e) =>
                            setFetchedCustomerAddress({
                              ...fetchedCustomerAddres,
                              Email: e.target.value,
                            })
                          }
                        />

                        <TextField
                          label={`${t("telephone_numbe")}`}
                          variant="outlined"
                          fullWidth
                          disabled={!isEditing}
                          sx={{ marginBottom: "10px" }}
                          value={fetchedCustomerAddres.MobileNo}
                          onChange={(e) =>
                            setFetchedCustomerAddress({
                              ...fetchedCustomerAddres,
                              MobileNo: e.target.value,
                            })
                          }
                        />
                      </>
                    )}

                    <TextField
                      label={`${t("address")}`}
                      variant="outlined"
                      fullWidth
                      disabled
                      value={`บ้านเลขที่ ${fetchedCustomerAddres.Address} ม. ${fetchedCustomerAddres.Moo} ต. ${fetchedCustomerAddres.District} อ. ${fetchedCustomerAddres.Amphure} จ. ${fetchedCustomerAddres.Province}`}
                    />
                  </Grid>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Hidden>
        <Grid container justifyContent="center" alignItems="center" mt={2}>
          <Button variant="contained" color="error" onClick={hadleLogout}>
            {t("logout")}
          </Button>
        </Grid>
      </ThemeProvider>
      <br />
      <br />
      {/* <br />
      <br />
      <br />
      <br /> */}
      {/* <Foots /> */}
    </>
  );
}

export default UserProfile;
