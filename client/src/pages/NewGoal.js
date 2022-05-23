import { DatePicker, Layout } from "antd";
import { NavLink, Navigate } from "react-router-dom";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Auth from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { ADD_GOAL } from "../utils/mutations";
import moment from "moment";
import { useEffect } from "react";

const { Header, Footer, Sider, Content } = Layout;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 50,
    },
    sm: {
      span: 150,
    },
  },
  wrapperCol: {
    xs: {
      span: 50,
    },
    sm: {
      span: 100,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 50,
      offset: 0,
    },
    sm: {
      span: 50,
      offset: 9,
    },
  },
};

const dateFormat = "YYYY/MM/DD";

const NewGoal = () => {
  const [addGoal, { error, data }] = useMutation(ADD_GOAL);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values, values.purchaseDate._d);
    try {
      const { data } = await addGoal({
        variables: {
          goalName: values.goalName,
          amount: values.goalAmount,
          progress: values.goalInitial,
          dateBuy: values.purchaseDate._d,
        },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

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
                <div className="containerNewGoals">
                  <div className="newGoalsForm">
                    <Form
                      size="large"
                      {...formItemLayout}
                      form={form}
                      name="register"
                      onFinish={onFinish}
                      scrollToFirstError
                    >
                      <Form.Item
                        name="goalName"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Goal Name
                          </label>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input size="large" />
                      </Form.Item>
                      <Form.Item
                        name="goalAmount"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Amount Required
                          </label>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please input the Goal Amount",
                            whitespace: true,
                            type: "number",
                            min: 0,
                          },
                        ]}
                      >
                        <InputNumber size="large" />
                      </Form.Item>

                      <Form.Item
                        name="goalInitial"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Initial Amount
                          </label>
                        }
                        rules={[{ type: "number", min: 0 }]}
                      >
                        <InputNumber size="large" />
                      </Form.Item>

                      <Form.Item
                        name="purchaseDate"
                        label={
                          <label style={{ color: "white", fontSize: "25px" }}>
                            Date you would like to Purchase
                          </label>
                        }
                        rules={[
                          {
                            type: "date",
                            whitespace: true,
                          },
                        ]}
                      >
                        <DatePicker format={dateFormat} size="large" />
                      </Form.Item>
                      <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                          Add Savings Goal!
                        </Button>
                      </Form.Item>
                    </Form>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    {error ? (
                      <p class="whiteText">
                        Failed to Add Goal! Something went Wrong!
                      </p>
                    ) : (
                      <></>
                    )}
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

export default NewGoal;
