import React, { useState } from "react";
import "./Quiz.css";
// import headerImage from "../../../assets/images/rotating-card-bg-back.jpeg";
// import questionImage from "../../../assets/images/bg-about-us.jpg"; // Update this path to your question image
import { BASE_URL } from "constants/constants";
import LanguageSelector from "LanguageSelector";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

function QuizDisplay() {
  const { t } = useTranslation();
  const questions = [
    t("sub_sleep_ask_1"),
    t("sub_sleep_ask_2"),
    t("sub_sleep_ask_3"),
    t("sub_sleep_ask_4"),
    t("sub_sleep_ask_5"),
    t("sub_sleep_ask_6"),
    t("sub_sleep_ask_7"),
    t("sub_sleep_ask_8"),
  ];

  const conditions = [
    { min: 0, max: 10, message: t("sub_sleep_score_10") },
    { min: 11, max: 14, message: t("sub_sleep_score_14") },
    { min: 15, max: 18, message: t("sub_sleep_score_15") },
    {
      min: 19,
      max: 24,
      message: t("sub_sleep_score_18"),
    },
  ];
  const textResult = t("sub_sleep_score_detail");
  // const textResult0 =
  //   " คะแนน >18 แสดงว่าง่วงนอนมากคำแนะนำสำหรับการวินิจฉัยและการดูแลรักษา ภาวะหยุดหายใจขณะหลับจากการอุดกั้น";
  const textResult1 = t("sub_sleep_score_detail1");
  const textResult2 = t("sub_sleep_score_detail2");
  const textResult3 = t("sub_sleep_score_detail3");
  const textResult4 = t("sub_sleep_score_detail4");
  const [stage, setStage] = useState(0);
  const [Eva_fullname, setEva_fullname] = useState("");
  const [Eva_Tel, setEva_Tel] = useState("");
  const [Eva_Email, setEva_Email] = useState("");
  const [Eva_Agree, setEva_Agree] = useState("0");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [flashingIndex, setFlashingIndex] = useState(null);
  const handleAnswerChange = (value) => {
    setFlashingIndex(value);
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      setFlashingIndex(null);
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = value;
      setAnswers(newAnswers);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 500);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert(t("please_answer"));
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
  const handleHome = () => {
    window.location.href = "/presentation";
  };
  // console.log("answers:", answers);
  // console.log("name:", Eva_fullname);
  // console.log("Eva_Agree:", Eva_Agree);
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
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "5%",
          marginTop: "20px",
        }}
      >
        <div className="logo">
          <a href="https://www.kasemrad.co.th/">
            <img
              src="https://www.kasemrad.co.th/asset/site/images/logo.png"
              alt="Kasemrad Logo"
              className="responsive-logo"
            />
          </a>
        </div>
        <Grid
          item
          style={{
            position: "absolute",
            right: 25,
            textAlign: "center",
            alignItems: "center",
            // marginTop: 10,
            backgroundColor: "whitesmoke",
            borderRadius: 10,
            padding: 10,
            height: "6%",
            minHeight: "45px",
            maxHeight: "150px",
            zIndex: "1",
          }}
        >
          <LanguageSelector />
        </Grid>
      </header>
      <div
        className="quiz-container"
        style={{
          backgroundColor: "#f0f2f5",
        }}
      >
        {stage === 0 && (
          <div
            className="initial-screen centered"
            style={{
              maxWidth: "650px",
              margin: "auto",
              marginTop: "10%",
              maxHeight: "650px",
              minHeight: "100px",
              minWidth: "100px",
              // position: "fixed",
            }}
          >
            {/* <img alt="Header" className="header-image" /> */}
            <img
              src="https://images.squarespace-cdn.com/content/v1/5804e890b8a79b7fbfbc76bc/1567029993166-MF1LAVVGZT9Q0TALRBRV/AliceNightOne_inUseAsleep_0514_CKHiLg.jpg?format=2500w"
              alt="sleeptest"
              style={{ width: "100%", height: "45%", marginTop: "-15%" }}
            />
            <div style={{ color: "black", fontSize: "1rem", marginTop: "20px" }}>
              <h4>{t("sub_sleep_1")}</h4>
              <h5>{t("sub_sleep_2")}</h5>
            </div>

            <button onClick={() => setStage(1)} style={{ background: "#76c7c0" }}>
              {t("sub_sleep_start")}
            </button>
          </div>
        )}
        {stage === 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
              width: "100vw",
            }}
          >
            <div
              className="privacy-policy-screen centered card-body"
              style={{
                maxWidth: "660px",
                maxHeight: "400px",
                minWidth: "200px",
                margin: "auto",
                color: "black",
                fontSize: "1.2rem",
                width: "100%",
                padding: "20px",
                boxSizing: "border-box",
                backgroundColor: "white",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <div style={{ width: "100%" }}>
                <h1>{t("sub_sleep_policy_1")}</h1>
                <p>
                  {t("sub_sleep_policy_2")}
                  <p>
                    <a
                      href="https://www.bangkokchainhospital.com/th/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.bangkokchainhospital.com
                    </a>
                  </p>
                </p>
              </div>

              <div className="button-group">
                <button onClick={handleAgreeClick} style={{ background: "#76c7c0" }}>
                  {t("sub_sleep_policy_3")}
                </button>
                <button
                  onClick={() => alert("ท่านต้องยินยอมเพื่อนดำเนินการต่อ")}
                  style={{ background: "#F898A4" }}
                >
                  {t("sub_sleep_policy_4")}
                </button>
              </div>
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
                <h2>{t("sub_sleep_fill_name")}</h2>
                <input
                  type="text"
                  value={Eva_fullname}
                  onChange={(e) => setEva_fullname(e.target.value)}
                  placeholder={t("name")}
                />
                <button onClick={() => setStage(3)} style={{ background: "#76c7c0" }}>
                  {t("sub_sleep_fill_done")}
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
              <h2>{t("sub_sleep_fill_phone")}</h2>
              <input
                type="tel"
                maxLength={10}
                value={Eva_Tel}
                onChange={(e) => setEva_Tel(e.target.value)}
                placeholder={t("mobileNo")}
              />
              <input
                type="email"
                value={Eva_Email}
                onChange={(e) => setEva_Email(e.target.value)}
                placeholder={t("email")}
              />
              <button
                onClick={() => {
                  if (Eva_Email === "") {
                    alert(t("please_fill_in") + " " + t("email"));
                  } else if (!Eva_Email.includes("@")) {
                    alert(t("invalid_email_format"));
                  } else {
                    setStage(4);
                  }
                }}
                style={{ background: "#76c7c0" }}
              >
                {t("sub_sleep_fill_done")}
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
              <h6 style={{ color: "#FF0000" }}>{t("sub_sleep_choose")}</h6>
              <h6>{t("sub_sleep_scale")}</h6>
              <div className="quiz-answers">
                {[0, 1, 2, 3].map((value) => (
                  <button
                    key={value}
                    className={`quiz-answer ${
                      answers[currentQuestion] === value ? "selected" : ""
                    } ${isFlashing && flashingIndex === value ? "flashing" : ""}`}
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
          <div className="quiz-result centered lg-8" style={{ color: "#138453", width: "100%" }}>
            <h2>
              <div style={{ color: "#138453" }}>
                {t("sub_sleep_score")}: {totalScore}
              </div>
            </h2>
            <h5>{resultMessage}</h5>
            <p></p>

            <p></p>
            <div
              style={{
                background: "#3085db",
                fontSize: "0.4rem",
                color: "white",
                width: "100%",
                borderRadius: "30px",
                maxWidth: 600,
              }}
            >
              <div
                style={{
                  fontSize: "1rem",
                  color: "white",
                  width: "90%",
                  justifyContent: "center",
                  justifyItems: "center",
                  alignContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  margin: "auto",
                  marginTop: "10px",
                }}
              >
                <p>{textResult}</p>
                {/* <p>{textResult0}</p> */}
                <p>{textResult1}</p>
                <p style={{ marginTop: "-20px" }}>{textResult2}</p>
                <p style={{ marginTop: "-10px" }}>{textResult3}</p>
                <p style={{ marginTop: "-20px" }}>{textResult4}</p>
              </div>
            </div>

            <button
              onClick={handleHome}
              // className="btn btn-secondary"

              style={{ marginTop: "30px", backgroundColor: "#F6C6C7", color: "black" }}
            >
              {t("sub_sleep_score_t")}
            </button>
          </div>
        )}
        {submitted ? null : (
          <footer className="quiz-footer">
            <button onClick={handleBack} disabled={currentQuestion === 0}>
              <h6 style={{ fontSize: "1rem" }}>{t("sub_sleep_Back")}</h6>
            </button>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <span style={{ color: "black" }}>
              {progressPercentage}% {t("sub_sleep_Finish")}
            </span>
            {currentQuestion < questions.length - 1 ? (
              <button onClick={handleNext}>
                <h6 style={{ fontSize: "1rem" }}>{t("sub_sleep_Next")}</h6>
              </button>
            ) : (
              <button className="submit-button" onClick={handleSubmit}>
                <h6 style={{ fontSize: "1rem" }}>{t("sub_sleep_Submit")}</h6>
              </button>
            )}
          </footer>
        )}
      </div>
    </>
  );
}

export default QuizDisplay;
