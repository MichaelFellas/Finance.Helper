import { Layout } from "antd";
import { Navigate, NavLink } from "react-router-dom";
import { Button } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Auth from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const { Header, Footer, Sider, Content } = Layout;

const Bills = () => {
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
                <div className="containerBills">
                  <h1>BILL TRACKER</h1>
                  <div className="addBill">
                    <NavLink className="icons" to="/newBill">
                      <h2>ADD A BILL</h2>
                    </NavLink>
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

export default Bills;
