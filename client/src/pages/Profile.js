import React, { useState } from "react";
import Auth from "../utils/auth";
import { NavLink } from "react-router-dom";
import { Button, Layout } from "antd";
import styled from "styled-components";

import Navbar from "../components/Navbar";
const { Header, Footer, Sider, Content } = Layout;

const Profile = () => {
  return (
    <>
      <Navbar className="navbar" />
      <div className="containerHome">
        <div className="containedUpdate">
          <div className="containerHome">
            <p className="whiteText">
              Welcome back USER, Where would you like to go?
            </p>
            <div className="loginBtn">
              <Button type="primary">Update Profile</Button>
            </div>
            <div className="loginBtn">
              <NavLink to="/home">
                <Button type="primary">Home</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Layout>
        <Footer class="footer">Footer</Footer>
      </Layout>
    </>
  );
};

export default Profile;
