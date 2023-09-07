import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list"; // <-- import listPlugin
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import "./Calendar.css";
function CalendarComponent() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const events = [
    {
      title: "นัด",
      date: "2023-09-10",
      description: "รอยืนยันการนัด",
      location: "ที่ตั้งของคลินิก",
      status: "waiting-confirmation",
    },
    {
      title: "นัด",
      date: "2023-09-11",
      description: "ยกเลิกการนัด",
      location: "ที่ตั้งของคลินิก",
      status: "cancelled",
    },
    {
      title: "นัด",
      date: "2023-09-12",
      description: "ยืนยันการนัด",
      location: "ที่ตั้งของคลินิก",
      status: "confirmed",
    },
    {
      title: "นัด",
      date: "2023-09-13",
      description: "มาตามนัด",
      location: "ที่ตั้งของคลินิก",
      status: "attended",
    },
  ];
  const eventClassNames = (eventInfo) => {
    switch (eventInfo.event.extendedProps.status) {
      case "waiting-confirmation":
        return "waiting-confirmation";
      case "cancelled":
        return "cancelled";
      case "confirmed":
        return "confirmed";
      case "attended":
        return "attended";
      default:
        return "";
    }
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <FullCalendar
        themeSystem="standard"
        contentHeight="430px"
        eventClassNames={eventClassNames}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        locale={"th"}
        headerToolbar={{
          left: "",
          center: "title",
          right: "",
        }}
        eventClick={(info) => {
          setSelectedEvent(info.event);
        }}
        events={events}
      />

      {selectedEvent && (
        <Dialog open={Boolean(selectedEvent)} onClose={() => setSelectedEvent(null)}>
          <DialogTitle>รายละเอียดการนัดหมาย</DialogTitle>
          <DialogContent>
            <Typography variant="h6">{selectedEvent.title}</Typography>
            <Typography variant="subtitle1">{selectedEvent.extendedProps.description}</Typography>
            <Typography variant="subtitle2">{selectedEvent.extendedProps.location}</Typography>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default CalendarComponent;
