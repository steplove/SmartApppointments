import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  CircularProgress,
  LinearProgress,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BASE_URL } from "constants/constants";

const MySwal = withReactContent(Swal);

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploading, setUploading] = useState(false);

  const MAX_FILES = 10;

  const onDrop = (acceptedFiles) => {
    if (files.length + acceptedFiles.length > MAX_FILES) {
      alert(`จำกัดสูงสุด ${MAX_FILES} files.`);
      return;
    }
    setFiles([...files, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
    multiple: true,
  });

  const handleUpload = async () => {
    if (files.length === 0) {
      MySwal.fire({
        icon: "warning",
        title: "กรุณาเพิ่มไฟล์",
        text: "คุณต้องเพิ่มไฟล์ก่อนทำการอัปโหลด!",
      });
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    setUploading(true);

    try {
      await axios.post(BASE_URL + "/api/uploadPDF", formData, {
        onUploadProgress: (progressEvent) => {
          const total = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress({ total });
        },
      });

      setFiles([]);
      setUploading(false);
      setUploadProgress({});
      MySwal.fire({
        icon: "success",
        title: "เพิ่มไฟล์สำเร็จ",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploading(false);
    }
  };

  const handleRemoveFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="container">
      <Typography variant="h5" sx={{ marginBottom: "20px", marginTop: "20px" }}>
        Check UP File PDF Upload
      </Typography>
      <div>
        <Typography variant="h6" sx={{ marginBottom: "20px", marginTop: "20px", color: "red" }}>
          ** จำกัดสูงสุด 10 ไฟล์ **
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #cccccc",
            padding: "20px",
            textAlign: "center",
            backgroundColor: isDragActive ? "#e6f7ff" : "#fafafa",
            cursor: "pointer",
            borderRadius: "5px",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="body1">
            {isDragActive ? "ปล่อยไฟล์ที่นี่..." : "ลากไฟล์ PDF มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์"}
          </Typography>
        </Box>

        {files.length > 0 && (
          <Box>
            <List>
              {files.map((file, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveFile(file.name)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
            </List>

            {uploading && (
              <Box sx={{ marginTop: "20px" }}>
                <Typography variant="body2">Uploading... {uploadProgress.total}%</Typography>
                <LinearProgress variant="determinate" value={uploadProgress.total} />
              </Box>
            )}
          </Box>
        )}

        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Upload Files"}
          </button>
        </Box>
      </div>
    </div>
  );
};

export default FileUpload;
