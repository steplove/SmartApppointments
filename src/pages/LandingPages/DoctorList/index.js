import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Typography,
  Box,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Paper,
  Hidden,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import MenuList from "../MenuLists";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import docA from "assets/images/doctors/doctorA.jpg";
import docB from "assets/images/doctors/doctorB.jpg";
import docC from "assets/images/doctors/doctorC.jpg";
function DoctorList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
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
  });
  const doctors = [
    {
      id: 1,
      nameEN: "Dr. A",
      nameTH: "เเพทย์หญิงกชกร สันติมาลาพงษ์ ",
      department: "ศูนย์ หู คอ จมูก",
      images: `${docA}`,
      specialties: ["โสต", "สอ", "จมูกนาสิกวิทยา"],
    },
    {
      id: 2,
      nameEN: "Dr. ฺB",
      nameTH: "นายแพทย์กฤช รอดอารีย์ ",
      department: "ศูนย์ไตเทียม",
      images: `${docB}`,
      specialties: ["แพทย์ประจำศูนย์ไตเทียม"],
    },
    {
      id: 3,
      nameEN: "Dr. ฺB",
      nameTH: "แพทย์หญิงกิจพร โฆษิตพิพัฒน์",
      department: "ศูนย์ตาและผ่าตัดต้อกระจก",
      images: `${docC}`,
      specialties: ["จักษุวิทยา"],
    },
  ];

  useEffect(() => {
    setFilteredDoctors(
      doctors.filter((doctor) => doctor.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, doctors]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleDialogOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setSelectedDoctor(null);
    setOpenDialog(false);
  };

  return (
    <>
      <MenuList />
      <ThemeProvider theme={theme}>
        <Box mt={4} mx="auto" maxWidth={600}>
          <Typography variant="h4" gutterBottom align="center">
            รายชื่อแพทย์
          </Typography>
          <Box mb={3}>
            <TextField
              size="small"
              fullWidth
              label="ค้นหาตามแผนก"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* Desktop/Tablet View */}
          <Hidden smDown>
            {filteredDoctors.map((doctor) => (
              <Paper
                key={doctor.id}
                elevation={2}
                style={{ marginTop: "20px", padding: "20px", borderRadius: "15px" }}
              >
                <Grid container direction="column" alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar
                      src={doctor.images}
                      alt={doctor.nameEN}
                      style={{
                        width: "auto",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{doctor.nameTH}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="textSecondary">
                      {doctor.department}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<InfoIcon />}
                      style={{ borderRadius: "20px" }}
                      onClick={() => {
                        handleDialogOpen(doctor);
                      }}
                    >
                      ดูรายละเอียด
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Hidden>
          {/* Mobile View */}
          <Hidden mdUp>
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} style={{ marginTop: "20px", borderRadius: "15px" }}>
                <Box display="flex" alignItems="center" p={2}>
                  <Avatar
                    src={doctor.images}
                    alt={doctor.nameEN}
                    style={{ width: "auto", height: "80px", marginRight: "20px" }}
                  />
                  <Box flexGrow={1}>
                    <Typography variant="h6" style={{ fontSize: "15px" }}>
                      {doctor.nameTH}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {doctor.department}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<InfoIcon />}
                    color="primary"
                    style={{ borderRadius: "20px", margin: "10px 0" }} // Add rounded corners and margin
                    onClick={() => {
                      handleDialogOpen(doctor);
                    }}
                  >
                    <Typography style={{ fontSize: "10px" }}>ดูรายละเอียด</Typography>
                  </Button>
                </Box>
              </Card>
            ))}
          </Hidden>
        </Box>
        <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>รายละเอียดของ {selectedDoctor?.nameTH}</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedDoctor?.nameTH}</Typography>
            <Typography variant="h6">{selectedDoctor?.nameEN}</Typography>

            {/* Specialties */}
            <Typography variant="subtitle1" style={{ marginTop: "10px" }}>
              ความเชี่ยวชาญเฉพาะทาง:
            </Typography>
            {selectedDoctor?.specialties.map((spec, index) => (
              <Typography key={index} variant="body2">
                - {spec}
              </Typography>
            ))}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              ปิด
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
}

export default DoctorList;
