import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { Form, Input, InputNumber, DatePicker, Layout, Button } from "antd";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Auth from "../utils/auth";
import { QUERY_SINGLE_GOAL } from "../utils/queries";
import { useMutation } from "@apollo/client";
// import { EDIT_GOAL } from "../utils/mutations";

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

const dateFormat = "DD/MM/YYYY";

const EditGoal = () => {
  const navigate = useNavigate();
  //   const [editGoal, { error, data }] = useMutation(EDIT_GOAL);
  const [form] = Form.useForm();
  const { goalId } = useParams();

  const { loading, goaldata } = useQuery(QUERY_SINGLE_GOAL, {
    variables: { goalId: goalId },
  });

  const goal = goaldata || {};
  console.log(goal);
  if (loading) {
    return <div>Loading...</div>;
  }

  const onFinish = async (values) => {
    console.log("DATE", values.purchaseDate);
    // try {
    //   const response = await editGoal({
    //     variables: {
    //       goalName: values.goalName,
    //       amount: values.goalAmount,
    //       progress: values.goalInitial,
    //       dateBuy: values.purchaseDate.toDate(),
    //     },
    //   });
    //   if (!response.data) {
    //     throw new Error("something went wrong!");
    //   }

    //   navigate("/goals");
    // } catch (e) {
    //   console.error(e);
    // }
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
                  <h1>NEW SAVINGS GOAL</h1>
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
                        rules={[{ type: "number", min: 0, required: true }]}
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
                            required: true,
                            type: "date",
                            whitespace: true,
                          },
                        ]}
                      >
                        <DatePicker format={dateFormat} size="large" />
                      </Form.Item>
                      <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                          Edit Savings Goal!
                        </Button>
                      </Form.Item>
                    </Form>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    {/* {error ? (
                      <p class="whiteText">
                        Failed to Add Goal! Something went Wrong!
                      </p>
                    ) : (
                      <></>
                    )} */}
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

export default EditGoal;
