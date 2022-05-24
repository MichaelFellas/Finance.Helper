import React from "react";

import styled from "styled-components";

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
        Finance.Helper <div></div>
      </Title>
    </>
  );
};

export default AppNavbar;
