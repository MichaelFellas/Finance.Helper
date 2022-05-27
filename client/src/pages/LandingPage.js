import React, { useState } from "react";
import Auth from "../utils/auth";
import { NavLink, Navigate } from "react-router-dom";
import { Button } from "antd";

import { Carousel, Layout } from "antd";
import Navbar from "../components/Navbar";

const { Footer } = Layout;

const contentStyle = {
  height: "460px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#4B8CC1",
};

const contentStyle2 = {
  height: "460px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#7B7B7B",
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
                  <h1 style={contentStyle}>Welcome</h1>
                </div>
                <div>
                  <h1 style={contentStyle2}>Savings Goals</h1>
                </div>
                <div>
                  <h1 style={contentStyle}>Budget Visualizer</h1>
                </div>
                <div>
                  <h1 style={contentStyle2}>Bill Tracking</h1>
                </div>
              </Carousel>
              <div class="loginAlign">
                <div className="loginBtn">
                  <NavLink to="/login">
                    <Button type="primary">Login</Button>
                  </NavLink>
                </div>
                <div className="loginBtn">
                  <NavLink to="/signup">
                    <Button type="primary">Sign Up</Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <Layout>
            <Footer class="footer"></Footer>
          </Layout>
        </>
      )}
    </>
  );
};

export default LandingPage;
