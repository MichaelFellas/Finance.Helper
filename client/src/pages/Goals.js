import { Layout } from "antd";
import { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { Button } from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Auth from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faFilePen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { QUERY_ME_GOALS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import moment from "moment";
import ProgressBar from "../components/Progress-Bar";

const { Header, Footer, Sider, Content } = Layout;

const Goals = () => {
  const { loading, data } = useQuery(QUERY_ME_GOALS);

  const handleDeleteGoal = async (_id) => {
    console.log(_id);
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  const userData = data?.meGoal;
  const sortUser = userData.Goals;

  const sortArray = [];

  for (let i = 0; sortUser[i]; i++) {
    sortArray.push(sortUser[i]);
  }

  const sortedAsc = sortArray.sort(
    (objA, objB) => Number(objA.dateBuy) - Number(objB.dateBuy)
  );

  const goalsCol1 = [];
  const goalsCol2 = [];

  for (let i = 0; sortedAsc[i]; i++) {
    if (i % 2 === 0) {
      goalsCol2.push(sortedAsc[i]);
    } else {
      goalsCol1.push(sortedAsc[i]);
    }
  }

  return (
    <>
      {Auth.loggedIn() ? (
        <Layout>
          <Header class="widening">
            <Navbar />
          </Header>
          <Layout>
            <Sider class="sider">
              <Sidebar />
            </Sider>
            <div>
              <Content class="content">
                <div className="containerGoals">
                  <h1>GOAL TRACKER</h1>
                  <div className="containerGoalsFlex">
                    <div className="innerGoals">
                      <div className="addGoal">
                        <h1>ADD A GOAL</h1>
                        <h2>Create a new Goal that you want to save for!</h2>
                        <NavLink className="icons" to="/newGoal">
                          <FontAwesomeIcon
                            icon={faCirclePlus}
                          ></FontAwesomeIcon>
                        </NavLink>
                      </div>

                      {goalsCol1.map((goal) => {
                        return (
                          <div className="Goals">
                            <h1>{goal.goalName}</h1>
                            <p className="whiteText">
                              Purchase Date:{" "}
                              {moment(goal.dateBuy).format("DD/MM/YYYY")}
                            </p>
                            <p className="whiteText">
                              Progress: ${goal.progress}/ ${goal.amount}
                            </p>
                            <div className="progBar">
                              <ProgressBar
                                progress={goal.progress}
                                amount={goal.amount}
                              />
                            </div>
                            <div className="editGoal">
                              <h3>Edit Goal</h3>

                              <NavLink
                                className="icons2"
                                to={`/editGoal/${goal._id}`}
                              >
                                <FontAwesomeIcon
                                  icon={faFilePen}
                                ></FontAwesomeIcon>
                              </NavLink>

                              <FontAwesomeIcon
                                onClick={() => {
                                  handleDeleteGoal(goal._id);
                                }}
                                className="icons2 trashCan"
                                icon={faTrashCan}
                              ></FontAwesomeIcon>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="innerGoals">
                      {goalsCol2.map((goal) => {
                        return (
                          <div className="Goals">
                            <h1>{goal.goalName}</h1>
                            <p className="whiteText">
                              Purchase Date:{" "}
                              {moment(goal.dateBuy).format("DD/MM/YYYY")}
                            </p>
                            <p className="whiteText">
                              Progress: ${goal.progress}/ ${goal.amount}
                            </p>
                            <div className="progBar">
                              <ProgressBar
                                progress={goal.progress}
                                amount={goal.amount}
                              />
                            </div>
                            <div className="editGoal">
                              <NavLink
                                className="icons2"
                                to={`/editGoal/${goal._id}`}
                              >
                                <FontAwesomeIcon
                                  icon={faFilePen}
                                ></FontAwesomeIcon>
                              </NavLink>

                              <FontAwesomeIcon
                                onClick={() => {
                                  handleDeleteGoal(goal._id);
                                }}
                                className="icons2 trashCan"
                                icon={faTrashCan}
                              ></FontAwesomeIcon>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Content>
            </div>
          </Layout>
          <Footer class="footer">
            {Auth.loggedIn() ? (
              <Button className="logOut" onClick={Auth.logout}>
                Logout
              </Button>
            ) : (
              <> </>
            )}
          </Footer>
        </Layout>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Goals;
