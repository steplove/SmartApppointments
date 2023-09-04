import React, { useState } from "react";
import MenuList from "../MenuLists";
import {
  Button,
  TextField,
  Typography,
  FormControl,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";

function Appointments() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    email: "",
    birthDate: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleTimeSlotChange = (_, newValue) => {
    setFormData((prevState) => ({
      ...prevState,
      timeSlot: newValue,
    }));
  };

  return (
    <>
      <MenuList />

      <Typography variant="h4" style={{ margin: "20px 0", color: "#3f51b5" }}>
        จองนัดหมาย
      </Typography>

      <MKBox px={1} width="100%" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3} sx={{ marginTop: "150px" }}>
            <Card sx={{ backgroundColor: "rgba(255, 255, 255, 1)", padding: "20px" }}>
              <TextField
                label="ชื่อ"
                variant="outlined"
                fullWidth
                margin="normal"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                label="นามสกุล"
                variant="outlined"
                fullWidth
                margin="normal"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
              <TextField
                label="เบอร์โทรศัพท์"
                variant="outlined"
                fullWidth
                margin="normal"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <TextField
                label="อีเมล์"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <FormControl fullWidth style={{ marginTop: "1rem" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="วันที่นัด"
                    value={formData.birthDate}
                    onChange={(date) =>
                      setFormData((prevState) => ({ ...prevState, birthDate: date }))
                    }
                    maxDate={dayjs().subtract(1, "day")}
                    renderInput={(params) => <TextField {...params} name="birthDate" fullWidth />}
                  />
                </LocalizationProvider>
              </FormControl>
              <ToggleButtonGroup
                color="primary"
                value={formData.timeSlot}
                exclusive
                onChange={handleTimeSlotChange}
                fullWidth
              >
                <ToggleButton
                  value="09:00-10:00"
                  selected={formData.timeSlot === "09:00-10:00"}
                  style={
                    formData.timeSlot === "09:00-10:00"
                      ? { backgroundColor: "#3f51b5", color: "#fff" }
                      : {}
                  }
                >
                  09:00-10:00
                </ToggleButton>
                <ToggleButton
                  value="10:00-11:00"
                  selected={formData.timeSlot === "10:00-11:00"}
                  style={
                    formData.timeSlot === "10:00-11:00"
                      ? { backgroundColor: "#3f51b5", color: "#fff" }
                      : {}
                  }
                >
                  10:00-11:00
                </ToggleButton>
                <ToggleButton
                  value="11:00-12:00"
                  selected={formData.timeSlot === "11:00-12:00"}
                  style={
                    formData.timeSlot === "11:00-12:00"
                      ? { backgroundColor: "#3f51b5", color: "#fff" }
                      : {}
                  }
                >
                  11:00-12:00
                </ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup
                color="primary"
                value={formData.timeSlot}
                exclusive
                onChange={handleTimeSlotChange}
                fullWidth
              >
                <ToggleButton
                  value="13:00-14:00"
                  selected={formData.timeSlot === "13:00-14:00"}
                  style={
                    formData.timeSlot === "13:00-14:00"
                      ? { backgroundColor: "#3f51b5", color: "#fff" }
                      : {}
                  }
                >
                  13:00-14:00
                </ToggleButton>
                <ToggleButton
                  value="14:00-15:00"
                  selected={formData.timeSlot === "14:00-15:00"}
                  style={
                    formData.timeSlot === "14:00-15:00"
                      ? { backgroundColor: "#3f51b5", color: "#fff" }
                      : {}
                  }
                >
                  14:00-15:00
                </ToggleButton>
              </ToggleButtonGroup>

              <Button variant="contained" style={{ marginTop: "20px", color: "white" }}>
                ยืนยันการจอง
              </Button>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
    </>
  );
}

export default Appointments;
