import { Button } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Auth from "../utils/auth";

const Title = styled.h1`
  font-size: 50px;
  color: white;
  text-align: center;
  background-color: #323232;
  width: 100%;
  border-bottom: black 2px solid;
  display: span;
`;

const AppNavbar = () => {
  // set modal display state
  return (
    <>
      <Title>
        Finance.Helper{" "}
        <div>
          {Auth.loggedIn() ? (
            <Button className="logOut" onClick={Auth.logout}>
              Logout
            </Button>
          ) : (
            <> </>
          )}
        </div>
      </Title>
    </>
  );
};

export default AppNavbar;
