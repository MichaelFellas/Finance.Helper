import React from "react";
import Auth from "../utils/auth";
import { NavLink, Navigate } from "react-router-dom";
import { Button, Layout } from "antd";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Navbar from "../components/Navbar";

const { Content, Footer } = Layout;

const HomePage = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me;

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Navbar />
      <Content className="contentHome">
        <div className="containedHome">
          <div className="containerHome">
            {Auth.loggedIn() ? (
              <>
                <h1 className="whiteText">
                  Welcome back {userData.name}, where would you like to go?
                </h1>

                <div className="billButtons">
                  <div className="homeButton">
                    <NavLink to="/bills">
                      <h2 className="whiteText">Bill Planner</h2>
                    </NavLink>
                  </div>
                </div>

                <div className="billButtons">
                  <div className="homeButton">
                    <NavLink to="/billsBreakdown">
                      <h2 className="whiteText">Bill Breakdown</h2>
                    </NavLink>
                  </div>
                </div>
                <div className="billButtons">
                  <div className="homeButton">
                    <NavLink to="/goals">
                      <h2 className="whiteText">Goal Visualizer</h2>
                    </NavLink>
                  </div>
                </div>
                <div className="billButtons">
                  <div className="homeButton">
                    <NavLink to="/budget">
                      <h2 className="whiteText">Budget Helper</h2>
                    </NavLink>
                  </div>
                </div>
                <div className="billButtons">
                  <div className="homeButton">
                    <NavLink to="/expense">
                      <h2 className="whiteText">Expenses Tracking</h2>
                    </NavLink>
                  </div>
                </div>
                <div className="billButtons">
                  <div className="homeButton">
                    <NavLink to="/savings">
                      <h2 className="whiteText">Savings Visualizer</h2>
                    </NavLink>
                  </div>
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
          <Button
            className="logOut"
            onClick={Auth.logout}
            style={{
              color: "white",
              background: "#323232",
              borderColor: "white",
              borderWidth: "3px",
              fontSize: "20px",
              height: "50px",
              width: "230px",
              textAlign: "center",
            }}
          >
            LOGOUT
          </Button>
        ) : (
          <> </>
        )}
      </Footer>
    </>
  );
};

export default HomePage;
