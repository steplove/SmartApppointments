import React, { useState, useEffect } from "react";
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
import { BASE_URL } from "../../constants/constants";
import useTokenCheck from "hooks/useTokenCheck";
import Barcode from "react-barcode";

function CalendarComponent() {
  const [, HN, , ,] = useTokenCheck();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchAppointments(HN) {
      try {
        const response = await fetch(BASE_URL + `/api/AllAppointmentsWhereHN/${HN}`);

        if (response.ok) {
          const data = await response.json();
          const formattedEvents = data.map((appointment) => ({
            title: "นัด",
            date: appointment.Appointment_Date.split("T")[0],
            time: `1970-01-01T${appointment.Appointment_Time}:00.000Z`.substring(22, 27),
            description: appointment.APM_Des,
            StatusFlag: appointment.StatusFlag,
            APM_No: appointment.APM_No,
          }));
          setEvents(formattedEvents);
        } else {
          console.error("ไม่สามารถดึงข้อมูลได้");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    }

    if (HN) {
      fetchAppointments(HN);
    }
  }, [HN]);

  const eventClassNames = (eventInfo) => {
    switch (eventInfo.event.extendedProps.StatusFlag) {
      case "3":
        return "waiting-confirmation";
      case "5":
        return "cancelled";
      case "4":
        return "confirmed";
      case "6":
        return "complete";
      default:
        return "";
    }
  };

  const getStatusText = (statusFlag) => {
    switch (statusFlag) {
      case "3":
        return "รอยืนยันการนัด";
      case "4":
        return "ยืนยันการนัดหมาย";
      case "5":
        return "cancelled";
      case "6":
        return "complete";
      default:
        return "unknown";
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
        <Dialog
          open={Boolean(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>รายละเอียดการนัดหมาย</DialogTitle>
          <DialogContent
            style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
            fullWidth
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    style={{ fontSize: "20px", fontWeight: "bold", textAlign: "left" }}
                    fullWidth
                  >
                    {selectedEvent.title}
                  </Typography>
                </div>
                <div style={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    style={{ fontSize: "15px", fontWeight: "bold", textAlign: "left" }}
                    fullWidth
                  >
                    สถานะ: {getStatusText(selectedEvent.extendedProps.StatusFlag)}
                  </Typography>
                </div>
              </div>
              <Typography
                variant="subtitle1"
                style={{ fontSize: "16px", textAlign: "left" }}
                fullWidth
              >
                รายละเอียด : {selectedEvent.extendedProps.description}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ fontSize: "16px", textAlign: "left" }}
                fullWidth
              >
                เวลา : {selectedEvent.extendedProps.time} น.
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ fontSize: "16px", textAlign: "left" }}
                fullWidth
              >
                เลขที่นัดหมาย :
              </Typography>
              <Barcode value={selectedEvent.extendedProps.APM_No} fullWidth />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default CalendarComponent;
