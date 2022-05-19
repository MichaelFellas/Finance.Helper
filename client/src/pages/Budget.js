import { Layout } from "antd";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const { Header, Footer, Sider, Content } = Layout;

const Budget = () => {
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
              <h1>Budget</h1>
            </Content>
          </div>
        </Layout>
        <Footer class="footer">Footer</Footer>
      </Layout>
    </>
  );
};

export default Budget;
