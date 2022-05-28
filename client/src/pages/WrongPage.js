import { Layout } from "antd";
import { Navigate, NavLink } from "react-router-dom";
import { Button } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Auth from "../utils/auth";
import wrong from "../assets/wrong.png";

const { Header, Footer, Sider, Content } = Layout;

const WrongPage = () => {
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
                <div className="containerCon">
                  <h1>PAGE NOT FOUND</h1>
                  <img
                    className="underCon"
                    alt="Under Construction"
                    src={wrong}
                  ></img>
                  <div className="billButtons">
                    <div className="addBill">
                      <NavLink className="addBillButton" to="/home">
                        <h2 className="whiteText">HOME</h2>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </Content>
            </div>
          </Layout>
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
        </Layout>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default WrongPage;
