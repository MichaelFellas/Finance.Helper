import React from "react";
import Auth from "../utils/auth";
import { NavLink, Navigate } from "react-router-dom";
import { Button, Layout } from "antd";

import Navbar from "../components/Navbar";

const { Content, Footer } = Layout;

const HomePage = () => {
  return (
    <>
      <Navbar className="navbar" />
      <Content className="contentHome">
        <div className="containedHome">
          <div className="containerHome">
            {Auth.loggedIn() ? (
              <>
                <p className="whiteText">
                  Welcome back USER, Where would you like to go?
                </p>
                <div className="loginBtn">
                  <NavLink to="/bills">
                    <Button type="primary">Bill Planner</Button>
                  </NavLink>
                </div>
                <div className="loginBtn">
                  <NavLink to="/goals">
                    <Button type="primary">Goal Visualizer</Button>
                  </NavLink>
                </div>
                <div className="loginBtn">
                  <NavLink to="/budget">
                    <Button type="primary">Budget Helper</Button>
                  </NavLink>
                </div>
                <div className="loginBtn">
                  <NavLink to="/expense">
                    <Button type="primary">Expenses Tracking</Button>
                  </NavLink>
                </div>
                <div className="loginBtn">
                  <NavLink to="/savings">
                    <Button type="primary">Savings Visualizer</Button>
                  </NavLink>
                </div>
                <div className="loginBtn">
                  <NavLink to="/profile">
                    <Button type="primary">Update Profile</Button>
                  </NavLink>
                </div>
              </>
            ) : (
              <Navigate to="/" />
            )}
          </div>
        </div>
      </Content>
      <Footer class="footer">
        {Auth.loggedIn() ? (
          <Button className="logOut" onClick={Auth.logout}>
            Logout
          </Button>
        ) : (
          <> </>
        )}
      </Footer>
    </>
  );
};

export default HomePage;
