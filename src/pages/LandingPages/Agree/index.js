import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import bgImage from "assets/images/hospital.png";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
function Agree() {
  const handleLoginClick = () => {
    window.location.href = "/signInBasic";
  };

  return (
    <div style={{ position: "relative" }}>
      <Image
        src={bgImage}
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          objectPosition: "center",
          opacity: 0.8,
          filter: "blur(2px)",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/main">
                  หน้าหลัก
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/agree">
                  สมัครสมาชิก
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  เข้าสู่ระบบ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          //   height: "calc(65vh - 64px)", // Adjust height as needed
          //   marginTop: "calc(30vh - 64px)", // Adjust margin-top as needed
        }}
      >
        <Card
          style={{
            marginTop: "5%",
            maxWidth: "800px",
            marginRight: "2%",
            borderTopLeftRadius: "0.7rem",
            borderTopRightRadius: "0.7rem",
          }}
        >
          <Card.Header style={{ backgroundColor: "#01817a", color: "white" }}>
            <h5 style={{ fontSize: "1rem" }}>ข้อกำหนดและระบบลงทะเบียนผู้ป่วยล่วงหน้า</h5>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <span style={{ fontSize: "2rem" }}>
                  <i className="bi bi-list text-primary"></i>
                </span>{" "}
                ท่านที่มีนัดกับทาง รพ. อยู่แล้วไม่จำเป็นต้องจองผ่านระบบนี้
              </ListGroup.Item>
              <ListGroup.Item>
                <span style={{ fontSize: "2rem" }}>
                  <i className="bi bi-list text-primary"></i>
                </span>{" "}
                ระบบนี้อำนวยความสะดวกเพื่อลดขั้นตอนให้ท่านไม่ต้องไปติดต่อลงทะเบียน
                และติดต่อศูนย์คัดกรอง ท่านสามารถไปที่หน้าห้องตรวจได้เลย และเมื่อไปถึง
                หน้าห้องตรวจแล้ว ขอความกรุณาแจ้งกับพยาบาลหน้าห้องตรวจว่า
                ได้ทำการลงทะเบียนออนไลน์มาแล้ว
              </ListGroup.Item>
              <ListGroup.Item>
                <span style={{ fontSize: "2rem" }}>
                  <i className="bi bi-list text-primary"></i>
                </span>{" "}
                ระบบนี้มิใช่การจองคิวเพื่อจัดลำดับการเข้าพบแพทย์
              </ListGroup.Item>
              <ListGroup.Item>
                <span style={{ fontSize: "2rem" }}>
                  <i className="bi bi-list text-primary"></i>
                </span>{" "}
                หลังจากจองลงทะเบียนตรวจล่วงหน้าแล้ว กรุณารอรับข้อความ SMS จาก รพ.
                ซึ่งถ้าช่วงเวลาที่ท่านทำรายการเป็นช่วงนอกเวลาราชการ หรือวันหยุดราชการ
                กรุณารอรับข้อความ SMS ในวันเปิดทำการถัดไป
              </ListGroup.Item>
              <ListGroup.Item>
                <span style={{ fontSize: "2rem" }}>
                  <i className="bi bi-list text-primary"></i>
                </span>{" "}
                เปิดบริการเฉพาะ ผู้ป่วยชำระเงิน ข้าราชการ/รัฐวิสาหกิจนำใบเสร็จไปเบิก
                ข้าราชการเบิกตรง ประกันสังคม เกษมราษฎร์ ศรีบุรินทร์
                ประกันสุขภาพถ้วนหน้าโรงพยาบาลมเกษมราษฎร์ ศรีบุรินทร์
              </ListGroup.Item>
            </ListGroup>
            <Button
              variant="outline-primary"
              onClick={handleLoginClick}
              style={{
                backgroundColor: "#367f7a",
                color: "white",
                marginTop: "1rem",
                borderColor: "#367f7a",
              }}
            >
              เข้าสู่ระบบ
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Agree;
