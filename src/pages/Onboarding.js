import React, { useContext, useState } from "react";
import { AuthContext } from "../components/Auth";
import { Navigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { auth, firestore } from "../firebaseConfig/config";
import { Button, Form, FormGroup, Input, InputGroup } from "reactstrap";
import "../css/onboarding.css";
import { firebasestore } from "../firebaseConfig/config";

function Onboarding() {
  const [currentPage, setCurrentPage] = useState(0);
  const [sleepDataSubmitted, setSleepDataSub] = useState(false);
  const [sleepData, setSleepData] = useState({
    userId: auth.currentUser.uid,
    change: [],
    sleepStruggle: {
      min: -1,
      max: 0,
    },
    bedTime: "",
    wakeTime: "",
    sleepDuration: { type: Number, min: 0, max: 10 },
  });

  const handleCheckboxChange = (checkbox) => {
    const updatedChange = sleepData.change.includes(checkbox)
      ? sleepData.change.filter((item) => item !== checkbox)
      : [...sleepData.change, checkbox];

    setSleepData({
      ...sleepData,
      change: updatedChange,
    });
  };

  const handleStruggleChange = (value) => {
    let min, max;
    switch (value) {
      case "0-2":
        min = 0;
        max = 2;
        break;
      case "2-8":
        min = 2;
        max = 8;
        break;
      case "8-∞":
        min = 8;
        max = -1;
        break;
      default:
        min = 0;
        max = 0;
    }
    setSleepData({
      ...sleepData,
      sleepStruggle: {
        min,
        max,
      },
    });
  };

  const handleTimeChange = (e) => {
    setSleepData({
      ...sleepData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCurrentPage(currentPage + 1);
    console.log(sleepData);

    firestore.collection('sleepData').add({
      ...sleepData,
      username: auth.currentUser.displayName,
      createdAt: firebasestore.FieldValue.serverTimestamp(),
      updatedAt: firebasestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("onboarding done")
    })
    .catch((error) => {
      console.log("Error: " + error)
    })
    // Reset the form

    setSleepData({
      userId: auth.currentUser.uid,
      change: [],
      sleepStruggle: {
        min: -1,
        max: 0,
      },
      bedTime: "",
      wakeTime: "",
      sleepDuration: { type: Number, min: 0, max: 10 },
    });
  };

  const closeAssessment = () => {
    setSleepDataSub(true);
  };

  const handlenextArrowClick = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleprevArrowClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleDurationChange = (e) => {
    setSleepData({
      ...sleepData,
      sleepDuration: parseInt(e.target.value),
    });
  };

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/home" />;
  }

  if (sleepDataSubmitted) {
    console.log("--1--");
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="App" style={{ color: "white" }}>
      <div className="container">
        <div className="row align-items-center">
          {currentPage !== 0 && currentPage !== 5 && (
            <div className="col-12 col-md-2">
              <div className="submit-container">
                <button
                  className="submit-button"
                  onClick={handleprevArrowClick}
                >
                  <FaArrowLeft className="arrow-icon" />
                </button>
              </div>
            </div>
          )}
          {(currentPage === 0 || currentPage === 5) && (
            <div className="col-12 col-md-2"></div>
          )}
          <div className="col-12 col-md-8">
            <Form onSubmit={handleSubmit}>
              {currentPage === 0 && (
                <h3>
                  Let's start by calculating you sleep effeciency and examining
                  you concerns
                  <br />
                  Over time, we will work together to improve these
                </h3>
              )}
              {currentPage === 1 && (
                <>
                  <h3>
                    Let's say in a few weeks, you're sleeping well. What would
                    change?{" "}
                  </h3>
                  <div>Select all the changes you would like</div>
                  <br />
                  <br />
                  <FormGroup>
                    <Button
                      className="changeButton"
                      color={
                        sleepData.change.includes("I would go to sleep easily")
                          ? "primary"
                          : "secondary"
                      }
                      onClick={() =>
                        handleCheckboxChange("I would go to sleep easily")
                      }
                    >
                      I would go to sleep easily
                    </Button>
                    <Button
                      className="changeButton"
                      color={
                        sleepData.change.includes(
                          "I would sleep thoughout the night"
                        )
                          ? "primary"
                          : "secondary"
                      }
                      onClick={() =>
                        handleCheckboxChange(
                          "I would sleep thoughout the night"
                        )
                      }
                    >
                      I would sleep thoughout the night
                    </Button>
                    <Button
                      className="changeButton"
                      color={
                        sleepData.change.includes(
                          "I'd wake up on time, refreshed"
                        )
                          ? "primary"
                          : "secondary"
                      }
                      onClick={() =>
                        handleCheckboxChange("I'd wake up on time, refreshed")
                      }
                    >
                      I'd wake up on time, refreshed
                    </Button>
                  </FormGroup>
                </>
              )}

              {currentPage === 2 && (
                <>
                  <h3>
                    {" "}
                    That's a great goal. How long have you been struggling with
                    your sleep?{" "}
                  </h3>
                  <br />
                  <br />
                  <FormGroup>
                    <Button
                      className="changeButton"
                      color={
                        sleepData.sleepStruggle.min === 0 &&
                        sleepData.sleepStruggle.max === 2
                          ? "primary"
                          : "secondary"
                      }
                      onClick={() => handleStruggleChange("0-2")}
                    >
                      Less than 2 weeks
                    </Button>
                    <Button
                      className="changeButton"
                      color={
                        sleepData.sleepStruggle.min === 2 &&
                        sleepData.sleepStruggle.max === 8
                          ? "primary"
                          : "secondary"
                      }
                      onClick={() => handleStruggleChange("2-8")}
                    >
                      2 to 8 weeks
                    </Button>
                    <Button
                      className="changeButton"
                      color={
                        sleepData.sleepStruggle.min === 8 &&
                        sleepData.sleepStruggle.max === -1
                          ? "primary"
                          : "secondary"
                      }
                      onClick={() => handleStruggleChange("8-∞")}
                    >
                      More than 8 weeks
                    </Button>
                  </FormGroup>
                </>
              )}
              {currentPage === 3 && (
                <>
                  <h3> What time do you go to bed for sleep? </h3>
                  <br />
                  <br />
                  <FormGroup>
                    <Input
                      type="time"
                      id="bedTime"
                      name="bedTime"
                      value={sleepData.bedTime}
                      onChange={handleTimeChange}
                    />
                  </FormGroup>
                  <br />
                  <br />
                  <h3> What time do you get out of bed to start your day? </h3>
                  <br />
                  <br />
                  <FormGroup>
                    <Input
                      type="time"
                      id="wakeTime"
                      name="wakeTime"
                      value={sleepData.wakeTime}
                      onChange={handleTimeChange}
                    />
                  </FormGroup>
                </>
              )}
              {currentPage === 4 && (
                <>
                  <h3>
                    {" "}
                    Ok. How many hours sleep do you get in a typical night?{" "}
                  </h3>
                  <br />
                  <br />
                  <FormGroup>
                    <InputGroup>
                      <Input
                        type="select"
                        id="sleepDuration"
                        name="sleepDuration"
                        value={sleepData.sleepDuration}
                        onChange={handleDurationChange}
                      >
                        <option value="">Select Duration</option>
                        <option value="0">0 hours</option>
                        <option value="1">1 hour</option>
                        <option value="2">2 hours</option>
                        <option value="3">3 hours</option>
                        <option value="4">4 hours</option>
                        <option value="5">5 hours</option>
                        <option value="6">6 hours</option>
                        <option value="7">7 hours</option>
                        <option value="8">8 hours</option>
                        <option value="9">9 hours</option>
                        <option value="10">10 hours</option>
                      </Input>
                    </InputGroup>
                  </FormGroup>
                </>
              )}
              {currentPage === 5 && (
                <h3>
                  You seem to have a sleep efficiency of {"89%"}. That's good
                  <br />
                  <br />A higher sleep efficiency score means a more refreshing
                  and energizing sleep, which can help you move into your day
                  with a sense of lightness and ease
                </h3>
              )}
            </Form>
          </div>

          {currentPage === 4 && sleepData.sleepDuration > -1 && (
            <div className="col-12 col-md-2">
              <div className="submit-container">
                <button onClick={handleSubmit} className="submit-button">
                  <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
          )}
          {currentPage === 5 && (
            <div className="col-12 col-md-2">
              <div className="submit-container">
                <button onClick={closeAssessment} className="submit-button">
                  <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
          )}

          {(currentPage === 0 ||
            (currentPage === 1 && sleepData.change.length > 0) ||
            (currentPage === 2 && sleepData.sleepStruggle.min !== -1) ||
            (currentPage === 3 &&
              sleepData.bedTime !== "" &&
              sleepData.wakeTime !== "")) && (
            <div className="col-12 col-md-2">
              <div className="submit-container">
                <button
                  className="submit-button"
                  onClick={handlenextArrowClick}
                >
                  <FaArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
