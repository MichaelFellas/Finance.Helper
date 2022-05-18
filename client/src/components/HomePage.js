import React, { useState } from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { Button } from "antd";
import styled from "styled-components";
import { Carousel, Radio } from "antd";

const contentStyle = {
  height: "460px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const contentStyle2 = {
  height: "460px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#7B7B7B",
};

const HomePage = () => {
  const [dotPosition, setDotPosition] = React.useState("bottom");

  const [size, setSize] = useState("large");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <>
      <div class="container">
        <div class="contained">
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
          <div class="container">
            <div class="loginBtn">
              <Button type="primary">Login</Button>
            </div>
            <div class="loginBtn">
              <Button type="primary">Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
