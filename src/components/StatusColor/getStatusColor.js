// components/getStatusColor.js

export function getStatusColor(status) {
  switch (status) {
    case "confirmed":
      return "#4CAF50"; // เขียว
    case "pending":
      return "#FFC107"; // ส้ม
    case "cancelled":
      return "#F44336"; // แดง
    default:
      return "#9E9E9E"; // สีเทา (สำหรับสถานะอื่นๆ ที่ไม่รู้จัก)
  }
}
