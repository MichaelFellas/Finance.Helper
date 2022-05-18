import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

const Title = styled.h1`
  font-size: 50px;
  color: white;
  text-align: center;
  background-color: #7b7b7b;
  position: 0, 0;
  border-bottom: black 2px solid;
`;

const AppNavbar = () => {
  // set modal display state
  return (
    <>
      <Title>Finance.Helper</Title>
    </>
  );
};

export default AppNavbar;
