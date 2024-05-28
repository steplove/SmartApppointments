import React from "react";
import { saveAs } from "file-saver";
function DownloadPDFButton() {
  const downloadPDF = () => {
    // สร้าง URL ของไฟล์ PDF (สมมติว่าเป็น URL ของ API หรือเซิร์ฟเวอร์ที่สร้าง PDF)
    const pdfUrl = "/api/generate-pdf"; // เปลี่ยนเป็น URL ที่เหมาะสม

    // ใช้ file-saver เพื่อดาวน์โหลดไฟล์
    saveAs(pdfUrl, "downloaded-file.pdf");
  };
  return (
    <div>
      {" "}
      <div>
        <button onClick={downloadPDF}>Download PDF</button>
      </div>
    </div>
  );
}

export default DownloadPDFButton;
