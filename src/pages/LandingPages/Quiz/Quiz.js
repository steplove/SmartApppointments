// src/Quiz.js
import React, { useState } from "react";
import "./Quiz.css";

const questions = [
  "ขณะนั่งอ่านหนังสือ",
  "ขณะดูโทรทัศน์",
  "ขณะนั่งพัก นอกบ้าน ในที่สาธารณะ เช่น ในห้องสู้มู หรือโรงภาพยนตร์",
  "ขณะนั่งโดยสาร ในรถ เรือ นานๆ อย่างน้อย 1 ชั่วโมง คิดคดอีกทีเป็นบางงาน",
  "ขณะนอนพักตอนบ่าย เมื่อมีโอกาส ไม่ได้ผิดพลาดแต่อย่างใด",
  "ขณะนั่งคุยกับเพื่อน",
  "ขณะนั่งเงียบๆ หลังอาหารกลางวัน โดยไม่ได้ดื่มแอลกอฮอล์",
  "ขณะขับรถ และต้องหยุดรถในขณะการจราจรคับคั่ง",
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

const Quiz = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const totalScore = answers.reduce((acc, answer) => acc + (answer !== null ? answer : 0), 0);
  const resultMessage =
    conditions.find((cond) => totalScore >= cond.min && totalScore <= cond.max)?.message || "";

  return (
    <div className="quiz-container">
      <h1>Epworth Sleepiness Scale</h1>
      {questions.map((question, index) => (
        <div key={index} className="quiz-question">
          <p>
            {index + 1}. {question}
          </p>
          <div className="quiz-answers">
            {[0, 1, 2, 3].map((value) => (
              <button
                key={value}
                className={`quiz-answer ${answers[index] === value ? "selected" : ""}`}
                onClick={() => handleAnswerChange(index, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      {submitted && (
        <div className="quiz-result">
          <h2>ผลคะแนนรวม: {totalScore}</h2>
          <p>{resultMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
import React, { useState } from "react";
import "./Quiz.css";
import headerImage from "../../../assets/images/rotating-card-bg-back.jpeg";
import questionImage from "../../../assets/images/Quiz.jpg"; // Update this path to your question image

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

  const [stage, setStage] = useState(0); // 0: initial, 1: privacy policy, 2: name input, 3: email input, 4: quiz
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
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

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("กรุณาตอบทุกคำถามก่อนส่ง");
    } else {
      setSubmitted(true);
      sendResults();
    }
  };

  const sendResults = async () => {
    const totalScore = answers.reduce((acc, answer) => acc + (answer !== null ? answer : 0), 0);

    const resultData = {
      name,
      email,
      score: totalScore,
    };

    try {
      const response = await fetch("http://your-nodejs-api-endpoint.com/results", {
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
    <div className="quiz-container">
      {stage === 0 && (
        <div className="initial-screen centered">
          <img src={headerImage} alt="Header" className="header-image" width={500} />
          <h1>คุณมีอาการง่วงผิดปกติหรือไม่?</h1>
          <button onClick={() => setStage(1)}>Lets Go!</button>
        </div>
      )}
      {stage === 1 && (
        <div className="privacy-policy-screen centered">
          <h1>นโยบายความเป็นส่วนตัว</h1>
          <p>
            ข้อมูลส่วนบุคคลของท่านที่เราจัดเก็บรวบรวม ใช้ เปิดเผยจากแบบทดสอบออนไลน์นี้
            จะได้รับความคุ้มครองตามรายละเอียดที่ปรากฏในนโยบายความเป็นส่วนตัว
            <a
              href="https://www.bangkokchainhospital.com/th/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.bangkokchainhospital.com/th/privacy-policy
            </a>
          </p>
          <p>
            เพื่อประโยชน์ในการส่งข่าวสารอันเป็นประโยชน์กับท่าน ท่านยินยอมให้โรงพยาบาลเก็บรวบรวม ใช้
            เปิดเผยข้อมูลส่วนบุคคลของท่านหรือไม่
          </p>
          <div className="button-group">
            <button onClick={() => setStage(2)}>ยินยอม</button>
            <button onClick={() => alert("ท่านต้องยินยอมเพื่อนดำเนินการต่อ")}>ไม่ยินยอม</button>
          </div>
        </div>
      )}
      {stage === 2 && (
        <div className="input-screen centered">
          <h1>กรอกชื่อของคุณ</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อ"
          />
          <button onClick={() => setStage(3)}>ตกลง</button>
        </div>
      )}
      {stage === 3 && (
        <div className="input-screen centered">
          <h1>กรอกอีเมล์ของคุณ</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="อีเมล์"
          />
          <button onClick={() => setStage(4)}>ตกลง</button>
        </div>
      )}
      {stage === 4 && !submitted && (
        <div className="quiz-question centered">
          <h1>Epworth Sleepiness Scale</h1>
          <img src={questionImage} alt="Question" className="question-image" width={500} />
          <p>
            {currentQuestion + 1}. {questions[currentQuestion]}
          </p>
          <p>0-ไม่เคยเลย, 1-มีโอกาสเล็กน้อย, 2-มีโอกาสปานกลาง, 3-มีโอกาสสูงมาก</p>
          <div className="quiz-answers">
            {[0, 1, 2, 3].map((value) => (
              <button
                key={value}
                className={`quiz-answer ${answers[currentQuestion] === value ? "selected" : ""}`}
                onClick={() => handleAnswerChange(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}
      {submitted && (
        <div className="quiz-result centered">
          <h2>ผลคะแนนรวม: {totalScore}</h2>
          <p>{resultMessage}</p>
        </div>
      )}
      <footer className="quiz-footer">
        <button onClick={handleBack} disabled={currentQuestion === 0}>
          <h6 style={{ fontSize: "1rem" }}>ย้อนกลับ</h6>
        </button>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <span>{progressPercentage}% เสร็จสิ้น</span>
        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNext}>
            <h6 style={{ fontSize: "1rem" }}>ถัดไป</h6>
          </button>
        ) : (
          <button className="submit-button" onClick={handleSubmit}>
            <h6 style={{ fontSize: "1rem" }}>Submit</h6>
          </button>
        )}
      </footer>
    </div>
  );
}

export default QuizDisplay;
