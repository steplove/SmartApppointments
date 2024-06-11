import React, { useState } from "react";
import "./Quiz.css";
// import headerImage from "../../../assets/images/rotating-card-bg-back.jpeg";
// import questionImage from "../../../assets/images/bg-about-us.jpg"; // Update this path to your question image
import { BASE_URL } from "constants/constants";

function QuizDisplay() {
  const questions = [
    "ท่านจะงีบหรือเผลอหลับ ขณะนั่งอ่านหนังสือ",
    "ท่านจะงีบหรือเผลอหลับ ขณะดูโทรทัศน์",
    "ท่านจะงีบหรือเผลอหลับ ขณะนั่งพัก นอกบ้าน ในที่สาธารณะ เช่น ในห้องสู้มู หรือโรงภาพยนตร์",
    "ท่านจะงีบหรือเผลอหลับ ขณะนั่งโดยสาร ในรถ เรือ นานๆ อย่างน้อย 1 ชั่วโมง คิดคดอีกทีเป็นบางงาน",
    "ท่านจะงีบหรือเผลอหลับ ขณะนอนพักตอนบ่าย เมื่อมีโอกาส ไม่ได้ผิดพลาดแต่อย่างใด",
    "ท่านจะงีบหรือเผลอหลับ ขณะนั่งคุยกับเพื่อน",
    "ท่านจะงีบหรือเผลอหลับ ขณะนั่งเงียบๆ หลังอาหารกลางวัน โดยไม่ได้ดื่มแอลกอฮอล์",
    "ท่านจะงีบหรือเผลอหลับ ขณะขับรถ และต้องหยุดรถในขณะการจราจรคับคั่ง",
  ];

  const conditions = [
    { min: 0, max: 10, message: "คะแนนน้อยกว่า 10 แสดงว่าไม่มีปัญหาง่วงนอน" },
    { min: 11, max: 14, message: "คะแนน 10-14 แสดงว่ามีอาการง่วงนอนเล็กน้อย" },
    { min: 15, max: 18, message: "คะแนน 15-18 แสดงว่าง่วง นอนปานกลาง" },
    {
      min: 19,
      max: 24,
      message: "คะแนนมากกว่า 18 แสดงว่ามีอาการง่วงนอนมาก ควรปรึกษาแพทย์เพื่อตรวจหาสาเหตุ",
    },
  ];

  const [stage, setStage] = useState(0);
  const [Eva_fullname, setEva_fullname] = useState("");
  const [Eva_Tel, setEva_Tel] = useState("");
  const [Eva_Email, setEva_Email] = useState("");
  const [Eva_Agree, setEva_Agree] = useState("0");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("กรุณาตอบทุกคำถามก่อนส่ง");
    } else {
      setSubmitted(true);
      sendResults();
    }
  };
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const handleAgreeClick = () => {
    setEva_Agree("1");
    setStage(2);
  };
  const handleNewQuiz = () => {
    window.location.href = "/Quiz";
  };
  const handleHome = () => {
    window.location.href = "/presentation";
  };
  // console.log("answers:", answers);
  // console.log("name:", Eva_fullname);
  console.log("Eva_Agree:", Eva_Agree);
  const sendResults = async () => {
    const totalScore = answers.reduce((acc, answer) => acc + (answer !== null ? answer : 0), 0);
    // console.log("totalScore:", totalScore);
    const resultData = {
      Eva_fullname,
      Eva_Tel,
      Eva_Agree,
      Eva_Email,
      answers,
      TotalScore: totalScore,
    };
    console.log(resultData, "resultData");
    try {
      const response = await fetch(BASE_URL + "/api/QuizResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Result submitted successfully:", responseData);
    } catch (error) {
      console.error("Error submitting result:", error);
    }
  };

  const totalScore = answers.reduce((acc, answer) => acc + (answer !== null ? answer : 0), 0);
  const resultMessage =
    conditions.find((cond) => totalScore >= cond.min && totalScore <= cond.max)?.message || "";

  const progressPercentage = Math.round(((currentQuestion + 1) / questions.length) * 100);

  return (
    <>
      <header
        style={{ display: "flex", alignItems: "center", marginLeft: "5%", marginTop: "20px" }}
      >
        <div className="logo">
          <a href="https://www.kasemrad.co.th/">
            <img src="https://www.kasemrad.co.th/asset/site/images/logo.png" alt="Kasemrad Logo" />
          </a>
        </div>
      </header>
      <div
        className="quiz-container"
        style={{
          backgroundColor: "#f0f2f5",
        }}
      >
        {stage === 0 && (
          <div className="initial-screen centered" style={{ maxWidth: "650px", margin: "auto" }}>
            {/* <img alt="Header" className="header-image" /> */}
            <img
              src="https://images.squarespace-cdn.com/content/v1/5804e890b8a79b7fbfbc76bc/1567029993166-MF1LAVVGZT9Q0TALRBRV/AliceNightOne_inUseAsleep_0514_CKHiLg.jpg?format=2500w"
              alt="sleeptest"
              style={{ width: "650px", height: "450px", marginTop: "-150px" }}
            />
            <div style={{ color: "black", fontSize: "1rem", marginTop: "20px" }}>
              <h3>แบบประเมิน ก่อนการตรวจความผิดปกติขณะนอนหลับ</h3>
              <h5>โดยใช้แบบประเมิน Epworth sleepiness scale ซึ่งมีคำถาม 8 ข้อ ต่อไปนี้</h5>
            </div>

            <button onClick={() => setStage(1)} style={{ background: "#76c7c0" }}>
              เริ่มการประเมิน
            </button>
          </div>
        )}
        {stage === 1 && (
          <div
            className="privacy-policy-screen centered card-body"
            style={{
              maxWidth: "660px",
              maxHeight: "400px",
              margin: "auto",
              color: "black",
              fontSize: "1.2rem",
            }}
          >
            <h1>นโยบายความเป็นส่วนตัว</h1>
            <p>
              ข้อมูลส่วนบุคคลของท่าน
              จะได้รับความคุ้มครองตามรายละเอียดที่ปรากฏบนนโยบายความเป็นส่วนตัว
              <p>
                <a
                  href="https://www.bangkokchainhospital.com/th/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.bangkokchainhospital.com/th/privacy-policy
                </a>
              </p>
            </p>
            <div className="button-group">
              <button onClick={handleAgreeClick} style={{ background: "#76c7c0" }}>
                ยินยอม
              </button>
              <button
                onClick={() => alert("ท่านต้องยินยอมเพื่อนดำเนินการต่อ")}
                style={{ background: "#F898A4" }}
              >
                ไม่ยินยอม
              </button>
            </div>
          </div>
        )}
        {stage === 2 && (
          <div
            className="xs-12 md-6 lg-12"
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <div
              className="card-body"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: 450,
                minHeight: 400,
                margin: "0 5px",
              }}
            >
              {" "}
              <div className="input-screen centered" style={{ color: "black" }}>
                <h2>กรุณากรอกชื่อผู้ทำแบบประเมิน</h2>
                <input
                  type="text"
                  value={Eva_fullname}
                  onChange={(e) => setEva_fullname(e.target.value)}
                  placeholder="ชื่อ"
                />
                <button onClick={() => setStage(3)} style={{ background: "#76c7c0" }}>
                  ตกลง
                </button>
              </div>
            </div>
          </div>
        )}
        {stage === 3 && (
          <div
            className="xs-12 md-6 lg-12"
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <div
              className="input-screen centered card-body"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: 450,
                minHeight: 200,
                margin: "0 5px",
                color: "black",
              }}
            >
              <h2>กรุณากรอกเบอร์โทรศัพท์และอีเมลผู้ทำแบบประเมิน</h2>
              <input
                type="tel"
                value={Eva_Tel}
                onChange={(e) => setEva_Tel(e.target.value)}
                placeholder="เบอร์โทรศัพท์"
              />
              <input
                type="email"
                value={Eva_Email}
                onChange={(e) => setEva_Email(e.target.value)}
                placeholder="อีเมล"
              />
              <button onClick={() => setStage(4)} style={{ background: "#76c7c0" }}>
                ตกลง
              </button>
            </div>
          </div>
        )}
        {stage === 4 && !submitted && (
          <div
            className="xs-12 md-6 lg-12"
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <div
              className="quiz-question centered card-body"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                maxWidth: 450,
                minHeight: 200,
                margin: "0 5px",
                color: "black",
              }}
            >
              {/* <img src={questionImage} alt="Question" className="question-image" width={500} /> */}
              <h3 style={{ marginTop: "20px" }}>
                {currentQuestion + 1}. {questions[currentQuestion]}
              </h3>
              <p>0-ไม่เคยเลย, 1-มีโอกาสเล็กน้อย, 2-มีโอกาสปานกลาง, 3-มีโอกาสสูงมาก</p>
              <div className="quiz-answers">
                {[0, 1, 2, 3].map((value) => (
                  <button
                    key={value}
                    className={`quiz-answer ${
                      answers[currentQuestion] === value ? "selected" : ""
                    }`}
                    onClick={() => handleAnswerChange(value)}
                  >
                    <p style={{ marginTop: "15px" }}>{value}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {submitted && (
          <div className="quiz-result centered" style={{ color: "black" }}>
            <h2>ผลคะแนนรวม: {totalScore}</h2>
            <p>{resultMessage}</p>
            <p>
              รพ.เกษมราษฎร์ศรีบุรินทร์ และห่วงใยให้ทุกคนมีสุขภาพที่ดี โดยการหมั่นออกกำลังกาย
              ทานอาหารที่มีประโยชน์ และไม่เครียดจนเกินไป
            </p>
            <button
              className="btn btn-secondary"
              onClick={handleNewQuiz}
              style={{ background: "#0caf69" }}
            >
              เริ่มใหม่
            </button>
            <button onClick={handleHome} className="btn btn-secondary">
              กลับหน้าหลัก
            </button>
          </div>
        )}
        {submitted ? null : (
          <footer className="quiz-footer">
            <button onClick={handleBack} disabled={currentQuestion === 0}>
              <h6 style={{ fontSize: "1rem" }}>กลับ</h6>
            </button>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <span style={{ color: "black" }}>{progressPercentage}% เสร็จสิ้น</span>
            {currentQuestion < questions.length - 1 ? (
              <button onClick={handleNext}>
                <h6 style={{ fontSize: "1rem" }}>ถัดไป</h6>
              </button>
            ) : (
              <button className="submit-button" onClick={handleSubmit}>
                <h6 style={{ fontSize: "1rem" }}>ส่งแบบทดสอบ</h6>
              </button>
            )}
          </footer>
        )}
      </div>
    </>
  );
}

export default QuizDisplay;
