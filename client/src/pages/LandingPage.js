import React, { useState } from "react";
import Auth from "../utils/auth";
import { NavLink, Navigate } from "react-router-dom";
import { Button } from "antd";
import bills from "../assets/bills.png";
import goals from "../assets/goals.png";
import breakdown from "../assets/breakdown.png";

import { Carousel, Layout } from "antd";
import Navbar from "../components/Navbar";

const { Footer } = Layout;

const contentStyle = {
  height: "460px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#9AD1FE",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-evenly",
};

const contentStyle2 = {
  height: "460px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-evenly",
};

const LandingPage = () => {
  const [dotPosition] = useState("bottom");

  return (
    <>
      {Auth.loggedIn() ? (
        <Navigate to="/home" />
      ) : (
        <>
          <Navbar />
          <div className="containerLand">
            <div className="containedLand">
              <Carousel dotPosition={dotPosition}>
                <div>
                  <div style={contentStyle}>
                    <h1 className="blackText">
                      Welcome to Finance.Helper!
                      <h1 className="blackText">We're Here to Help You</h1>
                    </h1>
                  </div>
                </div>
                <div>
                  <div style={contentStyle2}>
                    <div className="borderRight">
                      <h1 className="whiteText">Goal Visualizer</h1>
                      <h3 className="whiteText">
                        The Goal Visualizer page allows you to track you savings
                        goals so you can see just how close you are to achieving
                        them!
                      </h3>
                    </div>
                    <img alt="Goals Preview" src={goals} height="400px"></img>
                  </div>
                </div>
                <div>
                  <div style={contentStyle}>
                    <div className="borderRight">
                      <h1 className="blackText">Bill Tracker</h1>
                      <h3 className="blackText">
                        The Bill tracking page allows you to see your upcoming
                        bills so you can plan how to spend without getting any
                        unexpected bills!
                      </h3>
                    </div>
                    <img alt="Bill Breakdown" src={bills} height="400px"></img>
                  </div>
                </div>
                <div>
                  <div style={contentStyle2}>
                    <div className="borderRight">
                      <h1 className="whiteText">Bill Breakdown</h1>
                      <h3 className="whiteText">
                        The Bill breakdown page allows you to see your bills in
                        a graphical way so that you can see exactly how much
                        everything is costing you
                      </h3>
                    </div>
                    <img
                      alt="Bills Breakdown Preview"
                      src={breakdown}
                      height="400px"
                      width="480px"
                    ></img>
                  </div>
                </div>
              </Carousel>
              <div class="loginAlign">
                <div className="billButtons">
                  <div className="landerButton">
                    <NavLink to="/login">
                      <h2 className="whiteText">LOGIN</h2>
                    </NavLink>
                  </div>
                </div>

                <div className="billButtons">
                  <div className="landerButton">
                    <NavLink to="/signup">
                      <h2 className="whiteText">SIGN UP</h2>
                    </NavLink>
                  </div>
                </div>
                <br></br>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LandingPage;
