import { Layout } from "antd";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const { Header, Footer, Sider, Content } = Layout;

const Goals = () => {
  return (
    <>
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
              <h1>Goals</h1>
            </Content>
          </div>
        </Layout>
        <Footer class="footer">Footer</Footer>
      </Layout>
    </>
  );
};

export default Goals;
