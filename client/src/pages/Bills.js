import { Layout } from "antd";
import { NavLink, Navigate } from "react-router-dom";
import { Button } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Auth from "../utils/auth";

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
                <h1>Bills</h1>
              </Content>
            </div>
          </Layout>
          <Footer class="footer">Footer</Footer>
        </Layout>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Bills;
