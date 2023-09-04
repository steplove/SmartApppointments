import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
const appointments = {
  "2023-09-10": "นัดหมายกับ Dr.Smith",
  "2023-09-11": "นัดหมายกับ Dr.Smith2",
  "2023-09-29": "นัดหมายกับ Dr.Smith3",
};

function AppointmentsCalendar() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log(selectedDate);
  const handleDateClick = (date) => {
    const dateString = dayjs(date).format("YYYY-MM-DD");
    if (appointments[dateString]) {
      setSelectedAppointment(appointments[dateString]);
      setShowDialog(true);
    }
  };

  const tileContent = ({ date, view }) => {
    const localDateString = dayjs(date).format("YYYY-MM-DD");
    if (view === "month" && appointments[localDateString]) {
      return <p style={{ color: "red" }}>•</p>; // เครื่องหมายสำหรับวันที่มีนัดหมาย
    }
  };

  return (
    <>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        onClickDay={handleDateClick}
        tileContent={tileContent}
      />
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>รายละเอียดการนัดหมาย</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedAppointment}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} color="primary">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AppointmentsCalendar;
