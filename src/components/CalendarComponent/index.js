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

  return (
    <div style={{ maxWidth: "100%" }}>
      <FullCalendar
        themeSystem="bootstrap"
        contentHeight="auto"
        eventClassNames="my-custom-event-class"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "",
          center: "title",
          right: "",
        }}
        eventClick={(info) => {
          setSelectedEvent(info.event);
        }}
        events={[
          {
            title: "นัด",
            date: "2023-09-10",
            description: "รายละเอียดของการนัดหมาย",
            location: "ที่ตั้งของคลินิก",
          },
          { title: "นัด", date: "2023-09-15" },
        ]}
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
