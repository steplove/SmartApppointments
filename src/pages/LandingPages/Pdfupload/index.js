import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, token } from "constants/constants";
import Swal from "sweetalert2";

function Pdfupload() {
  const [file, setFile] = useState(null);
  const [show, setShow] = useState([]);
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handelshow = async () => {
    try {
      const response = await axios.get(BASE_URL + "/api/show-files", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setShow(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
      // ทำอย่างไรก็ได้ที่คุณต้องการเมื่อเกิดข้อผิดพลาดในการเรียก API
    }
  };

  useEffect(() => {
    handelshow();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(BASE_URL + "/api/uploadpdf", {
        method: "POST",
        body: formData,
      });
      const text = await response.text();
      console.log("Response:", text);

      if (text === "File uploaded and saved to database.") {
        console.log("File uploaded successfully");
      } else {
        console.error("Unexpected response:", text);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const downloadPdf = async (filename) => {
    try {
      Swal.fire({
        title: "กำลังดาวน์โหลด",
        text: "กรุณารอสักครู่...",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      setTimeout(async () => {
        const response = await axios.get(BASE_URL + `/api/downloadpdf/${filename}`, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // สร้าง URL สำหรับไฟล์ PDF ที่จะใช้ในการดาวน์โหลด
        const url = window.URL.createObjectURL(new Blob([response.data]));
        // สร้างลิงก์สำหรับการดาวน์โหลด
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        Swal.close();
        console.log("File downloaded successfully");
      }, 2000);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
      <h3>list file name download</h3>
      {show.map((shows, index) => (
        <div key={index}>
          <h3>{shows.FileName}</h3>
          <button onClick={() => downloadPdf(shows.FileName)}>Download PDF</button>
        </div>
      ))}
    </div>
  );
}

export default Pdfupload;
