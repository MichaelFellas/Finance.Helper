import { Layout } from "antd";
import { NavLink, Navigate } from "react-router-dom";
import { Button } from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Auth from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const { Header, Footer, Sider, Content } = Layout;

const Goals = () => {
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
                  <div className="innerGoals">
                    <div className="addGoal">
                      <h1>ADD A GOAL</h1>
                      <h2>Create a new Goal that you want to save for!</h2>
                      <NavLink className="icons" to="/newGoal">
                        <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>
                      </NavLink>
                    </div>
                    <div className="Goals">
                      <h1>GOAL #1</h1>
                    </div>
                    <div className="Goals">
                      <h1>GOAL #2</h1>
                    </div>
                  </div>
                  <div className="innerGoals">
                    <div className="Goals">
                      <h1>GOAL #4</h1>
                    </div>
                    <div className="Goals">
                      <h1>GOAL #5</h1>
                    </div>
                    <div className="Goals">
                      <h1>GOAL #6</h1>
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
